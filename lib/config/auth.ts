export const AUTH_CONFIG = {
  persistSession: true,
  autoRefreshToken: true,
  redirects: {
    login: '/admin/login',
    callback: '/admin',
    unauthorized: '/',
  },
  roles: {
    admin: 'admin',
    user: 'user',
  },
} as const;