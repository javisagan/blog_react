const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const generateSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      select: {
        slug: true,
        title: true,
        summary: true,
        imageUrl: true,
        author: true,
        publishedAt: true,
        tags: true,
      },
      orderBy: { publishedAt: 'desc' },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    res.status(500).json({ message: 'Error interno del servidor al obtener posts.' });
  }
};

exports.getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(`Error al obtener el post ${req.params.slug}:`, error);
    res.status(500).json({ message: 'Error interno del servidor al obtener un post.' });
  }
};

// --- FUNCIÓN CON DEPURACIÓN ---
exports.createPost = async (req, res) => {
  // --- PASOS DE DEPURACIÓN AÑADIDOS ---
  console.log('--- INTENTANDO CREAR POST ---');
  console.log('Datos recibidos en el body:', req.body);
  // ------------------------------------

  try {
    const { title, summary, content, author, metaTitle, metaDescription, ...rest } = req.body;

    if (!title || !summary || !content || !author || !metaTitle || !metaDescription) {
        console.error('Faltan campos obligatorios:', req.body);
        return res.status(400).json({ message: 'Faltan campos obligatorios. Revisa título, resumen, contenido, autor y metas.' });
    }

    let slug = generateSlug(title);
    const existingPost = await prisma.post.findUnique({ where: { slug } });
    if (existingPost) {
      slug = `${slug}-${Date.now()}`;
    }

    const newPostData = {
      title,
      slug,
      summary,
      content,
      author,
      metaTitle,
      metaDescription,
      subtitle: rest.subtitle || null,
      imageUrl: rest.imageUrl || '',
      tags: rest.tags || [],
    };

    const newPost = await prisma.post.create({
      data: newPostData,
    });

    console.log('--- POST CREADO CON ÉXITO ---');
    res.status(201).json(newPost);

  } catch (error) {
    console.error('!!! ERROR AL CREAR EL POST !!!:', error);
    res.status(500).json({ message: 'Error interno del servidor al crear el post.' });
  }
};


exports.updatePost = async (req, res) => {
  try {
    const { slug } = req.params;
    const dataToUpdate = req.body;

    if (dataToUpdate.title && !dataToUpdate.slug) {
      dataToUpdate.slug = generateSlug(dataToUpdate.title);
    }

    const updatedPost = await prisma.post.update({
      where: { slug },
      data: dataToUpdate,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Post no encontrado para actualizar' });
    }
    console.error(`Error al actualizar el post ${req.params.slug}:`, error);
    res.status(500).json({ message: 'Error interno del servidor al actualizar.' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { slug } = req.params;
    await prisma.post.delete({ where: { slug } });
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Post no encontrado para eliminar' });
    }
    console.error(`Error al eliminar el post ${req.params.slug}:`, error);
    res.status(500).json({ message: 'Error interno del servidor al eliminar.' });
  }
};
