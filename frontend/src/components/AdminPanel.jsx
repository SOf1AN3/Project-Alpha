import React from 'react'
import '../styles/admin.css'

const AdminPanel = () => {
     return (
          <div className="admin-container">
               <div className="main-content">
                    <div className="header">
                         <h1>Admin Panel</h1>
                         <div className='admin-buttons'>
                              <button className="logout-btn">Se Déconnecter</button>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default AdminPanel