import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';    
import './App.css'

import TopUsers from './components/TopUsers';
import TrendingPosts from './components/TrendingPosts';
import Feed from './components/Feed';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black-50 text-gray-800 font-sans">
        <nav className="bg-black-700 text-black px-6 py-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-semibold tracking-wide">Social Media Analytics</h1>
            <div className="flex flex-wrap gap-3">
              <Link to="/" className="px-4 py-2 rounded-md hover:bg-blue-800 transition duration-200">Top Users</Link>
              <Link to="/trending" className="px-4 py-2 rounded-md hover:bg-blue-800 transition duration-200">Trending Posts</Link>
              <Link to="/feed" className="px-4 py-2 rounded-md hover:bg-blue-800 transition duration-200">Feed</Link>
            </div>
          </div>
        </nav>
        
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<TopUsers />} />
            <Route path="/trending" element={<TrendingPosts />} />
            <Route path="/feed" element={<Feed />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
