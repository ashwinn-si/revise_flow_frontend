import axios, { AxiosInstance } from 'axios';

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

class ApiService {
  private api: AxiosInstance;
  private accessToken: string | null = null;
  private isRefreshing = false;
  private failedQueue: Array<{ resolve: Function; reject: Function }> = [];

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      withCredentials: true, // Important for httpOnly refresh token cookies
      timeout: 10000, // 10 second timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use((config) => {
      if (this.accessToken) {
        config.headers.Authorization = `Bearer ${this.accessToken}`;
      }
      return config;
    });

    // Response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If we get 401 and it's not already a retry
        if (error.response?.status === 401 && !originalRequest._retry) {
          // Skip refresh for auth endpoints
          if (originalRequest.url?.includes('/auth/')) {
            return Promise.reject(error);
          }

          if (this.isRefreshing) {
            // If already refreshing, queue the request
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return this.api(originalRequest);
            }).catch(err => {
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const response = await this.performTokenRefresh();
            
            if (response?.data?.accessToken) {
              this.setAuthToken(response.data.accessToken);
              this.processQueue(null, response.data.accessToken);
              originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
              return this.api(originalRequest);
            } else {
              this.handleAuthFailure();
              this.processQueue(new Error('Token refresh failed'), null);
              return Promise.reject(error);
            }
          } catch (refreshError) {
            this.handleAuthFailure();
            this.processQueue(refreshError instanceof Error ? refreshError : new Error('Token refresh failed'), null);
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  private processQueue(error: Error | null, token: string | null = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
    
    this.failedQueue = [];
  }

  private async performTokenRefresh() {
    try {
      // Use a direct axios call to avoid interceptors
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
        withCredentials: true,
        timeout: 10000
      });
      
      return response;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }

  private handleAuthFailure() {
    this.setAuthToken(null);
    
    // Emit custom event for auth failure
    window.dispatchEvent(new CustomEvent('auth-failure'));
  }

  setAuthToken(token: string | null) {
    this.accessToken = token;
  }

  // Generic HTTP methods
  async get(url: string, config = {}) {
    return this.api.get(url, config);
  }

  async post(url: string, data = {}, config = {}) {
    return this.api.post(url, data, config);
  }

  async put(url: string, data = {}, config = {}) {
    return this.api.put(url, data, config);
  }

  async patch(url: string, data = {}, config = {}) {
    return this.api.patch(url, data, config);
  }

  async delete(url: string, config = {}) {
    return this.api.delete(url, config);
  }
}

export const apiService = new ApiService();

// Typed API methods for specific endpoints
export const authAPI = {
  login: (email: string, password: string) =>
    apiService.post('/auth/login', { email, password }),
  
  signup: (email: string, password: string) =>
    apiService.post('/auth/signup', { email, password }),
  
  refresh: () =>
    apiService.post('/auth/refresh'),
  
  logout: () =>
    apiService.post('/auth/logout'),
  
  verifyOTP: (otp: string) =>
    apiService.post('/auth/verify-otp', { otp }),
  
  forgotPassword: (email: string) =>
    apiService.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, password: string) =>
    apiService.post('/auth/reset-password', { token, password }),
  
  verifyResetToken: (token: string) =>
    apiService.post('/auth/verify-reset-token', { token }),
  
  verifyEmail: (token: string) =>
    apiService.post('/auth/verify-email', { token }),
};

export const tasksAPI = {
  create: (task: { title: string; notes?: string; completedDate: string; revisions?: string[] }) =>
    apiService.post('/tasks', task),
  
  update: (taskId: string, task: { title?: string; notes?: string; completedDate?: string; revisions?: string[] }) =>
    apiService.put(`/tasks/${taskId}`, task),

  getTask: (taskId: string) =>
    apiService.get(`/tasks/${taskId}`),

  updateSchedule: (taskId: string, revisions: any[]) =>
    apiService.patch(`/tasks/${taskId}/schedule`, { revisions }),

  updateRevisionStatus: (taskId: string, revisionId: string, status: string) =>
    apiService.patch(`/tasks/${taskId}/revisions/${revisionId}/complete`, { status }),
};

export const calendarAPI = {
  getDay: (date: string) =>
    apiService.get(`/calendar?date=${date}`),
};

export const googleAPI = {
  startOAuth: () => {
    // Redirect to backend OAuth start endpoint
    window.location.href = `${API_BASE_URL}/google/oauth-start`;
  },
  
  createEvent: (eventData: any) =>
    apiService.post('/google/create-event', eventData),
};