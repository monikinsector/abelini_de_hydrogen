import {Link} from 'react-router';
import type {BlogsQuery} from 'storefrontapi.generated';

type BlogNode = BlogsQuery['blogs']['nodes'][0];

interface BlogCategoriesProps {
  blogs: BlogsQuery['blogs'];
  selectedBlogHandle?: string | null;
}

/**
 * Blog Categories Component
 * Displays all blog categories with an "All Articles" option
 */
export function BlogCategories({
  blogs,
  selectedBlogHandle,
}: Readonly<BlogCategoriesProps>) {
  return (
    <div className="flex flex-wrap justify-around items-center blogs-grid my-6">
      <Link
        className={`blog ${selectedBlogHandle ? '' : 'active'}`}
        prefetch="intent"
        to="/blog"
      >
        <h2>All Articles</h2>
      </Link>
      {/* Show all blogs without pagination to avoid conflicts with articles pagination */}
      {blogs.nodes.map((blog: BlogNode) => (
        <Link
          className={`blog ${selectedBlogHandle === blog.handle ? 'active' : ''}`}
          key={blog.handle}
          prefetch="intent"
          to={`/blog/${blog.handle}`}
        >
          <h2>{blog.title}</h2>
        </Link>
      ))}
    </div>
  );
}
