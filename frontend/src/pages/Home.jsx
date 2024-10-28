import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/sidebar'


const Home = () => {
     return (
          <div className='background'>
               <div className='background-overlay'></div>
               <Header />
               <div className='background-pos'>
                    <h1 className='home-title no-select'>More than just a solution</h1>
               </div>
          </div>
     )
}

export default Home