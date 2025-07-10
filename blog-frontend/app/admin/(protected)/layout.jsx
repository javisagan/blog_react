import AdminHeader from "@/components/AdminHeader";

export const metadata = {
  title: 'Panel de Administración',
  description: 'Gestiona los posts del blog.',
};

// Este es un layout anidado. No necesita <html> ni <body>.
// Simplemente envuelve el contenido de las páginas de admin.
export default function ProtectedAdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
