import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 1. Obtenemos la contraseña que el usuario envió desde el formulario
    const { password } = await request.json();

    // 2. Comparamos esa contraseña con la que tenemos en nuestras variables de entorno
    if (password === process.env.ADMIN_PASSWORD) {
      // 3. Si la contraseña es correcta, creamos una respuesta exitosa
      const response = NextResponse.json({ success: true });

      // 4. Añadimos una cookie a la respuesta para que el navegador la guarde.
      // Esta cookie es la que nos mantendrá logueados.
      response.cookies.set(process.env.AUTH_COOKIE_NAME, 'true', {
        httpOnly: true, // La cookie no se puede leer desde JavaScript en el navegador (más seguro)
        secure: process.env.NODE_ENV === 'production', // Solo se envía por HTTPS en producción
        maxAge: 60 * 60 * 24 * 7, // La cookie dura 1 semana
        path: '/', // La cookie es válida para todo el sitio
        sameSite: 'lax',
      });

      // 5. Devolvemos la respuesta con la cookie
      return response;
    }

    // Si la contraseña es incorrecta, devolvemos un error 401 (No autorizado)
    return NextResponse.json({ message: 'Contraseña incorrecta' }, { status: 401 });

  } catch (error) {
    // Si ocurre cualquier otro error, devolvemos un error 500
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}
