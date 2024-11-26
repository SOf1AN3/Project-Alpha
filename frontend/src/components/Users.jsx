import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/userProfiles.css';

const Users = () => {
   const { user } = useAuth();
   const navigate = useNavigate();
   const [users, setUsers] = useState([]);
   const [selectedUser, setSelectedUser] = useState(null);

   useEffect(() => {
      loadUsers();
   }, [user]);

   const loadUsers = async () => {
      try {
         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
         const response = await fetch('http://localhost:5000/auth/users', {
            headers: {
               'Authorization': `Bearer ${token}`
            }
         });

         if (response.ok) {
            const data = await response.json();
            const filteredUsers = user.type === 'admin'
               ? data.users
               : data.users.filter(u => u.type === 'admin');
            setUsers(filteredUsers);
         }
      } catch (error) {
         console.error('Error loading users:', error);
      }
   };

   const renderUserProfile = () => {
      if (!selectedUser) return null;

      return (
         <div className="user-profile-card">
            <div className="user-profile-header">
               <div className="user-avatar">
                  {selectedUser.name.charAt(0).toUpperCase()}
               </div>
               <div className="user-header-info">
                  <h2>{selectedUser.name}</h2>
                  <p>{selectedUser.type === 'admin' ? 'Administrator' : 'User'}</p>
               </div>
            </div>
            <div className="user-profile-content">
               <p><strong>Email:</strong> {selectedUser.email}</p>
               {selectedUser.phone && (
                  <p><strong>Phone:</strong> {selectedUser.phone}</p>
               )}
            </div>
            <div className="user-profile-footer">
               <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedUser(null)}
               >
                  Back to Users
               </button>
               {user.type === 'admin' && (
                  <button className="btn btn-danger">
                     Manage User
                  </button>
               )}
            </div>
         </div>
      );
   };

   return (
      <div className="users-container">
         <div className="users-list">
            <div className="users-header">
               <h3>Users</h3>
               <button
                  className="home-button"
                  onClick={() => navigate('/')}
               >
                  Home
               </button>
            </div>
            {users.map((u) => (
               <div
                  key={u._id}
                  className={`user-item ${selectedUser?._id === u._id ? 'selected' : ''}`}
                  onClick={() => setSelectedUser(u)}
               >
                  <div className="user-item-avatar">
                     {u.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-item-info">
                     <p>{u.name}</p>
                     <p className="user-type">
                        {u.type === 'admin' ? 'Administrator' : 'User'}
                     </p>
                  </div>
               </div>
            ))}
         </div>

         <div className="profile-section">
            {selectedUser ? (
               renderUserProfile()
            ) : (
               <div className="no-user-selected">
                  Select a user to view their profile
               </div>
            )}
         </div>
      </div>
   );
};

export default Users;