export const CORE_ROLES = ["super_admin", "school_admin", "teacher", "parent", "student"] as const;

export type CoreRole = (typeof CORE_ROLES)[number];

export interface School {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  fullName: string | null;
  email: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  key: CoreRole;
  name: string;
  description: string | null;
}

export interface Permission {
  id: string;
  key: string;
  description: string | null;
}

export interface Membership {
  id: string;
  schoolId: string;
  userId: string;
  roleId: string;
  role: Role;
  school: School;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: string;
  email: string | null;
}

export interface AuthContext {
  user: AuthUser | null;
  profile: Profile | null;
  memberships: Membership[];
  activeMembership: Membership | null;
  isLoading: boolean;
  error: string | null;
}
