import apiClient from './apiClient';

export const adminService = {
  async getDashboard() {
    return await apiClient.get('/admin/dashboard');
  },

  async getStatistics() {
    return await apiClient.get('/admin/statistics');
  },

  async getUsers(page = 1, limit = 10, search = '') {
    return await apiClient.get(`/admin/users/list?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
  },

  async inviteUser(userData) {
    return await apiClient.post('/admin/users/invite', userData);
  },

  async toggleUserStatus(userId) {
    return await apiClient.patch(`/admin/users/${userId}/status`, {});
  },

  async changeUserRole(userId, role) {
    return await apiClient.patch(`/admin/users/${userId}/role`, { role });
  },

  async deleteUser(userId) {
    return await apiClient.delete(`/admin/users/${userId}`);
  },

  async getAuditLogs() {
    return await apiClient.get('/admin/security/logs');
  },

  async getStoryNodes() {
    return await apiClient.get('/admin/story-logic');
  },

  async createStoryNode(nodeData) {
    return await apiClient.post('/admin/story-logic', nodeData);
  },

  async updateStoryNode(nodeId, nodeData) {
    return await apiClient.put(`/admin/story-logic/${nodeId}`, nodeData);
  },

  async deleteStoryNode(nodeId) {
    return await apiClient.delete(`/admin/story-logic/${nodeId}`);
  }
};

export default adminService;
