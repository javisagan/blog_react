import PostCard from '@/components/PostCard';
import SearchBar from '@/components/SearchBar';
import { getPosts } from '@/lib/api';

async function HomePage() {
  const posts = await getPosts().catch(e => {
    console.error("Failed to fetch posts:", e);
    return []; // Devuelve un array vacío si la API falla
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900">Blog Minimalista</h1>
        <p className="text-gray-500 mt-2">Noticias, tutoriales y pensamientos.</p>
      </header>

      <main>
        <SearchBar initialPosts={posts} />
      </main>
    </div>
  );
}

export default HomePage;