import {useLoaderData} from 'react-router';
import type {Route} from './+types/blogs.$articleHandle';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {ArticleContent} from '~/components/Blog/ArticleContent';
import {BlogCategories} from '~/components/Blog/BlogCategories';

// Constants
const MAX_BLOGS_LIMIT = 250; // Shopify's max limit

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `Hydrogen | ${data?.article.title ?? ''} article`}];
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
async function loadCriticalData({context, request, params}: Route.LoaderArgs) {
  const {articleHandle} = params;

  if (!articleHandle) {
    throw new Response('Not found', {status: 404});
  }

  try {
    // Fetch all blogs first
    const blogsResult = await context.storefront.query(BLOGS_QUERY, {
      variables: {
        first: MAX_BLOGS_LIMIT,
      },
    });

    const blogs = blogsResult?.blogs;

    if (!blogs?.nodes || blogs.nodes.length === 0) {
      throw new Response(null, {status: 404});
    }

    // Search through each blog to find the article
    // This is necessary since Shopify doesn't have direct article lookup by handle
    let article = null;
    let blog = null;

    for (const blogNode of blogs.nodes) {
      try {
        const blogResult = await context.storefront.query(BLOG_ARTICLE_QUERY, {
          variables: {
            blogHandle: blogNode.handle,
            articleHandle,
          },
        });

        if (blogResult?.blog?.articleByHandle) {
          article = blogResult.blog.articleByHandle;
          blog = blogResult.blog;
          break;
        }
      } catch (e) {
        continue;
      }
    }

    if (!article || !blog) {
      throw new Response(null, {status: 404});
    }

    redirectIfHandleIsLocalized(request, {
      handle: articleHandle,
      data: article,
    });

    return {
      article,
      blog,
      blogs: blogs || {nodes: [], pageInfo: {hasNextPage: false, hasPreviousPage: false, endCursor: null, startCursor: null}},
    };
  } catch (error) {
    console.error('Error loading article:', error);
    throw new Response(null, {status: 404});
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

export default function Article() {
  const {article, blog, blogs} = useLoaderData<typeof loader>();

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

// Query to search article in a specific blog
// Since Shopify doesn't have articleByHandle at root level,
// we search through each blog to find the article
const BLOG_ARTICLE_QUERY = `#graphql
  query BlogArticle(
    $blogHandle: String!
    $articleHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
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
` as const;
