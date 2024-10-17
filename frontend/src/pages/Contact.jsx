import React from 'react'
import Header from '../components/Header'
import ContactForm from '../components/ContactForm'
import contactVideo from '../assets/expats-cmp.mp4'
import Footer from '../components/Footer'

const Contact = () => {
     return (
          <div style={{ position: 'relative', overflow: 'hidden', height: '100vh' }}>
               <video
                    autoPlay
                    loop
                    muted
                    style={{
                         position: 'absolute',
                         top: '50%',
                         left: '50%',
                         width: '100%',
                         height: '100%',
                         objectFit: 'cover',
                         transform: 'translate(-50%, -50%)',
                         zIndex: '-1',
                         opacity: '0.9'
                    }}
               >
                    <source src={contactVideo} type="video/mp4" />
                    Your browser does not support the video tag.
               </video>
               <Header />
               <ContactForm />
               <Footer />
          </div>
     )
}

export default Contact