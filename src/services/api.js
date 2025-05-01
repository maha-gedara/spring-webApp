import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add response interceptor to handle redirects
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 302) {
      // Handle redirect to login
      return Promise.reject(new Error('Unauthorized: Redirect to login'));
    }
    return Promise.reject(error);
  }
);

export const signup = async (user) => {
  const response = await api.post('/auth/signup', user);
  return response.data;
};

export const login = async ({ email, password }) => {
  const response = await api.post(
    '/auth/login',
    new URLSearchParams({ email, password }),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );
  return response.data;
};

export const logout = async () => {
  await api.get('/auth/logout');
};

export const createPost = async (formData) => {
  const response = await api.post('/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getAllPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

export const getPostById = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const getUserPosts = async () => {
  const response = await api.get('/posts/user');
  return response.data;
};

export const updatePost = async (id, formData) => {
  const response = await api.put(`/posts/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

export const toggleLike = async (id) => {
  const response = await api.post(`/posts/${id}/like`);
  return response.data;
};