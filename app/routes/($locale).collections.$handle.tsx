import {redirect, useLoaderData} from 'react-router';
// import type {MetaFunction} from '@shopify/hydrogen';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';

import Breadcrumb from '~/components/Common/Breadcrumb';
import Hero from '~/components/Category/Hero';
import AbeliniFeatures from '~/components/Category/AbeliniFeatures';
import RingCategory from '~/components/Category/RingCategory';
import { ringCategoryData } from '~/components/Collection/ringCategoryData';
import ProductsAreaCollection from '~/components/Collection/ProductsAreaCollection';
import { breadcrumbs } from '~/components/Category/Data/category.data';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

export const meta = ({data}: {data: any}) => {
  return [{title: `Hydrogen | ${data?.collection.title ?? ''} Collection`}];
};

export async function loader(args: any) {
  // Accept sort and filter from query params
  const url = new URL(args.request.url);
  const sortParam = url.searchParams.get('sort') || 'MANUAL';
  // Map sortParam to Storefront API sortKey and reverse
  const sortMap = {
    MANUAL:        { value: 'COLLECTION_DEFAULT', text: 'Manual', reverse: false },
    BEST_SELLING:  { value: 'BEST_SELLING', text: 'Best Seller', reverse: false },
    PRICE_ASC:     { value: 'PRICE', text: 'Price (Low > High)', reverse: false },
    PRICE_DESC:    { value: 'PRICE', text: 'Price (High > Low)', reverse: true },
    ALPHA_ASC:     { value: 'TITLE', text: 'A - Z', reverse: false },
    ALPHA_DESC:    { value: 'TITLE', text: 'Z - A', reverse: true },
    CREATED:       { value: 'CREATED', text: 'Oldest - Newest', reverse: false },
    CREATED_DESC:  { value: 'CREATED', text: 'New Arrivals', reverse: true },
  };
  const sortConfig = sortMap[sortParam as keyof typeof sortMap] || sortMap['MANUAL'];
  args.sortKey = sortConfig.value;
  args.reverse = sortConfig.reverse;

  // Parse filter_* params from URL and build Shopify Storefront API filters array
  const filtersArr = [];
  let endCursorParam = url.searchParams.get('endCursor');
  for (const [key, value] of url.searchParams.entries()) {
    if (key.startsWith('filter_')) {
      filtersArr.push({
        id: key.replace('filter_', ''),
        value
      });
    }
  }
  // Convert to Shopify Storefront API filter objects
  const shopifyFilters = filtersArr.map(f => {
    // Handle metafield filters (e.g., filter.p.m.custom.by_recipient)
    if (f.id.startsWith('filter.p.m.custom.')) {
      // Extract metafield key
      const key = f.id.replace('filter.p.m.custom.', '');
      return {
        productMetafield: {
          namespace: 'custom',
          key,
          value: f.value
        }
      };
    }
    // Fallback for other filters
    if (f.value.startsWith('gid://')) {
      const [namespace, key] = f.id.split('.');
      if (namespace && key) {
        return { productMetafield: { namespace, key, value: f.value } };
      }
    }
    return { [f.id]: f.value };
  });
  args.filters = shopifyFilters.length > 0 ? shopifyFilters : undefined;
  if (endCursorParam) {
    args.endCursor = endCursorParam;
  }

  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData({ ...args, sortKey: sortConfig.value, reverse: sortConfig.reverse, filters: args.filters, endCursor: args.endCursor });

  // If paginating, append products to previous page's products
  let products = criticalData.collection.products;
  if (endCursorParam && args.session && args.session.prevProducts) {
    // This is a placeholder for session-based product accumulation if needed
    // In SSR, you may need to accumulate products in client state instead
  }

  return { ...deferredData, ...criticalData, sortParam, selectedFilters: filtersArr, endCursor: args.endCursor };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, params, request, sortKey, reverse, filters}: any) {

  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 48,
  });
  const {country, language} = storefront.i18n;

  if (!handle) {
    throw redirect('/collections');
  }

  const variables = {
    handle,
    ...paginationVariables,
    country,
    language,
    sortKey,
    reverse,
    filters,
  };


  const [{collection}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables,
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  redirectIfHandleIsLocalized(request, {handle, data: collection});

  let openCartCollectionId: number | undefined = undefined;
  const openCartCollectionIdMetafield = collection?.openCartCollectionIdMetafield;
  if (openCartCollectionIdMetafield && openCartCollectionIdMetafield.value) {
    const parsed = parseInt(openCartCollectionIdMetafield.value, 10);
    if (!isNaN(parsed)) {
      openCartCollectionId = parsed;
    }
  }

  // Parse banners metafield (custom.banners)
  // (Removed duplicate banners and bannersMetafield declaration here)

  // --- BEGIN: Fetch all variants for each product ---
  async function fetchAllVariants(productId: string) {
    let variants = [];
    let hasNextPage = true;
    let endCursor = null;
    while (hasNextPage) {
      const result: any = await storefront.query(`#graphql
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
      const v: any = result?.product?.variants;
      if (v?.nodes) variants.push(...v.nodes);
      hasNextPage = v?.pageInfo?.hasNextPage;
      endCursor = v?.pageInfo?.endCursor;
    }
    return variants;
  }

  // Fetch all variants for each product in the collection
  const products = collection.products?.nodes || [];
  for (const product of products) {
    if (!product || !product.id) continue;
    const allVariants = await fetchAllVariants(product.id);
    product.variants = { nodes: allVariants };
    // eslint-disable-next-line no-console
    // console.log(`Product: ${product.title} (${product.id}) has ${allVariants.length} variants.`);
  }
  collection.products.nodes = products;
  // --- END: Fetch all variants for each product ---

  // ...existing code for metaobject enrichment and filters...
  const shopifyFilters = collection.products?.filters || [];
  let allMetaobjectIds: string[] = [];
  for (const filter of shopifyFilters) {
    if (filter.type === 'LIST' && Array.isArray(filter.values)) {
      for (const value of filter.values) {
        if (value.input) {
          try {
            const inputObj = JSON.parse(value.input) as any;
            const val = inputObj?.productMetafield?.value;
            if (
              typeof val === 'string' &&
              val.startsWith('gid://shopify/Metaobject/') &&
              val.length > 30
            ) {
              allMetaobjectIds.push(val);
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn('Failed to parse filter value input:', value.input);
          }
        }
      }
    }
  }
  function chunkArray<T>(arr: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }
  const metaobjectIdChunks = chunkArray(allMetaobjectIds, 250);
  let allMetaobjects = [];
  for (const chunk of metaobjectIdChunks) {
    if (chunk.length === 0) continue;
    const nodesResult = await storefront.query(`#graphql
      query Metaobjects($ids: [ID!]!) {
        nodes(ids: $ids) {
          ... on Metaobject {
            id
            type
            fields {
              key
              value
            }
          }
        }
      }
    `, { variables: { ids: chunk } });
    if (nodesResult && nodesResult.nodes) {
      allMetaobjects.push(...nodesResult.nodes.filter(Boolean));
    }
  }
  const metaobjectMap: { [id: string]: any } = {};
  for (const metaobject of allMetaobjects) {
    if (!metaobject || !metaobject.id) continue;
    const fieldObj: { [key: string]: any } = {};
    for (const field of metaobject.fields || []) {
      fieldObj[field.key] = field.value;
    }
    metaobjectMap[metaobject.id] = {
      ...fieldObj,
      id: metaobject.id,
      type: metaobject.type,
    };
  }
  const enrichedFilters = shopifyFilters.map((filter: any) => {
    if (filter.type !== 'LIST' || !Array.isArray(filter.values)) return filter;
    let values = filter.values;
    // Only show filter values with count > 0
    values = values.filter((value: any) => typeof value.count === 'number' && value.count > 0);
    if (filter.label && typeof filter.label === 'string' && filter.label.toLowerCase() === 'metal') {
      values = values.filter((value: any) => {
        const label = value.label || '';
        let metaShort = '';
        let metaTitle = '';
        if (value.input) {
          try {
            const inputObj: any = JSON.parse(value.input);
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
      values: values.map((value: any) => {
        let metaobjectId: string | null = null;
        if (value.input) {
          try {
            const inputObj = JSON.parse(value.input) as any;
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

  // Debug: print enrichedFilters JSON to verify filter values
  // eslint-disable-next-line no-console
  console.log('[DEBUG] enrichedFilters:', JSON.stringify(enrichedFilters, null, 2));

  // Calculate total available product count from filters
  let totalProductCount = 0;
  for (const filter of shopifyFilters) {
    if (filter.id === 'filter.v.availability' && Array.isArray(filter.values)) {
      for (const fv of filter.values) {
        if (
          fv.id === 'filter.v.availability.1' &&
          typeof fv.count === 'number'
        ) {
          totalProductCount += fv.count;
        }
      }
      break;
    }
  }

  // Parse banners metafield (custom.banners)
  let banners = {};
  const bannersMetafield = collection?.bannersMetafield;
  if (bannersMetafield && bannersMetafield.value) {
    try {
      // Only parse if value is a non-empty string
      if (typeof bannersMetafield.value === 'string' && bannersMetafield.value.trim() !== '') {
        const bannersObj = JSON.parse(bannersMetafield.value);
        if (bannersObj && typeof bannersObj === 'object') {
          banners = bannersObj;
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to parse bannersMetafield:', err, bannersMetafield.value);
      banners = {};
    }
  }
  return {
    collection,
    openCartCollectionId,
    filters: enrichedFilters,
    totalProductCount,
    banners,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: any) {
  return {};
}


import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

export default function Collection() {
    // Add viewMode state for FilterBar
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const { collection, openCartCollectionId, filters, totalProductCount, banners, sortParam: initialSortParam } = useLoaderData<typeof loader>();
  // Remove SPA navigation, use full reload for SEO

  // Get the ring categories for this collection, if any
  const ringCategories = openCartCollectionId ? ringCategoryData[openCartCollectionId] : undefined;

  // Use loader data for products, filters, pagination, and selectedFilters
  const loaderData = useLoaderData<typeof loader>();
  const selectedFilters = loaderData.selectedFilters || [];
  const initialProducts = loaderData.collection.products?.nodes || [];
  const initialEndCursor = loaderData.endCursor || loaderData.collection.products?.pageInfo?.endCursor || null;
  const hasNextPageInitial = loaderData.collection.products?.pageInfo?.hasNextPage || false;
  // Client-side state for products and pagination
  const [products, setProducts] = React.useState(initialProducts);
  const [endCursor, setEndCursor] = React.useState(initialEndCursor);
  const [hasNextPage, setHasNextPage] = React.useState(hasNextPageInitial);
  const [loadingMore, setLoadingMore] = React.useState(false);

  // Reset products if filters or sort change (URL changes)
  React.useEffect(() => {
    setProducts(initialProducts);
    setEndCursor(initialEndCursor);
    setHasNextPage(hasNextPageInitial);
  }, [initialProducts, initialEndCursor, hasNextPageInitial]);

  // Handler for loading more products (client-side fetch)
  const onLoadMore = async () => {
    if (!hasNextPage || loadingMore) return;
    setLoadingMore(true);
    try {
      // Build API URL with current filters, sort, and endCursor
      const url = new URL(window.location.origin + `/api/collections/${collection.handle}`);
      selectedFilters.forEach(f => url.searchParams.append(`filter_${f.id}`, f.value));
      if (sortParam) url.searchParams.set('sort', sortParam);
      if (endCursor) url.searchParams.set('endCursor', endCursor);
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error('Failed to load more products');
      const data = await res.json();
      const newProducts = data.products?.nodes || [];
      setProducts(prev => prev.concat(newProducts));
      setEndCursor(data.products?.pageInfo?.endCursor || null);
      setHasNextPage(data.products?.pageInfo?.hasNextPage || false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Load more error:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Helper to build filter query string (always use metaobject id if present)
  const buildFilterQuery = (filtersArr: any[], sortParam?: string) => {
    let query = '';
    if (filtersArr && filtersArr.length > 0) {
      query = filtersArr.map(f => `filter_${encodeURIComponent(f.id)}=${encodeURIComponent(f.value)}`).join('&');
    }
    if (sortParam) {
      query += (query ? '&' : '') + `sort=${encodeURIComponent(sortParam)}`;
    }
    return query;
  };

  // Handler for filter change: only update URL
  const onFilterChange = (filterId: string, value: string) => {
    const url = new URL(window.location.href);
    // Remove all filter_ params first
    Array.from(url.searchParams.keys()).forEach(key => {
      if (key.startsWith('filter_')) url.searchParams.delete(key);
    });
    // Add all current filters except the one being changed
    selectedFilters.filter(f => f.id !== filterId).forEach(f => url.searchParams.append(`filter_${f.id}`, f.value));
    // Add the new/changed filter
    url.searchParams.append(`filter_${filterId}`, value);
    // Preserve sort param
    if (sortParam) url.searchParams.set('sort', sortParam);
    window.location.assign(url.pathname + url.search);
  };

  // Sort param from loader
  const sortParam = initialSortParam || 'MANUAL';
  const sortOptions = [
    { value: 'MANUAL', text: 'Manual' },
    { value: 'BEST_SELLING', text: 'Best Seller' },
    { value: 'PRICE_ASC', text: 'Price (Low > High)' },
    { value: 'PRICE_DESC', text: 'Price (High > Low)' },
    { value: 'ALPHA_ASC', text: 'A - Z' },
    { value: 'ALPHA_DESC', text: 'Z - A' },
    { value: 'CREATED', text: 'Oldest - Newest' },
    { value: 'CREATED_DESC', text: 'New Arrivals' },
  ];
  // Handler for sort change: only update URL
  const handleSortChange = (newSort: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('sort', newSort);
    // Remove all filter_ params first to avoid duplicates
    Array.from(url.searchParams.keys()).forEach(key => {
      if (key.startsWith('filter_')) url.searchParams.delete(key);
    });
    // Add each filter only once
    selectedFilters.forEach(f => url.searchParams.append(`filter_${f.id}`, f.value));
    window.location.assign(url.pathname + url.search);
  };
  // Remove all fetchFilteredProducts and related effects

  // (Old onLoadMore removed; only client-side async version remains)

  // List active filters above top filters
  const renderActiveFilters = () => {
    if (!selectedFilters.length) return null;
    // Handler for clearing all filters and reloading products
    const handleClearAll = () => {
      const url = new URL(window.location.href);
      // Remove all filter_ and sort params
      Array.from(url.searchParams.keys()).forEach(key => {
        if (key.startsWith('filter_') || key === 'sort') url.searchParams.delete(key);
      });
      window.location.assign(url.pathname);
    };
    // Helper to get label for a selected filter value
    const getActiveFilterLabel = (filterId: string, value: string) => {
      const filter = dynamicFilters.find((f: any) => f.id === filterId);
      if (!filter || !Array.isArray(filter.values)) return value;
      // Try to match by id, value, label, or metaobjectId (gid)
      const filterValue = filter.values.find((v: any) => {
        if (v.id === value || v.value === value || v.label === value) return true;
        // If value is a gid, check metaobjectId
        if (v.metaobject && v.metaobject.id && value && typeof value === 'string' && value.startsWith('gid://')) {
          return v.metaobject.id === value;
        }
        return false;
      });
      if (!filterValue) return value;
      // Prefer short_name, then title_name, then value.label
      if (filterValue.metaobject && filterValue.metaobject.short_name && filterValue.metaobject.short_name.trim() !== '') {
        return filterValue.metaobject.short_name;
      } else if (filterValue.metaobject && filterValue.metaobject.title_name && filterValue.metaobject.title_name.trim() !== '') {
        return filterValue.metaobject.title_name;
      } else if (filterValue.label) {
        return filterValue.label;
      }
      return value;
    };
    return (
      <div className="flex flex-wrap gap-2 mb-4 px-4">
        {selectedFilters.map(f => (
          <span key={f.id} className="bg-[#ef9000] text-white px-3 py-1 rounded-full text-sm flex items-center">
            {getActiveFilterLabel(f.id, f.value)}
            <button
              className="ml-2 text-xs text-white hover:text-gray-200 focus:outline-none"
              aria-label="Remove filter"
              onClick={() => {
                  // Remove this filter and refetch products
                  const url = new URL(window.location.href);
                  // Remove this filter param
                  url.searchParams.delete(`filter_${f.id}`);
                  // Preserve other filters and sort param
                  selectedFilters.filter(sf => sf.id !== f.id).forEach(sf => url.searchParams.append(`filter_${sf.id}`, sf.value));
                  if (sortParam) url.searchParams.set('sort', sortParam);
                  window.location.assign(url.pathname + url.search);
                }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M6 6L14 14M14 6L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </span>
        ))}
        <button
          className="ml-2 text-xs underline text-gray-600"
          onClick={handleClearAll}
        >Clear All</button>
      </div>
    );
  };

  // State for filters and total count (so they can be updated dynamically)
  const [dynamicFilters, setFilters] = useState(filters);
  const [totalProductCountState, setTotalProductCount] = useState(totalProductCount);

  // Always update dynamicFilters when filters prop changes
  React.useEffect(() => {
    setFilters(filters);
  }, [filters]);

  return (
    <section className="bg-[#fcfcfc]">
      <Breadcrumb items={breadcrumbs} />
      <Hero
        title={collection.title}
        length={180}
        description={collection.description}
      />
      <AbeliniFeatures />
      {ringCategories && ringCategories.length > 0 && (
        <RingCategory categories={ringCategories} />
      )}
      {/* Only keep the FilterBar, which includes sort and filter controls */}
      <ProductsAreaCollection
        products={products}
        filters={dynamicFilters}
        selectedFilters={selectedFilters}
        sortParam={sortParam}
        onFilterChange={onFilterChange}
        onSortChange={handleSortChange}
        totalCount={totalProductCountState}
        onLoadMore={hasNextPage ? onLoadMore : undefined}
        endCursor={endCursor}
        banners={banners}
        renderActiveFilters={renderActiveFilters}
        loadingMore={loadingMore}
      />
      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </section>
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
    # Add required metafields for dynamic image logic
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
    $last: Int
    $startCursor: String
    $endCursor: String
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $filters: [ProductFilter!]
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      openCartCollectionIdMetafield: metafield(namespace: "custom", key: "open_cart_collection_id") {
        value
      }
      bannersMetafield: metafield(namespace: "custom", key: "banners") {
        value
      }
      # filters field is not supported in Storefront API. Build filters from product data in loader.
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        sortKey: $sortKey,
        reverse: $reverse,
        filters: $filters
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
