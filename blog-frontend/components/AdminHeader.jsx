'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    // Llama a la ruta de la API para eliminar la cookie de sesión
    await fetch('/api/logout', { method: 'POST' });
    // Redirige al login y refresca para asegurar que el middleware actúe
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/admin" className="text-xl font-bold text-gray-800">
              Admin Panel
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
}
