import React, { useState, useEffect, lazy, Suspense } from 'react';
import '../styles/services.css';
import exitIcon from '../assets/exit.png';
import image1 from '../assets/1.jpg';
import image2 from '../assets/2.jpg';
import image3 from '../assets/3.jpg';
import image4 from '../assets/4.jpg';

const LazyImage = lazy(() => import('./LazyImage'));

const Cards = () => {
     const [expandedCard, setExpandedCard] = useState(null);
     const [showCards, setShowCards] = useState(false);

     useEffect(() => {
          const handleScroll = () => {
               if (window.scrollY > 1) {
                    setShowCards(true);
               } else {
                    setShowCards(false);
               }
          };

          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
     }, []);

     const services = [
          {
               title: "Consulting Stratégique",
               content: "Nous vous accompagnons dans l'élaboration de stratégies performantes pour développer votre entreprise et renforcer votre compétitivité. Nos experts vous conseillent sur la gestion, le développement commercial, et l'optimisation des processus.",
               image: image1
          },
          {
               title: "Études de Marché",
               content: "Comprenez mieux votre marché et vos clients. Nous réalisons des analyses de marché approfondies, des études de concurrence et des enquêtes consommateurs pour vous permettre de prendre des décisions éclairées.",
               image: image2
          },
          {
               title: "Formation Professionnelle",
               content: "Développez les compétences de vos équipes grâce à nos programmes de formation. Nous proposons des formations personnalisées en management, leadership, compétences digitales, et plus encore, pour les particuliers comme pour les entreprises.",
               image: image3
          },
          {
               title: "Accompagnement Digital",
               content: "Nous vous aidons à intégrer le numérique dans vos processus grâce à notre expertise en transformation digitale. De l'audit digital à la mise en place de solutions adaptées (sites web, SEO, CRM, automatisation), nous vous guidons à chaque étape.",
               image: image4
          }
     ];

     const handleCardClick = (index) => {
          if (expandedCard === null) {
               setExpandedCard(index);
          }
     };

     const handleCloseClick = (e) => {
          e.stopPropagation();
          setExpandedCard(null);
     };

     return (
          <div className="services-wrapper">
               <div className="services-title-container">
                    <h1 className="services-title no-select">Nos services de Consulting, Formation et Accompagnement Digital</h1>
               </div>
               <div className={`services-container ${showCards ? 'show' : ''}`}>
                    {services.map((service, index) => (
                         <div
                              key={index}
                              className={`no-select service-card ${expandedCard === index ? 'expanded' : ''}`}
                              onClick={() => handleCardClick(index)}
                              style={{ backgroundColor: `rgb(${index * 20}, ${index * 20}, ${index * 20})` }}
                         >
                              {expandedCard === index ? (
                                   <>
                                        <div className="card-image">
                                             <Suspense fallback={<div>Loading...</div>}>
                                                  <LazyImage src={service.image} alt={service.title} />
                                             </Suspense>
                                        </div>
                                        <div className="card-content">
                                             <h2>{service.title}</h2>
                                             <p className="service-content">{service.content}</p>
                                        </div>
                                        <button className="close-button" onClick={handleCloseClick}>
                                             <img src={exitIcon} alt="Close" />
                                        </button>
                                   </>
                              ) : (
                                   <>
                                        <h2>{service.title}</h2>
                                   </>
                              )}
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default Cards;