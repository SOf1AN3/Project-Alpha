import React, { useState } from 'react';
import '../styles/services.css';

const Cards = () => {
     const [activeCard, setActiveCard] = useState(null);
     const [expandedCard, setExpandedCard] = useState(null);

     const services = [
          {
               title: "Consulting Stratégique",
               content: "Nous vous accompagnons dans l'élaboration de stratégies performantes pour développer votre entreprise et renforcer votre compétitivité. Nos experts vous conseillent sur la gestion, le développement commercial, et l'optimisation des processus."
          },
          {
               title: "Études de Marché",
               content: "Comprenez mieux votre marché et vos clients. Nous réalisons des analyses de marché approfondies, des études de concurrence et des enquêtes consommateurs pour vous permettre de prendre des décisions éclairées."
          },
          {
               title: "Formation Professionnelle",
               content: "Développez les compétences de vos équipes grâce à nos programmes de formation. Nous proposons des formations personnalisées en management, leadership, compétences digitales, et plus encore, pour les particuliers comme pour les entreprises."
          },
          {
               title: "Accompagnement Digital",
               content: "Nous vous aidons à intégrer le numérique dans vos processus grâce à notre expertise en transformation digitale. De l'audit digital à la mise en place de solutions adaptées (sites web, SEO, CRM, automatisation), nous vous guidons à chaque étape."
          }
     ];

     const handleCardClick = (index) => {
          if (expandedCard === null) {
               setActiveCard(activeCard === index ? null : index);
               setExpandedCard(index);
          }
     };

     const handleCloseClick = () => {
          setExpandedCard(null);
          setActiveCard(null);
     };

     return (
          <div className={`services-container ${expandedCard !== null ? 'expanded' : ''}`}>
               {services.map((service, index) => (
                    <div
                         key={index}
                         className={`service-card ${activeCard === index ? 'active' : ''} ${expandedCard === index ? 'expanded' : ''}`}
                         onClick={() => handleCardClick(index)}
                         style={{ backgroundColor: `hsl(270, 50%, ${20 + index * 10}%)` }}
                    >
                         <h2>{service.title}</h2>
                         <p className="service-content">{service.content}</p>
                    </div>
               ))}
               {expandedCard !== null && (
                    <button className="close-button" onClick={handleCloseClick}>
                         &times; Close
                    </button>
               )}
          </div>
     );
};

export default Cards;