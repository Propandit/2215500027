// services/DataService.js
const API_BASE_URL = 'http://20.244.56.144/evaluation-service';

// Add mock data as fallback
const MOCK_DATA = {
  users: {
    "1": "John Doe",
    "2": "Jane Doe",
    "3": "Alice Smith",
    "4": "Bob Johnson",
    "5": "Charlie Brown",
    "6": "Diana White",
    "7": "Edward Davis",
    "8": "Fiona Miller",
    "9": "George Wilson",
    "10": "Helen Moore",
    // Add more users as needed
  },
  posts: {
    "1": [
      { id: 246, userid: 1, content: "Post about ant" },
      { id: 161, userid: 1, content: "Post about elephant" },
      { id: 150, userid: 1, content: "Post about ocean" },
      { id: 370, userid: 1, content: "Post about monkey" },
      { id: 344, userid: 1, content: "Post about ocean" },
    ],
    // Add more posts as needed
  },
  comments: {
    "150": [
      { id: 1001, userid: 2, content: "Great post!" },
      { id: 1002, userid: 3, content: "I agree with this." },
    ],
    // Add more comments for different posts
  },
};

class DataService {
  // Fetch users with fallback to mock data
  static async getUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      console.log('Using mock data for users');
      return { users: MOCK_DATA.users };
    }
  }

  // Fetch posts for a specific user with fallback to mock data
  static async getPosts(userid) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userid}/posts`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching posts for user ${userid}:`, error);
      console.log(`Using mock data for user ${userid} posts`);
      return { posts: MOCK_DATA.posts[userid] || [] };
    }
  }

  // Fetch comments for a specific post with fallback to mock data
  static async getComments(postId) {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
      console.log(`Using mock data for post ${postId} comments`);
      return { comments: MOCK_DATA.comments[postId] || [] };
    }
  }
}

export default DataService;