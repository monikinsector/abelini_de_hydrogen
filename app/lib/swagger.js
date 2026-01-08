
/**
 * Fetches the first 30 Google reviews along with the review percentage
 * and total review count from Google Reviews and Trusted Shops.
 * Used in app/components/home-page/Testimonials.jsx
 * @param {Object} env - Environment variables containing SWAGGER_API_URL and SWAGGER_API_AUTH
 */
export async function fetchGoogleReviews(env) {
  const url = env?.SWAGGER_API_URL + "api/google_review.php";
  const token = env?.SWAGGER_API_AUTH;

  if (!url || !token) {
    throw new Error('Google Review API env variables are missing');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      accept: '*/*',
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Google reviews');
  }

  return response.json();
}

/**
 * Fetches the shopify_id from ERP - seo_url db
 *  
 * @param {Object} env - Environment variables containing SWAGGER_API_URL and SWAGGER_API_AUTH
 * @param {string} keyValue - type of key
 * @param {string} keywordValue - Keyword use for url
 * @param {string} handleCountryCode - country code (eg. gb,au)
 * @return {Promise} shopify_id
 */
export async function keywordShopifyId(env, keyValue, keywordValue, handleCountryCode = "gb") {
  const url = env?.SWAGGER_API_URL + "api/seo_url_shopify_id.php";
  const token = env?.SWAGGER_API_AUTH;

  if (!url || !token) {
    throw new Error('URL or Token env variables are missing');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      accept: '*/*',
      Authorization: token,
    },
    body: JSON.stringify({
      handle: handleCountryCode,
      keyword: keywordValue,
      key: keyValue
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Shopify Id.');
  }

  return response.json();
}