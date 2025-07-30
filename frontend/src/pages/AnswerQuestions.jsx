import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AnswerQuestions.css';

const AnswerQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answerInputs, setAnswerInputs] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`/api/questions/all`, {
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
  }, [token]);

  const handleChange = (questionId, value) => {
    setAnswerInputs(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e, questionId) => {
    e.preventDefault();
    const answerText = answerInputs[questionId];
    if (!answerText || answerText.trim() === '') return;

    try {
      const res = await axios.patch(`/api/questions/${questionId}/answer`, { answerText }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setQuestions(questions.map(q => q._id === questionId ? res.data : q));
      setAnswerInputs(prev => ({ ...prev, [questionId]: '' }));
    } catch (error) {
      console.error('Failed to submit answer:', error.response?.data || error.message);
    }
  };

  return (
    <div className="page-container">
      <div className="answer-questions-container">
        <h1>🧑‍🏫 Answer Student Questions</h1>

        {loading ? (
          <p>Loading questions...</p>
        ) : questions.length === 0 ? (
          <p>No questions submitted yet.</p>
        ) : (
          <ul className="question-list">
            {questions.map(({ _id, questionText, studentName, answerText, createdAt }) => (
              <li key={_id} className="question-card">
                <p className="question"><strong>Q:</strong> {questionText}</p>
                <p className="meta">Asked by {studentName} on {new Date(createdAt).toLocaleString()}</p>

                {answerText ? (
                  <p className="answered"><strong>Answer:</strong> {answerText}</p>
                ) : (
                  <form onSubmit={(e) => handleSubmit(e, _id)} className="answer-form">
                    <textarea
                      value={answerInputs[_id] || ''}
                      onChange={(e) => handleChange(_id, e.target.value)}
                      placeholder="Write your answer..."
                      required
                    />
                    <button type="submit">Submit Answer</button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AnswerQuestions;

