import React from 'react'
import '../styles/contact.css'

const ContactForm = () => {
     return (
          <div className="contact-container">
               <div className='contact-form'>
                    <form action="" method="post" className='contact-form'>
                         <h1>Contact Us</h1>
                         <input type="text" name='name' className='text-input' placeholder='Full Name' />
                         <input type="email" name="email" className='text-input' placeholder="Email" />
                         <textarea name="message" className='text-input' placeholder='Message...'></textarea>
                         <button type="submit">Envoyer</button>
                    </form>
               </div>
          </div>
     )
}

export default ContactForm