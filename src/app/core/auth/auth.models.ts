export interface AuthUser {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

export type AuthStatus = 'loading' | 'authenticated' | 'anonymous';