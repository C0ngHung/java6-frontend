const DEFAULT_API_BASE_URL = 'http://localhost:8686/api/v1';
const ENV_VAR_API_BASE_URL = 'VITE_API_BASE_URL';

export const API_BASE_URL: string =
  import.meta.env[ENV_VAR_API_BASE_URL] || DEFAULT_API_BASE_URL;
