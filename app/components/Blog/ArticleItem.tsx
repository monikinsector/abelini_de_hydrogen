import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import type {ArticleItemFragment} from 'storefrontapi.generated';

/**
 * Article Item Component
 * Displays individual article with image, title, and published date
 */
export function ArticleItem({
  article,
  loading,
}: {
  article: ArticleItemFragment;
  loading?: HTMLImageElement['loading'];
}) {
  const publishedAt = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt!));

  return (
    <div className="col-span-1 blog-article mb-6" key={article.id}>
      <Link to={`/blog/${article.blog.handle}/${article.handle}`}>
        {article.image && (
          <div className="blog-article-image mb-4">
            <Image
              alt={article.image.altText || article.title}
              aspectRatio="3/2"
              data={article.image}
              loading={loading}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        )}
        <h3>{article.title}</h3>
        <small>{publishedAt}</small>
      </Link>
    </div>
  );
}
