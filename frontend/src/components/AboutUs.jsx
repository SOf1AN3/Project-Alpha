import React from 'react';
import '../styles/about.css';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
     const { t } = useTranslation();
     return (
          <div className="container-about">
               <h1 className='title'>About Us</h1>
               <h1>{t('about_title')}</h1>
               <p>{t('about_desc')}</p>

               <h1>{t('about_approach_title')}</h1>
               <ul className='about_approach_list'>
                    <li><p>{t('about_approach_list_1')}</p></li>
                    <li><p>{t('about_approach_list_2')}</p></li>
                    <li><p>{t('about_approach_list_3')}</p></li>
               </ul>
               <h1>{t('about_team_title')}</h1>
               <p>{t('about_team_desc')}</p>
          </div>
     );
}

export default AboutUs;