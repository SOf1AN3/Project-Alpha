import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import '../styles/dashboard.css'


const Dashboard = () => {
   return (
      <div className='background'>
         <div className='background-overlay dashboard-backround'></div>
         <div className='background-pos'>
            <div className='messagrie'>
               <div className='messages-display'></div>
               <form action="">
                  <input type="text" name="message" className='message-input' />
                  <button type="submit">Send</button>
               </form>
            </div>
         </div>
         <Sidebar />
      </div>
   )
}

export default Dashboard