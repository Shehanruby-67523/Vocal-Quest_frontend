import apiClient from './apiClient';

export const authService = {
  async register(name, email, password) {
    const data = await apiClient.post('/auth/register', { name, email, password });
    if (data.token) {
      localStorage.setItem('vocal_quest_token', data.token);
      localStorage.setItem('vocal_quest_user', JSON.stringify(data.user || data.data?.user));
    }
    return data;
  },

  async login(email, password) {
    const data = await apiClient.post('/auth/login', { email, password });
    if (data.token) {
      localStorage.setItem('vocal_quest_token', data.token);
      localStorage.setItem('vocal_quest_user', JSON.stringify(data.user || data.data?.user));
    }
    return data;
  },

  async getCurrentUser() {
    const data = await apiClient.get('/auth/me');
    const user = data.user || data.data?.user;
    if (user) {
      localStorage.setItem('vocal_quest_user', JSON.stringify(user));
    }
    return user;
  },

  async forgotPassword(email) {
    return await apiClient.post('/auth/forgot-password', { email });
  },

  async resetPassword(token, password) {
    return await apiClient.post('/auth/reset-password', { token, password });
  },

  async logout() {
    try {
      await apiClient.post('/auth/logout', {});
    } catch (e) {
      console.warn('Logout endpoint call failed:', e.message);
    } finally {
      localStorage.removeItem('vocal_quest_token');
      localStorage.removeItem('vocal_quest_user');
    }
  },

  getUser() {
    const stored = localStorage.getItem('vocal_quest_user');
    return stored ? JSON.parse(stored) : null;
  },

  getToken() {
    return localStorage.getItem('vocal_quest_token');
  }
};

export default authService;
