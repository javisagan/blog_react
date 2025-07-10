const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Esta función ahora pasará las opciones de caché a fetch
async function fetchAPI(endpoint, options = {}) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...options, // Pasa todas las opciones, incluyendo la de caché
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    try {
      const errorBody = await response.json();
      throw new Error(errorBody.message || 'Error en la petición a la API');
    } catch (e) {
      throw new Error(`Error en la petición a la API: ${response.statusText}`);
    }
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// --- Funciones públicas ---

// ¡AQUÍ ESTÁ EL CAMBIO! Añadimos { cache: 'no-store' } para evitar la caché.
export const getPosts = () => fetchAPI('/posts', { cache: 'no-store' });
export const getPostBySlug = (slug) => fetchAPI(`/posts/${slug}`, { cache: 'no-store' });

// --- Funciones de Admin ---
export const createPost = (data) => fetchAPI('/posts', {
  method: 'POST',
  body: JSON.stringify(data),
});

export const updatePost = (slug, data) => fetchAPI(`/posts/${slug}`, {
  method: 'PUT',
  body: JSON.stringify(data),
});

export const deletePost = (slug) => fetchAPI(`/posts/${slug}`, {
  method: 'DELETE',
});
