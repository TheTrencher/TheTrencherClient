import axios from 'axios';

// Base URL for our API calls, using the environment variable, with a fallback option.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://thetrencherserver.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --------------------
// API Methods
// --------------------

// Create a new user agent
export const createUserAgent = (username: string) => {
  return api.post('/users', { username });
};

// Retrieve the status of a user agent by its ID
export const getUserAgentStatus = (id: string) => {
  return api.get(`/users/${id}`);
};

// Update the risk profile for a specific user agent
export const updateRiskProfile = (id: string, riskProfile: { threshold: number }) => {
  return api.put(`/users/${id}/risk`, { riskProfile });
};

// Trigger a trade simulation
export const triggerTradeSimulation = () => {
  return api.post('/prototype/trigger');
};

// Retrieve logged simulation events
export const getEvents = () => {
  return api.get('/prototype/events');
};

// Global API error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error("Global API error handler:", error);
    return Promise.reject(error);
  }
);

export default api;
