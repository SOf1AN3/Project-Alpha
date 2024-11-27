// src/components/ProfileSettings.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import '../styles/ProfileSettings.css';

const ProfileSettings = () => {
   const { t } = useTranslation();
   const { user, getToken, updateUserInfo } = useAuth();
   const [emailForm, setEmailForm] = useState({ newEmail: '', password: '' });
   const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');

   const handleEmailChange = async (e) => {
      e.preventDefault();
      setError('');
      setSuccess('');

      if (!emailForm.newEmail || !emailForm.password) {
         setError(t('profile_settings_all_fields_required'));
         return;
      }

      try {
         const response = await fetch('http://localhost:5000/auth/change-email', {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(emailForm)
         });

         const data = await response.json();

         if (!response.ok) {
            throw new Error(data.error);
         }

         updateUserInfo({ email: emailForm.newEmail });
         setSuccess(t('profile_settings_email_updated'));
         setEmailForm({ newEmail: '', password: '' });
      } catch (error) {
         setError(error.message);
      }
   };

   const handlePasswordChange = async (e) => {
      e.preventDefault();
      setError('');
      setSuccess('');

      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
         setError(t('profile_settings_passwords_not_match'));
         return;
      }

      try {
         const response = await fetch('http://localhost:5000/auth/change-password', {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
               currentPassword: passwordForm.currentPassword,
               newPassword: passwordForm.newPassword
            })
         });

         const data = await response.json();

         if (!response.ok) {
            throw new Error(data.error);
         }

         setSuccess(t('profile_settings_password_updated'));
         setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } catch (error) {
         setError(error.message);
      }
   };

   return (
      <div>
         <button className='settings-home-btn'><a href="/home">Home</a></button>
         <div className="profile-settings">

            <h2>{t('profile_settings_title')}</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="settings-section">
               <h3>{t('profile_settings_change_email')}</h3>
               <form onSubmit={handleEmailChange}>
                  <input
                     type="email"
                     value={emailForm.newEmail}
                     onChange={(e) => setEmailForm({ ...emailForm, newEmail: e.target.value })}
                     placeholder={t('profile_settings_new_email')}
                  />
                  <input
                     type="password"
                     value={emailForm.password}
                     onChange={(e) => setEmailForm({ ...emailForm, password: e.target.value })}
                     placeholder={t('profile_settings_confirm_password')}
                  />
                  <button type="submit">{t('profile_settings_update_email')}</button>
               </form>
            </div>

            <div className="settings-section">
               <h3>{t('profile_settings_change_password')}</h3>
               <form onSubmit={handlePasswordChange}>
                  <input
                     type="password"
                     value={passwordForm.currentPassword}
                     onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                     placeholder={t('profile_settings_current_password')}
                  />
                  <input
                     type="password"
                     value={passwordForm.newPassword}
                     onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                     placeholder={t('profile_settings_new_password')}
                  />
                  <input
                     type="password"
                     value={passwordForm.confirmPassword}
                     onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                     placeholder={t('profile_settings_confirm_new_password')}
                  />
                  <button type="submit">{t('profile_settings_update_password')}</button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default ProfileSettings;