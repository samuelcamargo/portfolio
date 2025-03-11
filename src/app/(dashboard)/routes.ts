export const DASHBOARD_ROUTES = {
  home: '/dashboard',
  users: '/dashboard/users',
  userCreate: '/dashboard/users/create',
  userEdit: (id: string) => `/dashboard/users/edit/${id}`,
  profile: '/dashboard/profile',
  certificates: '/dashboard/certificates',
  certificateCreate: '/dashboard/certificates/create',
  certificateEdit: (id: string) => `/dashboard/certificates/edit/${id}`,
  login: '/login',
  logout: '/logout',
} as const;

export type DashboardRoute = keyof typeof DASHBOARD_ROUTES; 