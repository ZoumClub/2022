export const ROUTES = {
  home: '/',
  admin: {
    root: '/admin',
    login: '/admin/login',
    dashboard: '/admin/dashboard',
  },
  sell: '/sell',
} as const;

export type AppRoute = typeof ROUTES;
export type AdminRoute = typeof ROUTES.admin;