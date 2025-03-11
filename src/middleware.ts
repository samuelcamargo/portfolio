import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth_token')?.value;

  // Rotas que usam o layout do dashboard
  const isDashboardRoute = pathname.startsWith('/dashboard');
  
  // Rotas públicas que não precisam de autenticação
  const isPublicRoute = pathname === '/login';

  // Se tentar acessar uma rota do dashboard sem estar autenticado
  if (isDashboardRoute && !token) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('auth_token');
    return response;
  }

  // Se tentar acessar o login estando autenticado
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configuração das rotas que o middleware deve interceptar
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login'
  ]
}; 