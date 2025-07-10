const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

// Middleware de simulación de protección de ruta
const protectedRoute = (req, res, next) => {
  // Aquí iría la lógica de autenticación y autorización (ej. verificar un JWT)
  // Por ahora, simplemente llamamos a next() para continuar.
  console.log('Esta es una ruta protegida (simulación).');
  next();
};

// --- Definición de las rutas para los posts ---

// GET /api/posts - Obtener una lista de todos los posts
router.get('/posts', getPosts);

// GET /api/posts/:slug - Obtener un post específico por su slug
router.get('/posts/:slug', getPostBySlug);

// POST /api/posts - Crear un nuevo post (ruta protegida)
router.post('/posts', protectedRoute, createPost);

// PUT /api/posts/:slug - Actualizar un post existente (ruta protegida)
router.put('/posts/:slug', protectedRoute, updatePost);

// DELETE /api/posts/:slug - Eliminar un post (ruta protegida)
router.delete('/posts/:slug', protectedRoute, deletePost);

module.exports = router;