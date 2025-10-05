// constants/Api.ts

// Konfiguracja URL-i API
const BASE_URL = 'http://localhost:3000'; // Zmień na właściwy adres twojego API

export const API_URLS = {
  logs: `${BASE_URL}/api/logs`,
  // Tutaj możesz dodać więcej endpoint-ów w przyszłości
  // users: `${BASE_URL}/api/users`,
  // auth: `${BASE_URL}/api/auth`,
} as const;

// Eksport typu dla TypeScript
export type ApiUrls = typeof API_URLS;