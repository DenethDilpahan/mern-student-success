import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AskTeacher.css';

const AskTeacher = () => {
  const [questionText, setQuestionText] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const API_BASE = process.env.REACT_APP_API_BASE;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/questions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setQuestions(res.data);
      } catch (error) {
        console.error('Failed to fetch questions:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [API_BASE, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    try {
      const res = await axios.post(`${API_BASE}/api/questions`, { questionText }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuestions([res.data, ...questions]);
      setQuestionText('');
    } catch (error) {
      console.error('Failed to submit question:', error.response?.data || error.message);
    }
  };

  return (
    <div className="page-container">
      <div className="ask-teacher-container">
        <h1>💬Ask a Teacher</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            rows="4"
            placeholder="Write your question here..."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
          <button type="submit">Submit Question</button>
        </form>

        <hr />

        {loading ? (
          <p>Loading your questions...</p>
        ) : questions.length === 0 ? (
          <p>You haven’t asked any questions yet.</p>
        ) : (
          <ul className="questions-list">
            {questions.map(({ _id, questionText, answerText, createdAt, answeredAt }) => (
              <li key={_id} className="question-item">
                <p><strong>Q:</strong> {questionText}</p>
                <small>Asked on: {new Date(createdAt).toLocaleString()}</small>

                {answerText ? (
                  <>
                    <p><strong>A:</strong> {answerText}</p>
                    <small>Answered on: {new Date(answeredAt).toLocaleString()}</small>
                  </>
                ) : (
                  <p><em>No answer yet</em></p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AskTeacher;
