const API_URL = 'http://localhost:8080/api';

export const signup = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ email, password }),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to sign up');
  }
  return response.json();
};

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ email, password }),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to log in');
  }
  return response.json();
};

export const createPost = async (formData) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  return response.json();
};

export const getPosts = async () => {
  const response = await fetch(`${API_URL}/posts`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

export const getPostById = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  return response.json();
};

export const getUserPosts = async () => {
  const response = await fetch(`${API_URL}/posts/user`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user posts');
  }
  return response.json();
};

export const updatePost = async (id, formData) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PUT',
    body: formData,
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to update post');
  }
  return response.json();
};

export const deletePost = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to delete post');
  }
  return response.json();
};

export const toggleLike = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}/like`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to toggle like');
  }
  return response.json();
};

export const createComment = async (formData) => {
  const response = await fetch(`${API_URL}/comments`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to create comment');
  }
  return response.json();
};

export const getCommentsByPostId = async (postId) => {
  const response = await fetch(`${API_URL}/comments/post/${postId}`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
};

export const updateComment = async (id, formData) => {
  const response = await fetch(`${API_URL}/comments/${id}`, {
    method: 'PUT',
    body: formData,
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to update comment');
  }
  return response.json();
};

export const deleteComment = async (id) => {
  const response = await fetch(`${API_URL}/comments/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to delete comment');
  }
  return response.json();
};