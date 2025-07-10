'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, updatePost } from '@/lib/api';

export default function PostForm({ initialData }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    subtitle: initialData?.subtitle || '',
    summary: initialData?.summary || '',
    content: initialData?.content || '',
    imageUrl: initialData?.imageUrl || '',
    author: initialData?.author || '',
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || '',
    tags: initialData?.tags?.join(', ') || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const postData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };

    try {
      if (initialData) {
        // Estamos editando un post existente
        await updatePost(initialData.slug, postData);
      } else {
        // Estamos creando un nuevo post
        await createPost(postData);
      }
      // Redirigir al dashboard y refrescar para ver los cambios
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Ocurrió un error al guardar el post.');
      setIsLoading(false);
    }
  };

  const formFields = [
    { name: 'title', label: 'Título Principal', required: true },
    { name: 'subtitle', label: 'Subtítulo (opcional)' },
    { name: 'author', label: 'Autor', required: true },
    { name: 'imageUrl', label: 'URL de la Imagen Destacada' },
    { name: 'summary', label: 'Resumen', type: 'textarea', required: true },
    { name: 'content', label: 'Contenido (Markdown)', type: 'textarea', required: true, rows: 15 },
    { name: 'tags', label: 'Etiquetas (separadas por comas)' },
    { name: 'metaTitle', label: 'Meta Título (SEO)', required: true },
    { name: 'metaDescription', label: 'Meta Descripción (SEO)', type: 'textarea', required: true },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
      {formFields.map(field => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
              rows={field.rows || 3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-gray-800 sm:text-sm"
            />
          ) : (
            <input
              type="text"
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-gray-800 sm:text-sm"
            />
          )}
        </div>
      ))}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 disabled:bg-gray-400"
        >
          {isLoading ? 'Guardando...' : (initialData ? 'Actualizar Post' : 'Publicar Post')}
        </button>
      </div>
    </form>
  );
}
