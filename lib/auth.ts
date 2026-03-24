import { AuthUser } from '@/types';

const ADMIN_USER = {
  id: 1,
  email: 'admin@admin.com',
  password: 'admin123',
  name: 'Administrateur',
  role: 'admin' as const,
};

const NORMAL_USER = {
  id: 2,
  email: 'user@user.com',
  password: 'user123',
  name: 'Utilisateur',
  role: 'user' as const,
};

export function authenticateUser(email: string, password: string): AuthUser | null {
  if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
    return {
      id: ADMIN_USER.id,
      email: ADMIN_USER.email,
      name: ADMIN_USER.name,
      role: ADMIN_USER.role,
    };
  }

  if (email === NORMAL_USER.email && password === NORMAL_USER.password) {
    return {
      id: NORMAL_USER.id,
      email: NORMAL_USER.email,
      name: NORMAL_USER.name,
      role: NORMAL_USER.role,
    };
  }

  return null;
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;

  const userStr = localStorage.getItem('user');
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function storeUser(user: AuthUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('user', JSON.stringify(user));
}

export function clearStoredUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('user');
}
