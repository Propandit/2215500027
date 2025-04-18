// App.js
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import TopUsers from './components/TopUsers';
import TrendingPosts from './components/TrendingPosts';
import Feed from './components/Feed';
import DataService from './services/DataService';

function App() {
  const [users, setUsers] = useState({});
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        // Fetch users
        const usersData = await DataService.getUsers();
        setUsers(usersData.users);
        
        // Fetch posts for all users
        const allPosts = [];
        const newComments = {};
        
        // Get posts for each user
        const userIds = Object.keys(usersData.users);
        for (const userId of userIds) {
          const userPosts = await DataService.getPosts(userId);
          if (userPosts && userPosts.posts) {
            allPosts.push(...userPosts.posts);
            
            // Fetch comments for each post
            for (const post of userPosts.posts) {
              const postComments = await DataService.getComments(post.id);
              if (postComments && postComments.comments) {
                newComments[post.id] = postComments.comments;
              }
            }
          }
        }
        
        setPosts(allPosts);
        setComments(newComments);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchInitialData();
    
    // Set up polling for real-time updates
    const pollInterval = setInterval(async () => {
      try {
        // Fetch only new posts and comments to minimize API calls
        const usersData = await DataService.getUsers();
        setUsers(usersData.users);
        
        // Get latest posts
        const latestPosts = [];
        const userIds = Object.keys(usersData.users);
        for (const userId of userIds) {
          const userPosts = await DataService.getPosts(userId);
          if (userPosts && userPosts.posts) {
            latestPosts.push(...userPosts.posts);
          }
        }
        
        // Update only if there are new posts
        if (latestPosts.length > posts.length) {
          setPosts(latestPosts);
          
          // Update comments for new posts
          const newComments = {...comments};
          for (const post of latestPosts) {
            if (!newComments[post.id]) {
              const postComments = await DataService.getComments(post.id);
              if (postComments && postComments.comments) {
                newComments[post.id] = postComments.comments;
              }
            }
          }
          setComments(newComments);
        } else {
          // Just update comments for existing posts
          const updatedComments = {...comments};
          for (const post of posts) {
            const postComments = await DataService.getComments(post.id);
            if (postComments && postComments.comments) {
              updatedComments[post.id] = postComments.comments;
            }
          }
          setComments(updatedComments);
        }
      } catch (err) {
        console.error('Error polling for updates:', err);
      }
    }, 10000); // Poll every 10 seconds
    
    return () => clearInterval(pollInterval);
  }, []);

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Social Media Analytics</h1>
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Feed</Link></li>
              <li><Link to="/top-users">Top Users</Link></li>
              <li><Link to="/trending">Trending Posts</Link></li>
            </ul>
          </nav>
        </header>
        
        <main>
          {loading ? (
            <div className="loading">Loading data...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <Routes>
              <Route 
                path="/top-users" 
                element={<TopUsers users={users} posts={posts} comments={comments} />} 
              />
              <Route 
                path="/trending" 
                element={<TrendingPosts posts={posts} users={users} comments={comments} />} 
              />
              <Route 
                path="/" 
                element={<Feed posts={posts} users={users} comments={comments} />} 
              />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;