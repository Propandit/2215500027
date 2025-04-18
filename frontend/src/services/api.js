// src/services/api.js
const API_BASE_URL = 'http://localhost:5000/api';

export const fetchTopUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/top`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching top users:', error);
    throw error;
  }
};

export const fetchTrendingPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/trending`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    throw error;
  }
};

export const fetchFeed = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/feed`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching feed:', error);
    throw error;
  }
};