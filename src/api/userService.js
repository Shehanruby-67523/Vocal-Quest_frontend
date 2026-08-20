import apiClient from './apiClient';

export const userService = {
  async getProfile() {
    return await apiClient.get('/users/profile');
  },

  async updateProfile(profileData) {
    return await apiClient.put('/users/profile', profileData);
  },

  async getStats() {
    return await apiClient.get('/users/stats');
  },

  async getVoicePrint() {
    return await apiClient.get('/voice-print/status');
  },

  async enrollVoicePrint(samplePhrase, accuracy = 90) {
    return await apiClient.post('/voice-print/enroll', { samplePhrase, accuracy, status: 'active' });
  },

  async verifyVoicePrint(samplePhrase) {
    return await apiClient.post('/voice-print/verify', { samplePhrase });
  },

  async deleteVoicePrint() {
    return await apiClient.delete('/voice-print');
  }
};

export default userService;
