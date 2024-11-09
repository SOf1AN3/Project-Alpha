import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../styles/contact.css';
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const templateParams = {
                name: formData.name,
                email: formData.email,
                message: formData.message
            };

            const response = await emailjs.send(
                'service_wp60jaa',
                'template_hb116m5',
                templateParams,
                '80ZdQFGwY-B-CNLEr'
            );

            if (response.status === 200) {
                setFormData({ name: '', email: '', message: '' });
                setIsLoading(false);
                setIsSubmitted(true);
                setTimeout(() => setIsSubmitted(false), 3000);
            } else {
                alert(`Erreur lors de l'envoi du message: ${response.text}`);
                setIsLoading(false);
            }
        } catch (error) {
            alert('Erreur lors de l\'envoi du message: ' + error.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="contact-container">
            <div className='contact-form'>
                <form onSubmit={handleSubmit} className=''>
                    <h1>{t('contact_form_title')}</h1>
                    <input
                        type="text"
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='text-input'
                        placeholder={t('contact_form_name_placeholder')}
                        disabled={isLoading}
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className='text-input'
                        placeholder={t('contact_form_email_placeholder')}
                        disabled={isLoading}
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className='text-input'
                        placeholder={t('contact_form_message_placeholder')}
                        disabled={isLoading}
                    ></textarea>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <div className="loading-spinner"></div>
                        ) : isSubmitted ? (
                            t('contact_form_button_sent')
                        ) : (
                            t('contact_form_button_send')
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;