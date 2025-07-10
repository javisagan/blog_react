import { getPosts } from '@/lib/api';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import DeleteButton from '@/components/DeleteButton';
import { PlusCircle } from 'lucide-react';

async function AdminDashboard() {
  const posts = await getPosts().catch(() => []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestionar Posts</h1>
        <Link href="/admin/new" className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">
          <PlusCircle size={20} />
          Crear Nuevo Post
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Autor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publicado</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.slug}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(post.publishedAt), "P", { locale: es })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                    <Link href={`/admin/edit/${post.slug}`} className="text-blue-600 hover:text-blue-900">Editar</Link>
                    <DeleteButton slug={post.slug} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;