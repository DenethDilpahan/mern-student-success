import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PostAnnouncement.css';

const PostAnnouncement = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const token = localStorage.getItem('token');

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get('/api/announcements', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnnouncements(res.data);
    } catch (error) {
      console.error('Failed to fetch announcements:', error.response?.data || error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      const res = await axios.post('/api/announcements', { title, content }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnnouncements([res.data, ...announcements]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Failed to post announcement:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="announcement-container">
      <h2>Post Announcement</h2>
      <form onSubmit={handleSubmit} className="announcement-form">
        <input
          type="text"
          placeholder="Announcement Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your announcement here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Post</button>
      </form>

      <h3>All Announcements</h3>
      <ul className="announcement-list">
        {announcements.map((ann) => (
          <li key={ann._id} className="announcement-item">
            <h4>{ann.title}</h4>
            <p>{ann.content}</p>
            <small>Posted on: {new Date(ann.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostAnnouncement;
