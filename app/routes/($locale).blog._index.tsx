import {useLoaderData} from 'react-router';
import type {Route} from './+types/blogs._index';
import {getPaginationVariables} from '@shopify/hydrogen';
import type {ArticleItemFragment} from 'storefrontapi.generated';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {ArticleItem} from '~/components/Blog/ArticleItem';
import {BlogCategories} from '~/components/Blog/BlogCategories';

// Constants
const DEFAULT_PAGE_SIZE = 12;
const MAX_BLOGS_LIMIT = 250; // Shopify's max limit

// Shared empty connection structure
const EMPTY_CONNECTION = {
  nodes: [],
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    endCursor: null,
    startCursor: null,
  },
} as const;

// Shared ArticleItem fragment to avoid duplication
const ARTICLE_ITEM_FRAGMENT = `
  fragment ArticleItem on Article {
    author: authorV2 {
      name
    }
    contentHtml
    handle
    id
    image {
      id
      altText
      url
      width
      height
    }
    publishedAt
    title
    blog {
      handle
    }
  }
` as const;

export const meta: Route.MetaFunction = () => {
  return [{title: `Hydrogen | Blogs`}];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, request}: Route.LoaderArgs) {
  const articlePaginationVariables = getPaginationVariables(request, {
    pageBy: DEFAULT_PAGE_SIZE,
  });

  // Fetch all blogs and all articles
  return await loadAllArticles({context, articlePaginationVariables});
}

/**
 * Load all articles from all blogs using search API
 */
async function loadAllArticles({
  context,
  articlePaginationVariables,
}: {
  context: Route.LoaderArgs['context'];
  articlePaginationVariables: ReturnType<typeof getPaginationVariables>;
}) {
  try {
    const [blogsResult, articlesResult] = await Promise.all([
      context.storefront.query(BLOGS_QUERY, {
        variables: {
          first: MAX_BLOGS_LIMIT,
        },
      }),
      context.storefront.query(ALL_ARTICLES_QUERY, {
        variables: buildSearchPaginationVariables(articlePaginationVariables),
      }),
    ]);

    const blogs = blogsResult?.blogs;
    const articles = articlesResult?.articles;

    if (!articles) {
      return {
        blogs: blogs || EMPTY_CONNECTION,
        articles: EMPTY_CONNECTION,
        selectedBlog: null,
      };
    }

    const nodes = Array.isArray(articles.nodes) ? articles.nodes : [];
    const pageInfo = normalizePageInfo(
      articles.pageInfo,
      nodes.length,
      articlePaginationVariables,
    );

    return {
      blogs: blogs || EMPTY_CONNECTION,
      articles: {
        nodes,
        pageInfo,
      },
      selectedBlog: null,
    };
  } catch (error) {
    // Log error for debugging (consider using proper logging service in production)
    console.error('Error fetching articles:', error);

    // Fallback: return blogs with empty articles
    return await loadBlogsFallback(context);
  }
}

/**
 * Build pagination variables for search API
 */
function buildSearchPaginationVariables(
  articlePaginationVariables: ReturnType<typeof getPaginationVariables>,
) {
  const isForward = 'first' in articlePaginationVariables;

  return {
    first: isForward ? articlePaginationVariables.first || DEFAULT_PAGE_SIZE : undefined,
    last: !isForward ? articlePaginationVariables.last || DEFAULT_PAGE_SIZE : undefined,
    endCursor: isForward ? articlePaginationVariables.endCursor || undefined : undefined,
    startCursor: !isForward ? articlePaginationVariables.startCursor || undefined : undefined,
  };
}

/**
 * Normalize pageInfo with fallback defaults
 */
function normalizePageInfo(
  pageInfo: {hasNextPage?: boolean; hasPreviousPage?: boolean; endCursor?: string | null; startCursor?: string | null} | null | undefined,
  nodesLength: number,
  articlePaginationVariables: ReturnType<typeof getPaginationVariables>,
) {
  if (pageInfo) {
    return {
      hasNextPage: Boolean(pageInfo.hasNextPage),
      hasPreviousPage: Boolean(pageInfo.hasPreviousPage),
      endCursor: pageInfo.endCursor ?? null,
      startCursor: pageInfo.startCursor ?? null,
    };
  }

  // Fallback: create default pageInfo
  const requestedCount =
    ('first' in articlePaginationVariables
      ? articlePaginationVariables.first
      : articlePaginationVariables.last) || DEFAULT_PAGE_SIZE;

  return {
    hasNextPage: nodesLength >= requestedCount,
    hasPreviousPage: false,
    endCursor: null,
    startCursor: null,
  };
}

/**
 * Fallback loader for blogs when articles query fails
 */
async function loadBlogsFallback(context: Route.LoaderArgs['context']) {
  try {
    const blogsResult = await context.storefront.query(BLOGS_QUERY, {
      variables: {
        first: MAX_BLOGS_LIMIT,
      },
    });

    return {
      blogs: blogsResult?.blogs || EMPTY_CONNECTION,
      articles: EMPTY_CONNECTION,
      selectedBlog: null,
    };
  } catch (blogsError) {
    console.error('Error fetching blogs:', blogsError);
    return {
      blogs: EMPTY_CONNECTION,
      articles: EMPTY_CONNECTION,
      selectedBlog: null,
    };
  }
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Blogs() {
  const {blogs, articles, selectedBlog} = useLoaderData<typeof loader>();

  return (
    <section>
      <div className="container-fluid px-4 lg:px-10 my-6">
        <div className="blogs">
          <h1 className="text-h2 font-bold text-primary mx-auto text-center my-6">
          {selectedBlog ? `Articles from ${selectedBlog.title}` : 'Blog'}
          </h1>

          {/* Blog Categories */}
          <BlogCategories
            blogs={blogs}
            selectedBlogHandle={selectedBlog?.handle}
          />

          {/* Articles Section */}
          {articles && (
            <div className="articles-section">
              <div className="articles-grid grid grid-cols-2 lg:grid-cols-4">
                <PaginatedResourceSection<ArticleItemFragment>
                  connection={articles}
                >
                  {({node: article, index}) => (
                    <ArticleItem
                      article={article}
                      key={article.id}
                      loading={index < 4 ? 'eager' : 'lazy'}
                    />
                  )}
                </PaginatedResourceSection>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// GraphQL Queries
// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog
const BLOGS_QUERY = `#graphql
  query Blogs(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    blogs(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        title
        handle
        seo {
          title
          description
        }
      }
    }
  }
` as const;

// Query to get all articles from all blogs
// Note: Shopify doesn't have a direct "all articles" query,
// so we use the search API to get all articles
// The search API supports pagination with 'after' and 'before' cursors
const ALL_ARTICLES_QUERY = `#graphql
  query AllArticles(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    articles: search(
      query: "*",
      types: [ARTICLE],
      first: $first,
      last: $last,
      after: $endCursor,
      before: $startCursor
    ) {
      nodes {
        ...on Article {
          ...ArticleItem
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        endCursor
        startCursor
      }
    }
  }
  ${ARTICLE_ITEM_FRAGMENT}
` as const;
