export type UserRole = 'super_admin' | 'admin' | 'trainer' | 'staff' | 'student';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  college_id?: string;
  college_name?: string;
  department?: string;
  phone?: string;
  join_date: string;
  status: 'active' | 'inactive' | 'pending';
  permissions: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role: UserRole;
  college_id?: string;
}

export interface College {
  id: string;
  name: string;
  address: string;
  contact_email: string;
  contact_phone: string;
  admin_id: string;
  status: 'active' | 'inactive';
  created_at: string;
  courses_count: number;
  students_count: number;
}