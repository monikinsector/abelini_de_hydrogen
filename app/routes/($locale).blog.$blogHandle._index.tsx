import {useLoaderData} from 'react-router';
import type {Route} from './+types/blog.$blogHandle._index';
import {getPaginationVariables} from '@shopify/hydrogen';
import type {ArticleItemFragment} from 'storefrontapi.generated';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {ArticleItem} from '~/components/Blog/ArticleItem';
import {BlogCategories} from '~/components/Blog/BlogCategories';
import {ArticleContent} from '~/components/Blog/ArticleContent';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

// Constants
const DEFAULT_PAGE_SIZE = 12;
const MAX_BLOGS_LIMIT = 250; // Shopify's max limit

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `Hydrogen | ${data?.blog.title ?? ''} blog`}];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Check if a handle is an article by searching through blogs
 */
async function findArticleByHandle(
  context: Route.LoaderArgs['context'],
  articleHandle: string,
  blogs: {nodes: Array<{handle: string}>} | null | undefined,
): Promise<{blog: any; article: any} | null> {
  if (!blogs?.nodes) {
    return null;
  }

  for (const blogNode of blogs.nodes) {
    try {
      const articleCheckResult = await context.storefront.query(
        `#graphql
          query CheckArticle($blogHandle: String!, $articleHandle: String!) {
            blog(handle: $blogHandle) {
              articleByHandle(handle: $articleHandle) {
                handle
              }
            }
          }
        `,
        {
          variables: {
            blogHandle: blogNode.handle,
            articleHandle,
          },
        },
      );

      if (articleCheckResult?.blog?.articleByHandle) {
        return await loadFullArticleData(context, blogNode.handle, articleHandle);
      }
    } catch (redirectError: any) {
      // If it's a redirect, re-throw it
      if (redirectError?.status === 302 || redirectError?.status === 301 || redirectError?.status === 307) {
        throw redirectError;
      }
      // Otherwise continue searching
      continue;
    }
  }

  return null;
}

/**
 * Load full article data including blog information
 */
async function loadFullArticleData(
  context: Route.LoaderArgs['context'],
  blogHandle: string,
  articleHandle: string,
): Promise<{blog: any; article: any} | null> {
  const fullArticleResult = await context.storefront.query(
    `#graphql
      query ArticleData($blogHandle: String!, $articleHandle: String!) {
        blog(handle: $blogHandle) {
          title
          handle
          articleByHandle(handle: $articleHandle) {
            handle
            title
            contentHtml
            publishedAt
            author: authorV2 {
              name
            }
            image {
              id
              altText
              url
              width
              height
            }
            seo {
              description
              title
            }
          }
        }
      }
    `,
    {
      variables: {
        blogHandle,
        articleHandle,
      },
    },
  );

  const articleBlog = fullArticleResult?.blog;
  const article = articleBlog?.articleByHandle;

  if (article && articleBlog) {
    return {blog: articleBlog, article};
  }

  return null;
}

/**
 * Create default blogs structure
 */
function createDefaultBlogs() {
  return {
    nodes: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      endCursor: null,
      startCursor: null,
    },
  };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, request, params}: Route.LoaderArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: DEFAULT_PAGE_SIZE,
  });

  if (!params.blogHandle) {
    throw new Response(`blog not found`, {status: 404});
  }

  // Fetch blog with articles and all blogs for categories in parallel
  const [blogResult, blogsResult] = await Promise.all([
    context.storefront.query(BLOG_QUERY, {
      variables: {
        blogHandle: params.blogHandle,
        ...paginationVariables,
      },
    }),
    context.storefront.query(BLOGS_QUERY, {
      variables: {
        first: MAX_BLOGS_LIMIT,
      },
    }),
  ]);

  const blog = blogResult?.blog;
  const blogs = blogsResult?.blogs || createDefaultBlogs();

  // If blog not found, check if it's an article handle
  if (!blog) {
    const articleData = await findArticleByHandle(context, params.blogHandle, blogsResult?.blogs);
    
    if (articleData) {
      redirectIfHandleIsLocalized(request, {
        handle: params.blogHandle,
        data: articleData.article,
      });

      return {
        isArticle: true,
        article: articleData.article,
        blog: articleData.blog,
        blogs,
      };
    }

    throw new Response('Not found', {status: 404});
  }

  if (!blog?.articles) {
    throw new Response('Not found', {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle: params.blogHandle, data: blog});

  return {
    blog,
    blogs,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Blog() {
  const data = useLoaderData<typeof loader>();
  
  // Check if this is an article (handled by blog route when article handle matches)
  if (data.isArticle) {
    const {article, blog, blogs} = data;
    return (
      <section>
        <div className="container-fluid px-4 lg:px-10 my-6">
          <div className="blogs">
            <h1 className="text-h2 font-bold text-primary mx-auto text-center my-6">
              {blog.title}
            </h1>

            {/* Blog Categories */}
            <BlogCategories
              blogs={blogs}
              selectedBlogHandle={blog.handle}
            />

            {/* Article Content */}
            <ArticleContent article={article} />
          </div>
        </div>
      </section>
    );
  }

  // Otherwise, it's a blog listing
  const {blog, blogs} = data;
  const {articles} = blog;

  return (
    <section>
      <div className="container-fluid px-4 lg:px-10 my-6">
        <div className="blogs">
          <h1 className="text-h2 font-bold text-primary mx-auto text-center my-6">
            {`Articles from ${blog.title}`}
          </h1>

          {/* Blog Categories */}
          <BlogCategories
            blogs={blogs}
            selectedBlogHandle={blog.handle}
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

const BLOG_QUERY = `#graphql
  query Blog(
    $country: CountryCode
    $language: LanguageCode
    $blogHandle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    blog(handle: $blogHandle) {
      title
      handle
      seo {
        title
        description
      }
      articles(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ArticleItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          hasNextPage
          endCursor
          startCursor
        }

      }
    }
  }
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
