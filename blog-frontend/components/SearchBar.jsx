'use client';

import { useState } from 'react';
import PostCard from './PostCard';

export default function SearchBar({ initialPosts }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = initialPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar posts por título o resumen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
        />
      </div>

      <div className="grid gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))
        ) : (
          <p className="text-center text-gray-500">No se encontraron posts.</p>
        )}
      </div>
    </div>
  );
}
