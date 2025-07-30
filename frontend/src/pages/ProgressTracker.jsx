import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProgressTracker.css';

const ProgressTracker = () => {
  const [goalText, setGoalText] = useState('');
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const BACKEND_URL = process.env.REACT_APP_API_BASE;

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/progress`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGoals(res.data);
      } catch (error) {
        console.error('Failed to fetch goals:', error.response?.data || error.message);
        setGoals([]); // Reset to empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, [token, BACKEND_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goalText.trim()) return;

    try {
      const res = await axios.post(`${BACKEND_URL}/api/progress`, { goalText }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals([res.data, ...goals]);
      setGoalText('');
    } catch (error) {
      console.error('Failed to add goal:', error.response?.data || error.message);
    }
  };

  const markComplete = async (id) => {
    try {
      const res = await axios.put(`${BACKEND_URL}/api/progress/${id}/complete`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals(goals.map(goal => goal._id === id ? res.data : goal));
    } catch (error) {
      console.error('Failed to mark complete:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (!loading && goals.length > 0) {
      const completed = goals.filter(goal => goal.isCompleted).length;
      const percentage = (completed / goals.length) * 100;

      const fill = document.getElementById('progressFill');
      if (fill) {
        fill.style.width = '0%'; // Reset first
        setTimeout(() => {
          fill.style.transition = 'width 1.5s ease-out';
          fill.style.width = `${percentage}%`;
        }, 100); // Small delay for smooth reset
      }
    }
  }, [loading, goals]);

  return (
    <div className="page-container">
      <div className="progress-tracker-container">
        <h1>Progress Tracker</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your goal"
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            required
          />
          <button type="submit">Add Goal</button>
        </form>

        <hr />

        {loading ? (
          <p>Loading your progress...</p>
        ) : goals.length === 0 ? (
          <p>No goals yet. Start by adding one above.</p>
        ) : (
          <>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div className="progress-fill" id="progressFill"></div>
              </div>
              <p>
                {goals.filter(goal => goal.isCompleted).length} / {goals.length} Goals Completed
              </p>
            </div>

            <ul className="goals-list">
              {Array.isArray(goals) && goals.map(({ _id, goalText, isCompleted, createdAt, completedAt }) => (
                <li key={_id} className={`goal-item ${isCompleted ? 'completed' : ''}`}>
                  <p><strong>Goal:</strong> {goalText}</p>
                  <small>Created: {new Date(createdAt).toLocaleString()}</small>
                  {isCompleted ? (
                    <p><strong>Status:</strong> ✅ Completed on {new Date(completedAt).toLocaleString()}</p>
                  ) : (
                    <button onClick={() => markComplete(_id)}>Mark Complete</button>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;
