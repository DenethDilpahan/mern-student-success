import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/StudyPlanner.css';

const StudyPlanner = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', subject: '', date: '' });
  const token = localStorage.getItem('token');
  const BACKEND_URL = process.env.REACT_APP_API_BASE;

  // Load tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/tasks`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(res.data);
      } catch (err) {
        console.error('Failed to fetch tasks:', err.response?.data || err.message);
        setTasks([]); // Reset to empty array on error
      }
    };

    fetchTasks();
  }, [token, BACKEND_URL]);

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = async () => {
    const { title, subject, date } = newTask;
    if (!title || !subject || !date) return;

    try {
      const res = await axios.post(`${BACKEND_URL}/api/tasks`, newTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks([...tasks, res.data]);
      setNewTask({ title: '', subject: '', date: '' });
    } catch (err) {
      console.error('Failed to add task:', err.response?.data || err.message);
    }
  };

  const toggleDone = async (id) => {
    try {
      const res = await axios.patch(`${BACKEND_URL}/api/tasks/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error('Failed to toggle task:', err.response?.data || err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err.response?.data || err.message);
    }
  };

  return (
    <div className="page-container">
      <div className="planner-container">
        <h1>✏️Study Planner</h1>

        <div className="add-task">
          <input name="title" placeholder="Task Title" value={newTask.title} onChange={handleChange} />
          <input name="subject" placeholder="Subject" value={newTask.subject} onChange={handleChange} />
          <input type="date" name="date" value={newTask.date} onChange={handleChange} />
          <button onClick={handleAddTask}>Add Task</button>
        </div>

        <ul className="task-list">
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task._id} className={task.done ? 'done' : ''}>
                <div className="task-info">
                  <strong>{task.title}</strong> ({task.subject}) – {task.date}
                </div>
                <div className="task-buttons">
                  <button onClick={() => toggleDone(task._id)}>{task.done ? 'Undo' : 'Done'}</button>
                  <button onClick={() => deleteTask(task._id)}>Delete</button>
                </div>
              </li>
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default StudyPlanner;
