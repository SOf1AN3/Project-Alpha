import React from 'react'
import '../styles/admin.css'

const AdminPanel = () => {
     return (
          <div className="admin-container">
               <div className="sidebar">
                    <h2>Admin Panel</h2>
                    <ul>
                         <li>Gérer users</li>
                         <li>Gérer messages</li>
                         <li>Gérer codes</li>
                    </ul>
               </div>
               <div className="main-content">
                    <div className="header">
                         <h1>Messages VIP</h1>
                         <div>
                              <button className="generate-btn">A1E3 - 22SX</button>
                              <button className="generate-btn">Générer</button>
                              <button className="logout-btn">Se Déconnecter</button>
                         </div>
                    </div>
                    <table className="messages-table">
                         <thead>
                              <tr>
                                   <th>Nom</th>
                                   <th>Date</th>
                                   <th>Email</th>
                                   <th>Message</th>
                              </tr>
                         </thead>
                         <tbody>
                              <tr><td></td><td></td><td></td><td></td></tr>
                              <tr><td></td><td></td><td></td><td></td></tr>
                              <tr><td></td><td></td><td></td><td></td></tr>
                              <tr><td></td><td></td><td></td><td></td></tr>
                         </tbody>
                    </table>
               </div>
          </div>
     )
}

export default AdminPanel