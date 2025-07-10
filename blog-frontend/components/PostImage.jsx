'use client'; // ¡Esta línea es la clave! Convierte este archivo en un Componente de Cliente.

import { useState } from 'react';

export default function PostImage({ src, alt }) {
  const [imageError, setImageError] = useState(false);

  // Si la imagen da un error, esta función se ejecuta y oculta la imagen.
  const handleError = () => {
    setImageError(true);
  };

  // Si hay un error, no renderizamos nada.
  if (imageError) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-auto max-h-96 object-cover rounded-lg mb-8 shadow-lg"
      onError={handleError}
    />
  );
}