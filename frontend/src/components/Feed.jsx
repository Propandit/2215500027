import React, { useState, useEffect, useRef } from 'react';
import { fetchFeed } from '../services/api';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pollingIntervalRef = useRef(null);

  useEffect(() => {
    const getFeed = async () => {
      try {
        const data = await fetchFeed();
        setPosts(prevPosts => {
          // Merge new posts with existing ones, avoiding duplicates
          const existingPostIds = new Set(prevPosts.map(post => post.id));
          const newPosts = data.filter(post => !existingPostIds.has(post.id));
          return [...newPosts, ...prevPosts];
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        
        setError('Failed to load feed');
        setLoading(false);
      }
    };

    // Fetch immediately and then set up polling
    getFeed();

    // Set up polling for real-time updates
    pollingIntervalRef.current = setInterval(getFeed, 10000); // Poll every 10 seconds

    // Clean up interval on component unmount
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  

  if (loading && posts.length === 0) return <div className="flex justify-center p-8"><div className="text-xl">Loading feed...</div></div>;
  
  if (error && posts.length === 0) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <div className="py-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Latest Posts</h2>
      
      {loading && posts.length > 0 && (
        <div className="text-center text-blue-600 mb-4">Loading new posts...</div>
      )}
      
      <div className="grid gap-6 max-w-3xl mx-auto">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <img 
              src='https://media.istockphoto.com/id/944138400/photo/indian-young-man-in-london-expressing-positive-emotion.jpg?s=612x612&w=0&k=20&c=rvkgZh4qs3PAWU6I10ZdbADY8kiV6F2rezjy6RAWgAM='
                alt={post.username} 
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <span className="font-semibold block">{post.username}</span>
                <span className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</span>
              </div>
            </div>
            
            <p className="mb-4">{post.content}</p>
            
            {post.hasImage && (
              <img 
                // src={getRandomPostImage(post.id)} 
                src='https://media.istockphoto.com/id/944138400/photo/indian-young-man-in-london-expressing-positive-emotion.jpg?s=612x612&w=0&k=20&c=rvkgZh4qs3PAWU6I10ZdbADY8kiV6F2rezjy6RAWgAM='
                alt="Post content" 
                className="w-full rounded-lg mb-4"
              />
            )}
            
            <div className="flex text-gray-500 text-sm items-center">
              <span className="mr-4">
                <span className="mr-1">👍</span> {post.likeCount || 0}
              </span>
              <span>
                <span className="mr-1">💬</span> {post.commentCount || 0} comments
              </span>
            </div>
          </div>
        ))}
        
        {posts.length === 0 && !loading && (
          <div className="text-center p-8 bg-white rounded-lg shadow">
            <p className="text-gray-500">No posts in your feed yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;