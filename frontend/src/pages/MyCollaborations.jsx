import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CollaborationZone.css';

const MyCollaborations = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get('/api/collaborations/my-connections', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(res.data);
      } catch (error) {
        console.error('Failed to fetch collaborations:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchConnections();
  }, [token]);

  return (
    <div className="page-container">
      <div className="collaboration-zone-container">
        <h1>My Collaborations</h1>

        {loading ? (
          <p>Loading your collaborations...</p>
        ) : posts.length === 0 ? (
          <p>You have not connected to any posts yet.</p>
        ) : (
          <ul className="posts-list">
            {posts.map(({ _id, postText, createdAt, studentId }) => (
              <li key={_id} className="post-item">
                <p><strong>{studentId?.name || 'User'}:</strong> {postText}</p>
                <small>Posted on: {new Date(createdAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyCollaborations;
