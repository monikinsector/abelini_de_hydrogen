# Blog System Documentation

## Overview

The blog system consists of three main pages that work together to display blogs, categories, and articles from Shopify. All pages share a consistent layout with blog categories navigation.

---

## 📄 Page 1: Blog Listing (All Articles)

**Route File:** `app/routes/($locale).blog._index.tsx`  
**URL Pattern:** `/blog`  
**Purpose:** Displays all articles from all blogs

### Route Details

- **File:** `($locale).blog._index.tsx`
- **URL:** `/blog`
- **Component:** `Blogs()`

### GraphQL Queries

#### 1. BLOGS_QUERY
Fetches all blogs (up to 250) for category navigation.

```graphql
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
```

#### 2. ALL_ARTICLES_QUERY
Fetches all articles from all blogs using Shopify's search API.

```graphql
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
```

**Note:** Uses search API because Shopify doesn't have a direct "all articles" query.

### Data Flow

1. **Loader** (`loader` function):
   - Calls `loadCriticalData()` to fetch blogs and articles
   - Handles errors gracefully, returns empty state on failure
   - Returns: `{ blogs, articles, selectedBlog: null }`

2. **loadCriticalData()**:
   - Gets pagination variables (default: 12 items per page)
   - Calls `loadAllArticles()`

3. **loadAllArticles()**:
   - Fetches blogs and articles in parallel
   - Normalizes pagination data
   - Falls back to `loadBlogsFallback()` on error

### Components Used

- `BlogCategories` - Category navigation
- `ArticleItem` - Individual article card
- `PaginatedResourceSection` - Handles pagination

### Features

- ✅ Displays all articles from all blogs
- ✅ Pagination support (12 articles per page)
- ✅ Blog category navigation
- ✅ Error handling with fallbacks
- ✅ Empty state handling

---

## 📄 Page 2: Blog Category (Specific Blog)

**Route File:** `app/routes/($locale).blog.$blogHandle._index.tsx`  
**URL Pattern:** `/blog/{blogHandle}`  
**Purpose:** Displays articles from a specific blog category

### Route Details

- **File:** `($locale).blog.$blogHandle._index.tsx`
- **URL:** `/blog/{blogHandle}` (e.g., `/blog/news`)
- **Component:** `Blog()`
- **Special Feature:** Also handles article handles (fallback for route matching)

### GraphQL Queries

#### 1. BLOGS_QUERY
Same as Page 1 - fetches all blogs for category navigation.

#### 2. BLOG_QUERY
Fetches a specific blog with its articles.

```graphql
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
        endCursor
        startCursor
      }
    }
  }
}
```

#### 3. Article Detection Query (Inline)
When blog not found, checks if handle is an article:

```graphql
query CheckArticle($blogHandle: String!, $articleHandle: String!) {
  blog(handle: $blogHandle) {
    articleByHandle(handle: $articleHandle) {
      handle
    }
  }
}
```

#### 4. Article Data Query (Inline)
If article detected, loads full article data:

```graphql
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
```

### Data Flow

1. **Loader** (`loader` function):
   - Calls `loadCriticalData()` with blog handle from params
   - Returns data with `isArticle` flag if article detected

2. **loadCriticalData()**:
   - Gets pagination variables (default: 12 items per page)
   - Fetches blog and all blogs in parallel
   - **If blog not found:**
     - Searches through all blogs to check if handle is an article
     - If article found, loads full article data and returns with `isArticle: true`
     - If not found, throws 404

3. **Component Rendering:**
   - If `isArticle: true` → Renders article view
   - Otherwise → Renders blog listing view

### Components Used

- `BlogCategories` - Category navigation
- `ArticleItem` - Individual article card (for blog listing)
- `ArticleContent` - Full article content (for article view)
- `PaginatedResourceSection` - Handles pagination

### Features

- ✅ Displays articles from specific blog
- ✅ Pagination support (12 articles per page)
- ✅ Blog category navigation
- ✅ Fallback: Handles article handles (route conflict resolution)
- ✅ Localized handle redirects

---

## 📄 Page 3: Article Page

**Route File:** `app/routes/($locale).blog.$articleHandle.tsx`  
**URL Pattern:** `/blog/{articleHandle}`  
**Purpose:** Displays a single article with full content

### Route Details

- **File:** `($locale).blog.$articleHandle.tsx`
- **URL:** `/blog/{articleHandle}` (e.g., `/blog/what-jewellery-metal-suits-my-skin-tone`)
- **Component:** `Article()`

### GraphQL Queries

#### 1. BLOGS_QUERY
Same as Page 1 - fetches all blogs for category navigation.

#### 2. BLOG_ARTICLE_QUERY
Searches for article by iterating through blogs (Shopify limitation).

```graphql
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
```

**Note:** Since Shopify doesn't have `articleByHandle` at root level, we iterate through all blogs to find the article.

### Data Flow

1. **Loader** (`loader` function):
   - Calls `loadCriticalData()` with article handle from params
   - Returns: `{ article, blog, blogs }`

2. **loadCriticalData()**:
   - Fetches all blogs first
   - **Searches through each blog** to find article by handle
   - If found, returns article data with parent blog info
   - If not found, throws 404

3. **Component Rendering:**
   - Displays blog title as heading
   - Shows blog categories
   - Renders full article content

### Components Used

- `BlogCategories` - Category navigation
- `ArticleContent` - Full article content

### Features

- ✅ Displays full article content
- ✅ Blog category navigation
- ✅ Author and publish date
- ✅ Article image
- ✅ SEO metadata
- ⚠️ **Performance Note:** Searches through all blogs (up to 250) to find article

---

## 🧩 Shared Components

### 1. BlogCategories

**File:** `app/components/Blog/BlogCategories.tsx`

**Purpose:** Displays navigation for all blog categories

**Props:**
```typescript
interface BlogCategoriesProps {
  blogs: BlogsQuery['blogs'];
  selectedBlogHandle?: string | null;
}
```

**Features:**
- "All Articles" link to `/blog`
- Individual blog category links to `/blog/{blogHandle}`
- Active state highlighting
- Prefetch on intent

**Usage:**
```tsx
<BlogCategories
  blogs={blogs}
  selectedBlogHandle={blog.handle}
/>
```

---

### 2. ArticleItem

**File:** `app/components/Blog/ArticleItem.tsx`

**Purpose:** Displays article card in listing pages

**Props:**
```typescript
{
  article: ArticleItemFragment;
  loading?: HTMLImageElement['loading'];
}
```

**Features:**
- Article image with lazy loading
- Article title
- Published date (en-GB format)
- Link to `/blog/{article.handle}`

**Usage:**
```tsx
<ArticleItem
  article={article}
  loading={index < 4 ? 'eager' : 'lazy'}
/>
```

---

### 3. ArticleContent

**File:** `app/components/Blog/ArticleContent.tsx`

**Purpose:** Displays full article content

**Props:**
```typescript
interface ArticleContentProps {
  article: ArticleItemFragment & {
    contentHtml: string;
    publishedAt: string;
  };
}
```

**Features:**
- Article title
- Published date and author
- Article image
- Full HTML content (from `contentHtml`)

**Usage:**
```tsx
<ArticleContent article={article} />
```

---

### 4. PaginatedResourceSection

**File:** `app/components/PaginatedResourceSection.tsx`

**Purpose:** Handles pagination for article lists

**Features:**
- Automatic pagination controls
- Cursor-based pagination
- Works with Shopify's connection pattern

---

## 🔗 URL Structure

### Routes Summary

| Route | URL Pattern | Purpose |
|-------|-------------|---------|
| `($locale).blog._index.tsx` | `/blog` | All articles listing |
| `($locale).blog.$blogHandle._index.tsx` | `/blog/{blogHandle}` | Blog category listing |
| `($locale).blog.$articleHandle.tsx` | `/blog/{articleHandle}` | Individual article |

### URL Examples

- All Articles: `/blog`
- Blog Category: `/blog/news`
- Article: `/blog/what-jewellery-metal-suits-my-skin-tone`

### Route Matching Order

⚠️ **Important:** React Router matches routes in this order:
1. `$blogHandle._index` (matches first)
2. `$articleHandle` (matches if blog route doesn't find blog)

**Solution:** The `$blogHandle` route checks if handle is an article and handles it accordingly.

---

## 📊 Data Flow Diagram

```
User Request
    │
    ├─ /blog
    │   └─> blog._index.tsx
    │       ├─> Fetch all blogs
    │       ├─> Fetch all articles (search API)
    │       └─> Render: BlogCategories + ArticleItem list
    │
    ├─ /blog/{blogHandle}
    │   └─> blog.$blogHandle._index.tsx
    │       ├─> Try to fetch blog
    │       ├─> If not found: Check if article
    │       │   ├─> If article: Load article data → Render ArticleContent
    │       │   └─> If not: 404
    │       └─> If blog found: Render ArticleItem list
    │
    └─ /blog/{articleHandle}
        └─> blog.$articleHandle.tsx
            ├─> Fetch all blogs
            ├─> Search through blogs for article
            └─> Render: BlogCategories + ArticleContent
```

---

## 🔍 GraphQL Queries Summary

### Shared Fragment

**ARTICLE_ITEM_FRAGMENT:**
```graphql
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
```

### Query Types

1. **BLOGS_QUERY** - Fetches all blogs (used on all pages)
2. **ALL_ARTICLES_QUERY** - Fetches all articles via search API (Page 1)
3. **BLOG_QUERY** - Fetches specific blog with articles (Page 2)
4. **BLOG_ARTICLE_QUERY** - Fetches article from specific blog (Page 3)

---

## ⚙️ Constants

```typescript
const DEFAULT_PAGE_SIZE = 12;        // Articles per page
const MAX_BLOGS_LIMIT = 250;         // Shopify's max limit for blogs
```

---

## 🎨 Layout Structure

All three pages share the same layout structure:

```tsx
<section>
  <div className="container-fluid px-4 lg:px-10 my-6">
    <div className="blogs">
      <h1>Title</h1>
      <BlogCategories />
      {/* Content: ArticleItem list OR ArticleContent */}
    </div>
  </div>
</section>
```

---

## 🚨 Important Notes

### Shopify API Limitations

1. **No direct article lookup:** Shopify doesn't provide `articleByHandle` at root level
   - **Solution:** Search through all blogs to find article

2. **No "all articles" query:** Shopify doesn't have a direct query for all articles
   - **Solution:** Use search API with `query: "*"` and `types: [ARTICLE]`

### Performance Considerations

1. **Article lookup:** Page 3 searches through up to 250 blogs to find an article
   - Consider caching article-to-blog mappings for better performance

2. **Search API:** Page 1 uses search API which may be slower than direct queries
   - Limited to 250 results per query

### Route Conflict Resolution

The `$blogHandle` route handles article handles as a fallback because React Router matches it first. This ensures articles are accessible even when the route pattern matches a blog handle.

---

## 📝 TypeScript Types

### Key Types

- `ArticleItemFragment` - From `storefrontapi.generated`
- `BlogsQuery` - From `storefrontapi.generated`
- `Route.LoaderArgs` - React Router type
- `Route.MetaFunction` - React Router meta function type

---

## 🔧 Error Handling

All pages include comprehensive error handling:

1. **Try-catch blocks** in loaders
2. **Fallback functions** for failed queries
3. **Empty state handling** (EMPTY_CONNECTION)
4. **404 responses** for not found resources
5. **Console error logging** for debugging

---

## 📚 Related Files

### Routes
- `app/routes/($locale).blog._index.tsx`
- `app/routes/($locale).blog.$blogHandle._index.tsx`
- `app/routes/($locale).blog.$articleHandle.tsx`

### Components
- `app/components/Blog/BlogCategories.tsx`
- `app/components/Blog/ArticleItem.tsx`
- `app/components/Blog/ArticleContent.tsx`
- `app/components/PaginatedResourceSection.tsx`

### Utilities
- `app/lib/redirect.ts` - Handle localization redirects

---

## 🎯 Summary

The blog system provides a complete solution for displaying blogs and articles from Shopify:

- ✅ **Page 1:** All articles from all blogs
- ✅ **Page 2:** Articles from specific blog (with article fallback)
- ✅ **Page 3:** Individual article view
- ✅ **Shared navigation:** Blog categories on all pages
- ✅ **Pagination:** Cursor-based pagination
- ✅ **Error handling:** Comprehensive error handling
- ✅ **SEO:** Meta tags and structured data
- ✅ **Performance:** Optimized queries and lazy loading

All pages work together seamlessly with consistent UI/UX and shared components.
