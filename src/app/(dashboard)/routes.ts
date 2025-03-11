export const DASHBOARD_ROUTES = {
  home: '/dashboard',
  users: '/dashboard/users',
  userCreate: '/dashboard/users/create',
  userEdit: (id: string) => `/dashboard/users/edit/${id}`,
  profile: '/dashboard/profile',
  certificates: '/dashboard/certificates',
  certificateCreate: '/dashboard/certificates/create',
  certificateEdit: (id: string) => `/dashboard/certificates/edit/${id}`,
  education: '/dashboard/education',
  educationCreate: '/dashboard/education/create',
  educationEdit: (id: string) => `/dashboard/education/edit/${id}`,
  experiences: '/dashboard/experiences',
  experienceCreate: '/dashboard/experiences/create',
  experienceEdit: (id: string) => `/dashboard/experiences/edit/${id}`,
  skills: '/dashboard/skills',
  skillCreate: '/dashboard/skills/create',
  skillEdit: (id: string) => `/dashboard/skills/edit/${id}`,
  login: '/login',
  logout: '/logout',
} as const;

export type DashboardRoute = keyof typeof DASHBOARD_ROUTES; 