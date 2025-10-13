export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw err || new Error('API error');
  }
  return res.json();
}

export function getExperts() {
  return request('/experts');
}

export function getExpertHistory(expertId, token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return request(`/experts/${expertId}/history`, { headers });
}