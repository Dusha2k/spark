import { OpenAPI } from '@/shared/openapi';

export const useSetSettingsOpenApi = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    OpenAPI.TOKEN = token ? `Bearer ${JSON.parse(token)}` : undefined;
    OpenAPI.BASE = process.env.NEXT_PUBLIC_HOST ?? '';
  }
};
