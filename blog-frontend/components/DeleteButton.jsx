'use client';

import { deletePost } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ slug }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // Usamos window.confirm para una confirmación simple
    if (window.confirm('¿Estás seguro de que quieres eliminar este post?')) {
      setIsDeleting(true);
      try {
        await deletePost(slug);
        // Refresca los datos de la página actual para que el post eliminado desaparezca
        router.refresh(); 
      } catch (error) {
        alert('Error al eliminar el post.');
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-900 disabled:text-gray-400"
    >
      {isDeleting ? 'Eliminando...' : 'Eliminar'}
    </button>
  );
}
