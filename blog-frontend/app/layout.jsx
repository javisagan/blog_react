import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Blog Minimalista',
  description: 'Un blog creado con Next.js y una API de Express.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-white text-gray-800`}>
        {children}
      </body>
    </html>
  );
}