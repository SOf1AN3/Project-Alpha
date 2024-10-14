import React from 'react'
import '../styles/about.css'

const AboutUs = () => {
     return (
          <div className="container-about">
               <h1 className='title'>About Us</h1>
               <h1>Votre partenaire en consulting et développement</h1>
               <p>“Depuis 2022, Tiberium Consulting accompagne les entreprises et les particuliers dans leur croissance en offrant des solutions de consulting, de formation et d’accompagnement digital. Notre équipe d’experts vous aide à relever les défis actuels du marché et à développer des stratégies gagnantes.”</p>

               <h1>Notre approche :</h1>
               <ul>
                    <li>Sur mesure : chaque client est unique, et nous adaptons nos services à vos besoins spécifiques.</li>
                    <li>Expertise sectorielle : nos consultants ont une solide expérience dans divers secteurs (industrie, technologie, services, etc.).</li>
                    <li>Résultats orientés : nous travaillons avec vous pour atteindre des objectifs concrets et mesurables.</li>
               </ul>
               <h1>Notre Equipe :</h1>
               <p>“Notre équipe est composée de consultants, d’experts en marché, et de formateurs ayant des années d’expérience. Passionnés par l’innovation et le développement, nous travaillons en étroite collaboration avec nos clients pour garantir des solutions efficaces et durables.”</p>
          </div>
     );
}

export default AboutUs