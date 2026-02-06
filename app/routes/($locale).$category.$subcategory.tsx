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
  // --- BEGIN: Generate URLs for RingCategory items on server (with logging) ---
  // Move this logic after apiJson is initialized
  // Accept sort and filter from query params
  const url = new URL(args.request.url);
  // Read sort and order from URL and map to Shopify sortKey/reverse
  let sortParam = url.searchParams.get('sort') || 'MANUAL';
  let orderParam = url.searchParams.get('order') || '';
  // Map custom sort/order to Shopify
  let shopifySortKey = 'COLLECTION_DEFAULT';
  let shopifyReverse = false;
  // Handle both frontend and backend sort values
  if (sortParam === 'MANUAL' || sortParam === 'p.sort_order') {
    shopifySortKey = 'COLLECTION_DEFAULT';
    shopifyReverse = false;
  } else if (sortParam === 'BEST_SELLING' || sortParam === 'p.sold') {
    shopifySortKey = 'BEST_SELLING';
    shopifyReverse = false;
  } else if (
    sortParam === 'PRICE_ASC' ||
    (sortParam === 'p.price' && orderParam === 'ASC')
  ) {
    shopifySortKey = 'PRICE';
    shopifyReverse = false;
  } else if (
    sortParam === 'PRICE_DESC' ||
    (sortParam === 'p.price' && orderParam === 'DESC')
  ) {
    shopifySortKey = 'PRICE';
    shopifyReverse = true;
  } else if (
    sortParam === 'CREATED_DESC' ||
    (sortParam === 'p.product_id' && orderParam === 'DESC')
  ) {
    shopifySortKey = 'CREATED';
    shopifyReverse = true;
  }
  args.sortKey = shopifySortKey;
  args.reverse = shopifyReverse;

  // Parse filter_param from URL and build filtersArr
  const filtersArr = [];
  let endCursorParam = url.searchParams.get('endCursor');
  const filterParam = url.searchParams.get('filter_param');
  if (filterParam) {
    // filter_param=8.175_4.54 etc.
    const filterPairs = filterParam.split('_');
    filterPairs.forEach(pair => {
      const [groupId, filterId] = pair.split('.');
      if (groupId && filterId) {
        filtersArr.push({ groupId, filterId });
      }
    });
  }

  // --- Get collection ID and filter_id from third-party API (single call) ---
  const { params } = args;
  const filter_url = `${params.category || ''}${params.subcategory ? '/' + params.subcategory : ''}`;
  const apiRes = await fetch('https://erp.abelini.com/shopify/api/get_collection_id.php', {
    method: 'POST',
    headers: {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NDgzNDMzMTYsImlzcyI6Imh0dHBzOi8vZXJwLmFiZWxpbmkuY29tLyJ9.jMDU762J-JX7Y5AA3mxeFYFu8xtaBCInpqnwirrNYpo',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      'pragma': 'no-cache',
    },
    body: JSON.stringify({ handle: 'gb', filter_url, filter_param: filterParam }),
  });
  const apiJson = await apiRes.json();
  if (!apiJson.status || !apiJson.data || !apiJson.data.shopify_id) {
    console.log(apiJson.status);
    console.log(apiJson.data);
    // throw redirect('/404');
  }
  console.log(apiJson);
  let collectionId = apiJson.data.shopify_id;
  // Ensure collectionId is in GraphQL global ID format
  if (!collectionId.startsWith('gid://')) {
    collectionId = `gid://shopify/Collection/${collectionId}`;
  }
  // collectionId = `gid://shopify/Collection/482032320535`;
  // --- Get filter_id from third-party API response ---
  let metaobjectIds = [];
  if (apiJson.data && apiJson.data.filter_id) {
    // filter_id can be a single ID or comma-separated string
    if (typeof apiJson.data.filter_id === 'string') {
      metaobjectIds = apiJson.data.filter_id.split(',').map(id => id.trim()).filter(Boolean);
    } else if (Array.isArray(apiJson.data.filter_id)) {
      metaobjectIds = apiJson.data.filter_id;
    }
  }
  let current_filter_ids = filterParam?.split("_");
  if(current_filter_ids?.indexOf("6.532") > -1){
    metaobjectIds.push("190385225751");
  }
  if(current_filter_ids?.indexOf("8.175") > -1){
    metaobjectIds.push("190385553431");
  }
  metaobjectIds.push("190387748887","200424030231","190386733079");
  // console.log(metaobjectIds);
  // metaobjectIds = ["190385225751","190385553431"]
  // Build Shopify GIDs for metaobject nodes query
  const metaobjectGids = metaobjectIds.map(id => `gid://shopify/Metaobject/${id}`);
  let filters = undefined;
  let metaobjectsResult = { nodes: [] };
  if (metaobjectGids.length > 0) {
    // Query Shopify for metaobject details
    metaobjectsResult = await args.context.storefront.query(`#graphql\n      query Metaobjects($ids: [ID!]!) {\n        nodes(ids: $ids) {\n          ... on Metaobject {\n            id\n            type\n            fields {\n              key\n              value\n            }\n          }\n        }\n      }\n    `, { variables: { ids: metaobjectGids } });
    const metaobjects = metaobjectsResult?.nodes?.filter(Boolean) || [];
    // Build filters array for Storefront API
    filters = metaobjects.map((meta_v: any) => {
      if (meta_v && meta_v.type && meta_v.id) {
        return {
          productMetafield: {
            namespace: 'custom',
            key: meta_v.type,
            value: meta_v.id
          }
        };
      }
      return null;
    }).filter(Boolean);
  }
  args.filters = filters;
  if (endCursorParam) {
    args.endCursor = endCursorParam;
  }

  
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData({ ...args, collectionId, sortKey: shopifySortKey, reverse: shopifyReverse, filters: args.filters, endCursor: args.endCursor });

  
  // --- BEGIN: Generate URLs for RingCategory items on server (with logging) ---
  let ringCategoryUrls = [];
  let ringCategories = [];
  // Use metaobjectsResult (from GraphQL) to determine all active filters
  // metaobjectsResult is the result of the metaobjectGids query above
  // It is used to build the filters array for Storefront API
  // We'll use it to get all groupId/filterId pairs for active filters
  let metaobjectsForFilters = [];
  if (typeof metaobjectsResult !== 'undefined' && metaobjectsResult?.nodes) {
    metaobjectsForFilters = metaobjectsResult.nodes.filter(Boolean);
  }
  // Build active filter keys from metaobjectsForFilters
  const activeFilterKeys = Array.isArray(metaobjectsForFilters)
    ? metaobjectsForFilters.map(meta_v => {
        // Try to get groupId and filterId from metaobject fields
        let groupId = '';
        let filterId = '';
        if (meta_v && Array.isArray(meta_v.fields)) {
          for (const field of meta_v.fields) {
            if (field.key === 'filter_group_id' || field.key === 'group_id' || field.key === 'groupId') groupId = field.value;
            if (field.key === 'filter_id' || field.key === 'id' || field.key === 'filterId') filterId = field.value;
          }
        }
        // Normalize groupId: if it looks like '5.0', use only '5'
        if (typeof groupId === 'string' && groupId.includes('.')) {
          groupId = groupId.split('.')[0];
        }
        return groupId && filterId ? `${groupId}.${filterId}` : null;
      }).filter(Boolean)
    : [];

  console.log("metaobjectsResult " , metaobjectsResult.nodes[0]);
  // Now generate RingCategory URLs using only metaobjectsResult
  // Fix: Ensure openCartCollectionId is set from both snake_case and camelCase, and coerce to string for lookup
  let openCartCollectionId = apiJson.data?.open_cart_collection_id ?? apiJson.data?.openCartCollectionId;
  if (!openCartCollectionId && criticalData?.openCartCollectionId !== undefined && criticalData?.openCartCollectionId !== null) {
    openCartCollectionId = String(criticalData.openCartCollectionId).trim();
  } else if (openCartCollectionId !== undefined && openCartCollectionId !== null) {
    openCartCollectionId = String(openCartCollectionId).trim();
  }
  try {
    ringCategories = openCartCollectionId ? (ringCategoryData[openCartCollectionId] || []) : [];
    const filtered = Array.isArray(ringCategories) ? ringCategories.filter(item => item.code && item.code.trim() !== '') : [];
    const promises = filtered.map(async item => {
      const groupId = '5';
      const filterId = item.filter_id;
      // console.log('[DEBUG] activeFilterKeys:', activeFilterKeys);
      // Use only metaobjectsResult-based activeFilterKeys
      const selectedFilterKeys = [...activeFilterKeys, `${groupId}.${filterId}`];
      const requestBody = {
        handle: 'gb',
        filter_id: selectedFilterKeys.join(','),
        path: openCartCollectionId
      };
      // console.log('[DEBUG] write_url.php 1:', requestBody);
      try {
        const res = await fetch('https://design.abelini.com.au/swagger/api/write_url.php', {
          method: 'POST',
          headers: {
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NTY4MDc4MTQsImlzcyI6Imh0dHBzOi8vd3d3LmFiZWxhbmUuY29tLyJ9.AbXweQhw3NbgAdJvedtubx8PM8ABEgybZfaZ6k_qZLA',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'pragma': 'no-cache',
          },
          body: JSON.stringify(requestBody),
        });
        const json = await res.json();
        // console.log('[DEBUG] write_url.php response for RingCategory item:', json);
        return json.redirect || json.url || '#';
      } catch (err) {
        // console.log('[DEBUG] write_url.php error:', err);
        return '#';
      }
    });
    ringCategoryUrls = await Promise.all(promises);
  } catch (err) {
    ringCategoryUrls = [];
    ringCategories = [];
  }
  // --- END: Generate URLs for RingCategory items on server (with logging) ---
  // Print collectionId after API call and formatting
  // eslint-disable-next-line no-console
  // console.log('[DEBUG] collectionId after API call and formatting:', collectionId);
  // Print metaobjectIds and filters for debug
  // eslint-disable-next-line no-console
  // console.log('[DEBUG] metaobjectIds:', metaobjectIds);
  // eslint-disable-next-line no-console
  // console.log('[DEBUG] filters for Storefront API:', filters);

  // --- Build activeFilters array for client (with label/meta info) ---
  // filters: array of { productMetafield: { namespace, key, value (metaobjectId) } }
  // criticalData.filters: enriched filters from COLLECTION_QUERY
  let activeFilters = [];
  const activeMetaobjectIds = Array.isArray(filters)
    ? filters.map(f => f.productMetafield && f.productMetafield.value).filter(Boolean)
    : [];
  // Mark selected values in enriched filters
  let enrichedFiltersWithSelected = Array.isArray(criticalData.filters)
    ? criticalData.filters.map(filter => {
        if (!Array.isArray(filter.values)) return filter;
        return {
          ...filter,
          values: filter.values.map(value => {
            let selected = false;
            if (value.metaobject && value.metaobject.id) {
              selected = activeMetaobjectIds.includes(value.metaobject.id);
            }
            return { ...value, selected };
          })
        };
      })
    : criticalData.filters;

  // Build activeFilters array and removal URLs for each filter
  let activeFilterRemovalUrls = [];
  if (Array.isArray(filters) && Array.isArray(enrichedFiltersWithSelected)) {
    // For each filter in enriched filters
    for (const filter of enrichedFiltersWithSelected) {
      if (!Array.isArray(filter.values)) continue;
      for (const value of filter.values) {
        if (value.metaobject && value.metaobject.id && value.selected) {
          activeFilters.push({
            id: filter.id,
            groupLabel: filter.label,
            value: value.metaobject.id,
            label: value.label,
            metaobject: value.metaobject
          });
        }
      }
    }
    // For each active filter, build removal URL by omitting it from the filter set
    for (let i = 0; i < activeFilters.length; i++) {
      // Build filter_param for all other active filters except the one being removed
      const otherFilters = activeFilters.filter((_, idx) => idx !== i);
      const filterParamArr = otherFilters.map(f => {
        // Use groupId and filterId from metaobject, normalize groupId (e.g., '5.0' -> '5')
        let groupId = f.metaobject?.filter_group_id || f.metaobject?.group_id || f.metaobject?.groupId;
        const filterId = f.metaobject?.filter_id || f.metaobject?.id || f.metaobject?.filterId;
        if (typeof groupId === 'string' && groupId.includes('.')) {
          groupId = groupId.split('.')[0];
        }
        return groupId && filterId ? `${groupId}.${filterId}` : null;
      }).filter(Boolean);
      const filterParam = filterParamArr.join('_');
      // Build request body for third-party API
      const requestBody = {
        handle: 'gb',
        filter_id: filterParamArr.join(','),
        path: openCartCollectionId
      };
      activeFilterRemovalUrls.push({
        idx: i,
        requestBody
      });
    }
    // Fire all API calls in parallel
    const removalUrlPromises = activeFilterRemovalUrls.map(async ({ idx, requestBody }) => {
      try {
        // console.log('[DEBUG] write_url.php 2:', requestBody);
        const res = await fetch('https://design.abelini.com.au/swagger/api/write_url.php', {
          method: 'POST',
          headers: {
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NTY4MDc4MTQsImlzcyI6Imh0dHBzOi8vd3d3LmFiZWxhbmUuY29tLyJ9.AbXweQhw3NbgAdJvedtubx8PM8ABEgybZfaZ6k_qZLA',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'pragma': 'no-cache',
          },
          body: JSON.stringify(requestBody),
        });
        const json = await res.json();
        // console.log('[DEBUG] write_url.php 2 response for RingCategory item:', json);
        return json.redirect || json.url || '#';
      } catch (err) {
        // console.log('[DEBUG] write_url.php 2 error:', err);
        return '#';
      }
    });
    const removalUrls = await Promise.all(removalUrlPromises);
    // Attach removalUrl to each activeFilter
    activeFilters = activeFilters.map((f, idx) => ({ ...f, removalUrl: removalUrls[idx] }));
  }

  // --- BEGIN: Fetch filter value URLs from third-party API and attach to filter values ---
  // Build a set of unique filter value params to deduplicate API calls
  const filterUrlMap = new Map();
  const filterUrlPromises = [];
  // For each filter and value, prepare API call
  if (Array.isArray(enrichedFiltersWithSelected)) {
    for (const filter of enrichedFiltersWithSelected) {
      if (!Array.isArray(filter.values)) continue;
      for (const value of filter.values) {
        // Build a unique key for this filter value (e.g., groupId.filterId)
        let groupIdRaw = value.metaobject?.filter_group_id || value.metaobject?.group_id || value.metaobject?.groupId;
        // Convert groupId like '5.0' to '5'
        const groupId = typeof groupIdRaw === 'string' ? groupIdRaw.split('.')[0] : groupIdRaw;
        const filterIdAttr = value.metaobject?.filter_id || value.metaobject?.id || value.metaobject?.filterId;
        if (groupId && filterIdAttr) {
          const key = `${groupId}.${filterIdAttr}`;
          if (!filterUrlMap.has(key)) {
            // Prepare API call
            // Use activeFilterKeys (from metaobjectsResult) instead of filtersArr
            let selectedFilterKeys = Array.isArray(activeFilterKeys) ? [...activeFilterKeys] : [];
            // Always push the current filter value (groupId.filterIdAttr)
            selectedFilterKeys.push(`${groupId}.${filterIdAttr}`);
            const requestBody = {
              handle: 'gb',
              filter_id: selectedFilterKeys.join(','),
              path: openCartCollectionId
            };
            // eslint-disable-next-line no-console
            // console.log('[DEBUG] write_url.php 3:', requestBody);
            const apiPromise = fetch('https://design.abelini.com.au/swagger/api/write_url.php', {
              method: 'POST',
              headers: {
                'accept': '*/*',
                'accept-language': 'en-US,en;q=0.9',
                'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NTY4MDc4MTQsImlzcyI6Imh0dHBzOi8vd3d3LmFiZWxhbmUuY29tLyJ9.AbXweQhw3NbgAdJvedtubx8PM8ABEgybZfaZ6k_qZLA',
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'pragma': 'no-cache',
              },
              body: JSON.stringify(requestBody),
            })
              .then(res => res.json())
              .then(json => {
                // eslint-disable-next-line no-console
                // console.log('[DEBUG] write_url.php 3 response:', json);
                // API may return { redirect: ... } or { url: ... }
                if (json && (json.redirect || json.url)) {
                  filterUrlMap.set(key, json.redirect || json.url);
                } else {
                  filterUrlMap.set(key, '');
                }
              })
              .catch((err) => {
                // console.log('[DEBUG] write_url.php 3 error:', err);
                // eslint-disable-next-line no-console
                // console.error(`[FILTER URL API] Error for ${selectedFilterKeys.join(',')}`, err);
                filterUrlMap.set(key, '');
              });
            filterUrlPromises.push(apiPromise);
          }
        }
      }
    }
  }
  // Await all API calls
  if (filterUrlPromises.length > 0) {
    await Promise.all(filterUrlPromises);
  }
  // Debug: print filterUrlMap after all fetch calls
  // eslint-disable-next-line no-console
  // console.log('[FILTER URL API] filterUrlMap after all fetches:', Array.from(filterUrlMap.entries()));
  // Attach URLs to filter values
  if (Array.isArray(enrichedFiltersWithSelected)) {
    for (const filter of enrichedFiltersWithSelected) {
      if (!Array.isArray(filter.values)) continue;
      for (const value of filter.values) {
        const groupIdRaw = value.metaobject?.filter_group_id || value.metaobject?.group_id || value.metaobject?.groupId;
        const groupId = typeof groupIdRaw === 'string' ? groupIdRaw.split('.')[0] : groupIdRaw;
        const filterIdAttr = value.metaobject?.filter_id || value.metaobject?.id || value.metaobject?.filterId;
        if (groupId && filterIdAttr) {
          const key = `${groupId}.${filterIdAttr}`;
          // console.log(`[FILTER URL API] URL for ${key}:`, filterUrlMap.get(key));
          value.url = filterUrlMap.get(key) || '';
        }
      }
    }
  }
  // Return metaobject filters, activeFilters (with removalUrl), and enrichedFiltersWithSelected for use in the client
  return { ...deferredData, ...criticalData, sortParam, selectedFilters: filtersArr, endCursor: args.endCursor, metaobjectFilters: filters, activeFilters, filters: enrichedFiltersWithSelected, ringCategoryUrls, activeFilterKeys };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, params, request, sortKey, reverse, filters}: any) {

  const { collectionId } = arguments[0];
  // Print collectionId before passing to GraphQL query
  // eslint-disable-next-line no-console
  // console.log('[DEBUG] collectionId before GraphQL query:', collectionId);
  // Print sortKey before passing to COLLECTION_QUERY
  // eslint-disable-next-line no-console
  console.log('[DEBUG] sortKey before COLLECTION_QUERY:', sortKey);
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 48,
  });
  const {country, language} = storefront.i18n;

  if (!collectionId) {
    throw redirect('/404');
  }

  const variables = {
    id: collectionId,
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
    throw new Response(`Collection ${collectionId} not found`, {
      status: 404,
    });
  }

  // (If you need to localize, update this logic to use collectionId)

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
  // console.log('[DEBUG] enrichedFilters:', JSON.stringify(enrichedFilters, null, 2));

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

  // Use loader data for products, filters, pagination, and selectedFilters
  const loaderData = useLoaderData<typeof loader>();
  // Get the ring categories and URLs for this collection, if any
  const ringCategories = loaderData.openCartCollectionId ? ringCategoryData[loaderData.openCartCollectionId] : undefined;
  const ringCategoryUrls = loaderData.ringCategoryUrls || [];
  // Always use metaobject-based activeFilters for SSR/reload selected state
  const selectedFilters = (loaderData.activeFilters || []).map(f => ({ id: f.id, value: f.value }));
  const activeFilters = loaderData.activeFilters || [];
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
      // Use dummy handle and pass collection_id as query param
      const url = new URL(window.location.origin + `/api/collections/collection`);
      url.searchParams.set('collection_id', collection.id);
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

  // Handler for filter change: update URL with filter_param
  const onFilterChange = (filterId: string, value: string) => {
    // Find all selected filters including the new one
    const updatedFilters = selectedFilters.filter(f => f.id !== filterId).concat([{ id: filterId, value }]);
    let filterParams = [];
    updatedFilters.forEach(f => {
      // Try to find the filter value element by metaobject id or label
      let el = document.querySelector(`[data-metaobject-id='${f.value}']`);
      if (!el) {
        el = document.querySelector(`[data-label='${f.value}']`);
      }
      if (el) {
        const groupId = el.getAttribute('data-filter_group_id');
        const filterIdAttr = el.getAttribute('data-filter_id');
        if (groupId && filterIdAttr) {
          filterParams.push(`${groupId}.${filterIdAttr}`);
        }
      }
    });
    // Build filter_param value
    const filterParamValue = filterParams.join('_');
    const url = new URL(window.location.href);
    // Remove all filter_ params
    Array.from(url.searchParams.keys()).forEach(key => {
      if (key.startsWith('filter_')) url.searchParams.delete(key);
    });
    // Set filter_param
    if (filterParamValue) {
      url.searchParams.set('filter_param', filterParamValue);
    } else {
      url.searchParams.delete('filter_param');
    }
    // Preserve sort param
    if (sortParam) url.searchParams.set('sort', sortParam);
    window.location.assign(url.pathname + url.search);
  };

  // Sort param from loader
  // Map backend sort values to dropdown values
  let sortParam = initialSortParam || 'MANUAL';
  // Read orderParam from URL for mapping
  let orderParam = '';
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    orderParam = url.searchParams.get('order') || '';
  }
  // If sortParam is a backend value, map to dropdown value
  if (sortParam === 'p.sold') {
    sortParam = 'BEST_SELLING';
  } else if (sortParam === 'p.price' && orderParam === 'ASC') {
    sortParam = 'PRICE_ASC';
  } else if (sortParam === 'p.price' && orderParam === 'DESC') {
    sortParam = 'PRICE_DESC';
  } else if (sortParam === 'p.product_id') {
    sortParam = 'CREATED_DESC';
  } else if (sortParam === 'p.sort_order') {
    sortParam = 'MANUAL';
  }
  const sortOptions = [
    { value: 'MANUAL', text: 'Manual' },
    { value: 'BEST_SELLING', text: 'Best Seller' },
    { value: 'PRICE_ASC', text: 'Price (Low > High)' },
    { value: 'PRICE_DESC', text: 'Price (High > Low)' },
    { value: 'CREATED_DESC', text: 'New Arrivals' },
  ];
  // Handler for sort change: only update URL
  const handleSortChange = (newSort: string) => {
    const url = new URL(window.location.href);
    let srt_val = newSort;
    let odr_val = '';
    if (newSort === "BEST_SELLING") {
      srt_val = "p.sold";
      odr_val = "DESC";
    } else if (newSort === "PRICE_ASC") {
      srt_val = "p.price";
      odr_val = "ASC";
    } else if (newSort === "PRICE_DESC") {
      srt_val = "p.price";
      odr_val = "DESC";
    } else if (newSort === "CREATED_DESC") {
      srt_val = "p.product_id";
      odr_val = "DESC";
    } else if (newSort === "MANUAL") {
      srt_val = "p.sort_order";
      odr_val = "ASC";
    }
    url.searchParams.set('sort', srt_val);
    if (odr_val) {
      url.searchParams.set('order', odr_val);
    } else {
      url.searchParams.delete('order');
    }
    window.location.assign(url.pathname + url.search);
  };
  // Remove all fetchFilteredProducts and related effects

  // (Old onLoadMore removed; only client-side async version remains)

  // List active filters above top filters (use activeFilters from loader)
  const renderActiveFilters = () => {
    if (!activeFilters.length) return null;
    // Handler for clearing all filters and reloading products
    const handleClearAll = () => {
      const url = new URL(window.location.href);
      // Remove all filter_ and sort params
      Array.from(url.searchParams.keys()).forEach(key => {
        if (key.startsWith('filter_') || key === 'sort' || key === 'filter_param') url.searchParams.delete(key);
      });
      window.location.assign(url.pathname);
    };
    return (
      <div className="flex flex-wrap gap-2 mb-4 px-4">
        {activeFilters.map(f => (
          <a
            key={f.value}
            href={f.removalUrl || '#'}
            className="bg-[#ef9000] text-white px-3 py-1 rounded-full text-sm flex items-center hover:bg-[#d87c00] transition-colors"
            data-group-id={f.metaobject?.filter_group_id || f.metaobject?.group_id || f.metaobject?.groupId || ''}
            data-filter-id={f.metaobject?.filter_id || f.metaobject?.id || f.metaobject?.filterId || ''}
            aria-label={`Remove filter: ${f.label}`}
            style={{ textDecoration: 'none' }}
          >
            {f.label}
            <span className="ml-2 text-xs text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M6 6L14 14M14 6L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </span>
          </a>
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
        <RingCategory categories={ringCategories} urls={ringCategoryUrls} activeFilterIds={loaderData.activeFilterKeys || []} />
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
    $id: ID!
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
    collection(id: $id) {
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
