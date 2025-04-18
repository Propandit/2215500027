import React, { useState, useEffect } from 'react';
import { fetchTopUsers } from '../services/api';
import { userProfileImages, getImageForId } from '../data/imagePaths';

const TopUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTopUsers = async () => {
      try {
        const data = await fetchTopUsers();
        setUsers(data.slice(0, 5));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching top users:', err);
        setError('Failed to load top users');
        setLoading(false);
      }
    };

    getTopUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="text-xl font-medium text-gray-600">Loading top users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-8 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="py-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Top Users</h2>
      
      <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
        {users.length === 0 ? (
          <div className="text-center p-4 text-gray-500">No users found</div>
        ) : (
          <div className="grid gap-6">
            {users.map((user, index) => (
              <div
                key={user.id || index}
                className="flex items-center p-4 border-b border-gray-200 last:border-0"
              >
                <div className="relative mr-4">
                  <span className="absolute -top-2 -left-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm shadow">
                    {index + 1}
                  </span>
                  <img
                    src={getImageForId(user.id || index, userProfileImages)}
                    alt={user.username}
                    className="w-16 h-16 rounded-full object-cover border border-gray-300"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">{user.username}</h3>
                  <p className="text-gray-600">
                    Total Posts:{' '}
                    <span className="font-semibold text-blue-700">
                      {user.postCount}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopUsers;