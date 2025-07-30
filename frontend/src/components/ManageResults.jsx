import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ManageResults.css';

const ManageResults = () => {
  const [results, setResults] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');
  const [term, setTerm] = useState('Term 1');
  const [year, setYear] = useState(new Date().getFullYear());

  const token = localStorage.getItem('token');

  const fetchResults = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/results', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResults(res.data.results);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to fetch results');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/results', {
        studentName,
        subject,
        marks,
        term,
        year
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Result added successfully');
      fetchResults();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to add result');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this result?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/results/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResults(results.filter(res => res._id !== id));
      alert('Result deleted successfully');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to delete result');
    }
  };


  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div>
      <h2>Manage Results</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Marks"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          required
        />
        <select value={term} onChange={(e) => setTerm(e.target.value)} required>
          <option value="Term 1">Term 1</option>
          <option value="Term 2">Term 2</option>
          <option value="Term 3">Term 3</option>
        </select>
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <div><button type="submit">Add Result</button></div>
      </form>

      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Subject</th>
            <th>Marks</th>
            <th>Term</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(results) && results.map((res) => (
            <tr key={res._id}>
              <td>{res.studentName || 'Unknown'}</td>
              <td>{res.subject}</td>
              <td>{res.marks}</td>
              <td>{res.term}</td>
              <td>{res.year}</td>
              <td><button onClick={() => handleDelete(res._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageResults;


