import { getPostBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import Link from 'next/link';
import PostImage from '@/components/PostImage'; // 1. Importamos el nuevo componente

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug).catch(() => null);
  if (!post) {
    return {
      title: 'Post no encontrado'
    }
  }
  return {
    title: post.metaTitle,
    description: post.metaDescription,
  };
}

export default async function PostPage({ params }) {
  const { slug } = params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="mb-8 text-center">
        <Link href="/" className="text-gray-500 hover:text-gray-900 mb-6 inline-block">&larr; Volver a todos los posts</Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{post.title}</h1>
        {post.subtitle && <p className="mt-3 text-xl text-gray-500">{post.subtitle}</p>}
        <div className="mt-4 text-sm text-gray-400">
          <span>Por {post.author}</span>
          <span className="mx-2">&bull;</span>
          <time dateTime={post.publishedAt}>
            {format(new Date(post.publishedAt), "d 'de' MMMM 'de' yyyy", { locale: es })}
          </time>
        </div>
      </div>

      {/* 2. Reemplazamos la etiqueta <img> por nuestro nuevo componente */}
      {post.imageUrl && (
        <PostImage
          src={post.imageUrl}
          alt={`Imagen destacada para ${post.title}`}
        />
      )}

      <div className="prose prose-lg max-w-none prose-gray prose-a:text-blue-600 hover:prose-a:text-blue-800">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="mt-12">
        <h3 className="text-lg font-semibold text-gray-800">Etiquetas:</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}