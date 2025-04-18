import React, { useState, useEffect } from 'react';
import { fetchTrendingPosts } from '../services/api';


const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingPosts = async () => {
      try {
        const data = await fetchTrendingPosts();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        
        setError('Failed to load trending posts');
        setLoading(false);
      }
    };

    getTrendingPosts();
  }, []);



  if (loading) return <div className="flex justify-center p-8"><div className="text-xl">Loading trending posts...</div></div>;
  
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <div className="py-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Trending Posts</h2>
      
      <div className="grid gap-8 max-w-4xl mx-auto">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
            src='https://media.istockphoto.com/id/944138400/photo/indian-young-man-in-london-expressing-positive-emotion.jpg?s=612x612&w=0&k=20&c=rvkgZh4qs3PAWU6I10ZdbADY8kiV6F2rezjy6RAWgAM='
              alt={`Post by ${post.username}`} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img 
                  src={`/api/placeholder/${40 + (post.userId % 10) * 5}/${40 + (post.userId % 10) * 5}`} 
                  alt={post.username} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="font-semibold">{post.username}</span>
              </div>
              <p className="text-gray-800 mb-4">{post.content}</p>
              <div className="flex justify-between text-gray-500 text-sm">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <div className="flex items-center">
                  <span className="mr-2">💬</span>
                  <span className="font-semibold">{post.commentCount} comments</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {posts.length === 0 && (
          <div className="text-center p-8 bg-white rounded-lg shadow">
            <p className="text-gray-500">No trending posts found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingPosts;