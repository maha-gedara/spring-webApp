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

export const createQuiz = async (formData) => {
  const response = await fetch(`${API_URL}/quizzes`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to create quiz');
  }
  return response.json();
};

export const getQuizzes = async () => {
  const response = await fetch(`${API_URL}/quizzes`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch quizzes');
  }
  return response.json();
};

export const getQuizById = async (id) => {
  const response = await fetch(`${API_URL}/quizzes/${id}`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch quiz');
  }
  return response.json();
};

export const getUserQuizzes = async () => {
  const response = await fetch(`${API_URL}/quizzes/user`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user quizzes');
  }
  return response.json();
};

export const updateQuiz = async (id, formData) => {
  const response = await fetch(`${API_URL}/quizzes/${id}`, {
    method: 'PUT',
    body: formData,
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to update quiz');
  }
  return response.json();
};

export const deleteQuiz = async (id) => {
  const response = await fetch(`${API_URL}/quizzes/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to delete quiz');
  }
  return response.json();
};

export const createAd = async (formData) => {
  const response = await fetch(`${API_URL}/marketplace`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to create ad');
  }
  return response.json();
};

export const getAds = async () => {
  const response = await fetch(`${API_URL}/marketplace`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch ads');
  }
  return response.json();
};

export const getAdById = async (id) => {
  const response = await fetch(`${API_URL}/marketplace/${id}`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch ad');
  }
  return response.json();
};

export const getUserAds = async () => {
  const response = await fetch(`${API_URL}/marketplace/user`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user ads');
  }
  return response.json();
};

export const updateAd = async (id, formData) => {
  const response = await fetch(`${API_URL}/marketplace/${id}`, {
    method: 'PUT',
    body: formData,
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to update ad');
  }
  return response.json();
};

export const deleteAd = async (id) => {
  const response = await fetch(`${API_URL}/marketplace/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to delete ad');
  }
  return response.json();
};
