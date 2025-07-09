const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Genera un slug a partir de un título.
 * Convierte a minúsculas, reemplaza espacios con guiones y elimina caracteres no alfanuméricos.
 * @param {string} title - El título a convertir.
 * @returns {string} El slug generado.
 */
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

/**
 * @desc    Obtiene una lista de todos los posts.
 * @route   GET /api/posts
 * @access  Public
 */
exports.getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      // Selecciona solo los campos necesarios para la vista de lista
      select: {
        slug: true,
        title: true,
        summary: true,
        imageUrl: true,
        author: true,
        publishedAt: true,
        tags: true,
      },
      orderBy: {
        publishedAt: 'desc', // Ordena los posts por fecha de publicación descendente
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

/**
 * @desc    Obtiene un único post por su slug.
 * @route   GET /api/posts/:slug
 * @access  Public
 */
exports.getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('Error al obtener el post:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

/**
 * @desc    Crea un nuevo post.
 * @route   POST /api/posts
 * @access  Protected
 */
exports.createPost = async (req, res) => {
  try {
    const { title, subtitle, summary, content, imageUrl, author, metaTitle, metaDescription, tags } = req.body;
    
    // Validar que los campos requeridos estén presentes
    if (!title || !summary || !content || !author || !metaTitle || !metaDescription) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    // Generar el slug a partir del título
    let slug = generateSlug(title);

    // Verificar si el slug ya existe y añadir un sufijo si es necesario
    const existingPost = await prisma.post.findUnique({ where: { slug } });
    if (existingPost) {
      slug = `${slug}-${Date.now()}`;
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        slug,
        subtitle,
        summary,
        content,
        imageUrl,
        author,
        metaTitle,
        metaDescription,
        tags,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error al crear el post:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

/**
 * @desc    Actualiza un post existente.
 * @route   PUT /api/posts/:slug
 * @access  Protected
 */
exports.updatePost = async (req, res) => {
  try {
    const { slug } = req.params;
    const dataToUpdate = req.body;

    // Si el título se actualiza, también se debe actualizar el slug
    if (dataToUpdate.title) {
      dataToUpdate.slug = generateSlug(dataToUpdate.title);
    }

    const updatedPost = await prisma.post.update({
      where: { slug },
      data: dataToUpdate,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    // Prisma lanza un error específico (P2025) si no encuentra el registro a actualizar
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Post no encontrado para actualizar' });
    }
    console.error('Error al actualizar el post:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

/**
 * @desc    Elimina un post.
 * @route   DELETE /api/posts/:slug
 * @access  Protected
 */
exports.deletePost = async (req, res) => {
  try {
    const { slug } = req.params;
    await prisma.post.delete({
      where: { slug },
    });
    res.status(204).send(); // 204 No Content es la respuesta estándar para eliminaciones exitosas
  } catch (error) {
    // Prisma lanza un error específico (P2025) si no encuentra el registro a eliminar
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Post no encontrado para eliminar' });
    }
    console.error('Error al eliminar el post:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};