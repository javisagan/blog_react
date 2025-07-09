// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');

// Inicializar la aplicación Express
const app = express();

// --- Middlewares ---
// Habilitar CORS para permitir peticiones desde cualquier origen
app.use(cors());
// Parsear los cuerpos de las peticiones entrantes en formato JSON
app.use(express.json());

// --- Rutas ---
// Montar las rutas de los posts bajo el prefijo /api
app.use('/api', postRoutes);

// --- Manejo de rutas no encontradas ---
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// --- Manejo de errores global ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
});

// Definir el puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});