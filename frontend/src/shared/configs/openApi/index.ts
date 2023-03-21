import { OpenAPI } from '@/shared/openapi';
import { Router } from 'next/router';

export const useSetSettingsOpenApi = (router: Router) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    OpenAPI.BASE = process.env.NEXT_PUBLIC_HOST ?? '';
    const unprotectedRoutes = ['/login', '/register'];
    
    if (!token) {
      return;
    }
    OpenAPI.TOKEN = `Bearer ${token}`;

    if (token && unprotectedRoutes.indexOf(router.pathname) !== -1) {
      router.push('/app');
    }
  }
};
