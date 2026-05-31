import { create } from 'zustand';

interface AuthState {
  token: string | null;
  user: { id: string; name: string; email?: string; role: string } | null;
  licenseId: string | null;
  setAuth: (token: string, user: any, licenseId?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  licenseId: localStorage.getItem('licenseId'),

  setAuth: (token, user, licenseId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    if (licenseId) localStorage.setItem('licenseId', licenseId);
    set({ token, user, licenseId: licenseId || null });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('licenseId');
    set({ token: null, user: null, licenseId: null });
  },
}));
