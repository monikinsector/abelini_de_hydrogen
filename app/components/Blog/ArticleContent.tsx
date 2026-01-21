import {Image} from '@shopify/hydrogen';
import type {ArticleItemFragment} from 'storefrontapi.generated';

interface ArticleContentProps {
  article: ArticleItemFragment & {
    contentHtml: string;
    publishedAt: string;
  };
}

/**
 * Article Content Component
 * Displays the full article content with title, image, and body
 */
export function ArticleContent({article}: ArticleContentProps) {
  const {title, image, contentHtml, author, publishedAt} = article;

  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(publishedAt));

  return (
    <div className="article my-6">
      <h1>
        {title}
        <div>
          <time dateTime={publishedAt}>{publishedDate}</time> &middot;{' '}
          <address>{author?.name}</address>
        </div>
      </h1>

      {image && <Image data={image} sizes="90vw" loading="eager" />}
      <div
        dangerouslySetInnerHTML={{__html: contentHtml}}
        className="article"
      />
    </div>
  );
}
