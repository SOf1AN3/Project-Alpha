import React, { useState } from 'react'
import '../styles/contact.css'

const ContactForm = () => {
     const [formData, setFormData] = useState({
          name: '',
          email: '',
          message: ''
     })

     const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value })
     }

     const handleSubmit = async (e) => {
          e.preventDefault()
          try {
               const response = await fetch('/api/message', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
               })

               const data = await response.json()

               if (response.ok) {
                    alert('Message envoyé avec succès !')
                    setFormData({ name: '', email: '', message: '' })
               } else {
                    alert(`Erreur lors de l'envoi du message: ${data.message || 'Erreur inconnue'}`)
               }
          } catch (error) {
               alert('Erreur lors de l\'envoi du message: ' + error.message)
          }
     }

     return (
          <div className="contact-container">
               <div className='contact-form'>
                    <form onSubmit={handleSubmit} className=''>
                         <h1>Contact Us</h1>
                         <input
                              type="text"
                              name='name'
                              value={formData.name}
                              onChange={handleChange}
                              className='text-input'
                              placeholder='Full Name'
                         />
                         <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className='text-input'
                              placeholder="Email"
                         />
                         <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              className='text-input'
                              placeholder='Message...'
                         ></textarea>
                         <button type="submit">Envoyer</button>
                    </form>
               </div>
          </div>
     )
}

export default ContactForm