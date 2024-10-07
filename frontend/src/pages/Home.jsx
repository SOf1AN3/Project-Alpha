import React from 'react'
import Header from '../components/Header'


const Home = () => {
     return (
          <div className='background'>
               <div className='background-overlay'></div>
               <Header />
               <div className='background-pos'>
                    <h1 className='home-title'>More then just a solution</h1>
               </div>
          </div>
     )
}

export default Home