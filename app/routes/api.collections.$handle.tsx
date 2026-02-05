

import { getPaginationVariables } from '@shopify/hydrogen';

export async function loader({ context, params, request }: any) {
  const { handle } = params;
  const { storefront } = context;
  const url = new URL(request.url);
  // Handle sort param from query string
  const sortParam = url.searchParams.get('sort') || 'MANUAL';
  // Map sortParam to Storefront API sortKey and reverse
  const sortMap = {
    MANUAL:        { value: 'COLLECTION_DEFAULT', reverse: false },
    BEST_SELLING:  { value: 'BEST_SELLING', reverse: false },
    PRICE_ASC:     { value: 'PRICE', reverse: false },
    PRICE_DESC:    { value: 'PRICE', reverse: true },
    ALPHA_ASC:     { value: 'TITLE', reverse: false },
    ALPHA_DESC:    { value: 'TITLE', reverse: true },
    CREATED:       { value: 'CREATED', reverse: false },
    CREATED_DESC:  { value: 'CREATED', reverse: true },
  };
  const sortConfig = sortMap[sortParam] || sortMap['MANUAL'];
  // Print the COLLECTION_QUERY for debugging
  // eslint-disable-next-line no-console
  // console.log('DEBUG: COLLECTION_QUERY', COLLECTION_QUERY);
  const endCursor = url.searchParams.get('endCursor');
  // Parse filter parameters from query string and build Shopify filters array
  const filtersArray: any[] = [];
  url.searchParams.forEach((value, key) => {
    if (key.startsWith('filter_')) {
      // Example: filter_filter.p.m.custom.shape=gid://shopify/Metaobject/123
      // key: filter_filter.p.m.custom.shape, value: gid://shopify/Metaobject/...
      const filterId = key.replace('filter_', '');
      // Only handle productMetafield filters for now
      if (value.startsWith('gid://shopify/Metaobject/')) {
        // Parse filterId: filter.p.m.custom.shape => namespace/key
        // Convention: filter.p.m.custom.shape (namespace: custom, key: shape)
        const idParts = filterId.split('.');
        let namespace = 'custom';
        let keyName = idParts[idParts.length - 1];
        // Try to extract namespace if present
        if (idParts.length >= 4) {
          namespace = idParts[idParts.length - 2];
        }
        filtersArray.push({
          productMetafield: {
            namespace,
            key: keyName,
            value: value,
          }
        });
      }
      // TODO: Add support for price and other filter types if needed
    }
  });


  const { country, language } = storefront.i18n;
  const variables = {
    handle,
    first: 48,
    endCursor,
    country,
    language,
    filters: filtersArray.length > 0 ? filtersArray : undefined,
    sortKey: sortConfig.value,
    reverse: sortConfig.reverse,
  };

  // Debug: log the filtersString and variables sent to the Storefront API
  // eslint-disable-next-line no-console
  // // console.log('DEBUG: filtersString', filtersString);
  // eslint-disable-next-line no-console
  // console.log('API DEBUG: Variables sent to Storefront API:', variables);

  const [{ collection }] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables,
    }),
  ]);

  if (!collection) {
    return new Response(
      JSON.stringify({ error: 'Collection not found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Fetch all variants for each product
  async function fetchAllVariants(productId: string) {
    let variants: any[] = [];
    let hasNextPage = true;
    let endCursor = null;
    while (hasNextPage) {
      const result = await storefront.query(`#graphql
        query ProductVariants($id: ID!, $first: Int!, $after: String) {
          product(id: $id) {
            variants(first: $first, after: $after) {
              nodes {
                id
                title
                image {
                  id
                  url
                  altText
                }
                price {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        }
      `, {
        variables: {
          id: productId,
          first: 250,
          after: endCursor,
        },
      });
      const v = result?.product?.variants;
      if (v?.nodes) variants.push(...v.nodes);
      hasNextPage = v?.pageInfo?.hasNextPage;
      endCursor = v?.pageInfo?.endCursor;
    }
    return variants;
  }

  let productsNodes = [];
  if (collection.products?.nodes) {
    productsNodes = await Promise.all(collection.products.nodes.map(async (product: any) => {
      if (!product || !product.id) return product;
      const allVariants = await fetchAllVariants(product.id);
      // eslint-disable-next-line no-console
      // console.log(`API: Product ${product.title} (${product.id}) has ${allVariants.length} variants.`);
      return { ...product, variants: { nodes: allVariants } };
    }));
  }
  // Log product IDs for this page
  // eslint-disable-next-line no-console
  // console.log('API: Product IDs for this page:', productsNodes.map(p => p && p.id));
  // Debug: log outgoing pageInfo.endCursor
  if (collection.products?.pageInfo) {
    // eslint-disable-next-line no-console
    // console.log('API DEBUG: Outgoing pageInfo from Storefront API:', collection.products.pageInfo);
  }
  // --- BEGIN: Enrich and filter filters (same as main loader) ---
  const shopifyFilters = collection.products?.filters || [];
  let allMetaobjectIds = [];
  for (const filter of shopifyFilters) {
    if (filter.type === 'LIST' && Array.isArray(filter.values)) {
      for (const value of filter.values) {
        if (value.input) {
          try {
            const inputObj = JSON.parse(value.input);
            const val = inputObj?.productMetafield?.value;
            if (
              typeof val === 'string' &&
              val.startsWith('gid://shopify/Metaobject/') &&
              val.length > 30
            ) {
              allMetaobjectIds.push(val);
            }
          } catch {}
        }
      }
    }
  }
  function chunkArray(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }
  const metaobjectIdChunks = chunkArray(allMetaobjectIds, 250);
  let allMetaobjects = [];
  for (const chunk of metaobjectIdChunks) {
    if (chunk.length === 0) continue;
    const nodesResult = await storefront.query(`#graphql\n      query Metaobjects($ids: [ID!]!) {\n        nodes(ids: $ids) {\n          ... on Metaobject {\n            id\n            type\n            fields {\n              key\n              value\n            }\n          }\n        }\n      }\n    `, { variables: { ids: chunk } });
    if (nodesResult && nodesResult.nodes) {
      allMetaobjects.push(...nodesResult.nodes.filter(Boolean));
    }
  }
  const metaobjectMap = {};
  for (const metaobject of allMetaobjects) {
    if (!metaobject || !metaobject.id) continue;
    const fieldObj = {};
    for (const field of metaobject.fields || []) {
      fieldObj[field.key] = field.value;
    }
    metaobjectMap[metaobject.id] = {
      ...fieldObj,
      id: metaobject.id,
      type: metaobject.type,
    };
  }
  const enrichedFilters = shopifyFilters.map((filter) => {
    if (filter.type !== 'LIST' || !Array.isArray(filter.values)) return filter;
    let values = filter.values;
    // Only show filter values with count > 0
    values = values.filter((value) => typeof value.count === 'number' && value.count > 0);
    if (filter.label && typeof filter.label === 'string' && filter.label.toLowerCase() === 'metal') {
      values = values.filter((value) => {
        const label = value.label || '';
        let metaShort = '';
        let metaTitle = '';
        if (value.input) {
          try {
            const inputObj = JSON.parse(value.input);
            metaShort = inputObj?.short_name || '';
            metaTitle = inputObj?.title_name || '';
          } catch {}
        }
        // Prefer short_name, then title_name for 18K filtering
        const metaLabel = metaShort && metaShort.trim() !== '' ? metaShort : (metaTitle || '');
        return !label.includes('18K') && !metaLabel.includes('18K');
      });
    }
    return {
      ...filter,
      values: values.map((value) => {
        let metaobjectId = null;
        if (value.input) {
          try {
            const inputObj = JSON.parse(value.input);
            if (inputObj && inputObj.productMetafield && inputObj.productMetafield.value) {
              metaobjectId = inputObj.productMetafield.value;
            }
          } catch {}
        }
        const meta = metaobjectId ? metaobjectMap[metaobjectId] : null;
        // Prefer short_name, then title_name, then value.label
        let labelOut = value.label;
        if (meta) {
          if (meta.short_name && meta.short_name.trim() !== '') {
            labelOut = meta.short_name;
          } else if (meta.title_name && meta.title_name.trim() !== '') {
            labelOut = meta.title_name;
          }
        }
        return {
          ...value,
          metaobject: meta,
          label: labelOut,
        };
      })
    };
  });
  // --- END: Enrich and filter filters ---

  return new Response(
    JSON.stringify({
      products: { nodes: productsNodes, pageInfo: collection.products.pageInfo },
      filters: enrichedFilters,
      totalProductCount: (() => {
        // Calculate total available product count from filters (same as main loader)
        let total = 0;
        const filtersArr = enrichedFilters || [];
        for (const filter of filtersArr) {
          if (filter.id === 'filter.v.availability' && Array.isArray(filter.values)) {
            for (const fv of filter.values) {
              if (
                fv.id === 'filter.v.availability.1' &&
                typeof fv.count === 'number'
              ) {
                total += fv.count;
              }
            }
            break;
          }
        }
        return total;
      })(),
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    options {
      id
      name
      values
    }
    metafield_image: metafield(namespace: "custom", key: "image") {
      value
    }
    metafield_category_image_counter: metafield(namespace: "custom", key: "category_image_counter") {
      value
    }
    keywordMetafield: metafield(namespace: "custom", key: "keyword") {
      value
    }
    variants(first: 250) {
      nodes {
        id
        title
        image {
          id
          url
          altText
        }
        price {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
` as const;

const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $endCursor: String
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      metafield(namespace: "custom", key: "open_cart_collection_id") {
        value
      }
      products(
        first: $first,
        after: $endCursor,
        filters: $filters,
        sortKey: $sortKey,
        reverse: $reverse
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
      }
    }
  }
` as const;
