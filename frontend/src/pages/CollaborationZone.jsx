import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CollaborationZone.css';
import { Link } from 'react-router-dom';

const CollaborationZone = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/collaborations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(res.data);
      } catch (error) {
        console.error('Failed to fetch collaboration posts:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postText.trim()) return;

    try {
      const res = await axios.post('/api/collaborations', { postText }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts([res.data, ...posts]);
      setPostText('');
    } catch (error) {
      console.error('Failed to post:', error.response?.data || error.message);
    }
  };

  const handleConnect = async (postId) => {
    try {
      await axios.patch(`/api/collaborations/${postId}/connect`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Connected successfully!');
    } catch (error) {
      alert(error.response?.data.error || 'Failed to connect.');
    }
  };

  return (
    <div className="page-container">
      <div className="collaboration-zone-container">
        <Link className="link-to-mycollab" to="/my-collaborations">View My Collaborations</Link>
        <h1>Collaboration Zone</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            rows="4"
            placeholder="Start a discussion or ask for study help..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            required
          />
          <button type="submit">Post</button>
        </form>

        <hr />

        {loading ? (
          <p>Loading collaboration posts...</p>
        ) : posts.length === 0 ? (
          <p>No collaboration posts yet. Be the first to start!</p>
        ) : (
          <ul className="posts-list">
            {posts.map(({ _id, postText, createdAt, studentId, connections }) => (
              <li key={_id} className="post-item">
                <p><strong>{studentId?.name || 'User'}:</strong> {postText}</p>
                <small>Posted on: {new Date(createdAt).toLocaleString()}</small>
                <p>Connections: {connections.length}</p>
                <button type="connect" onClick={() => handleConnect(_id)}>Connect</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CollaborationZone;
