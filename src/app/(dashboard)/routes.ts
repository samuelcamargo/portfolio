export const DASHBOARD_ROUTES = {
  home: '/dashboard',
  login: '/login',
  logout: '/logout',
} as const;

export type DashboardRoute = keyof typeof DASHBOARD_ROUTES; 