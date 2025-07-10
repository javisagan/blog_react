import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function PostCard({ post }) {
  return (
    <Link href={`/posts/${post.slug}`} className="block group">
      <article className="p-6 border border-gray-200 rounded-lg hover:shadow-md hover:border-gray-900 transition-all duration-300">
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <span>{post.author}</span>
          <span className="mx-2">&bull;</span>
          <time dateTime={post.publishedAt}>
            {format(new Date(post.publishedAt), "d MMM, yyyy", { locale: es })}
          </time>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 group-hover:text-black transition-colors duration-300">
          {post.title}
        </h2>
        <p className="mt-2 text-gray-600">{post.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
