import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', role: 'student', password: '' });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const API_BASE = process.env.REACT_APP_API_BASE;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/api/admin/users`, newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewUser({ username: '', email: '', role: 'student', password: '' });
      fetchUsers();
    } catch (error) {
      console.error('Failed to create user:', error.response?.data || error.message);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.patch(`${API_BASE}/api/admin/users/${userId}`, { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.error('Failed to update role:', error.response?.data || error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`${API_BASE}/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user:', error.response?.data || error.message);
    }
  };

  return (
    <div className="manage-users">
      <h2>Manage Users</h2>

      <form className="create-user-form" onSubmit={handleCreateUser}>
        <input type="text" name="username" placeholder="Username" value={newUser.username} onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} required />
        <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleInputChange} required />
        <select name="role" value={newUser.role} onChange={handleInputChange}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <div className="create-user-button"><button type="submit">Create User</button></div>
      </form>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <select value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;
