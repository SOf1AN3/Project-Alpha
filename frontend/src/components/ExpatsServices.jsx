import React, { useState } from 'react';
import '../styles/expats.css'

const ExpatsServices = () => {
     const [activeIndex, setActiveIndex] = useState(null);

     const questions = [
          {
               question: "1. Conseil et Accompagnement Administratif",
               answer: `Naviguer dans les formalités administratives peut être une tâche ardue, surtout après une longue période d'absence. Nous vous assistons dans toutes vos démarches, y compris :

• La régularisation de votre situation administrative.
• Le renouvellement ou l'obtention de documents officiels (carte d'identité, passeport, permis de conduire, etc.).
• Les démarches pour la reconnaissance de vos diplômes et qualifications obtenus à l'étranger.`
          },
          {
               question: "2. Relocalisation et Logement",
               answer: `Trouver un logement adapté et bien situé est essentiel pour un retour réussi. Nos services incluent :

• La recherche de logements (location ou achat) correspondant à vos critères.
• La mise en relation avec des agences immobilières fiables et des propriétaires de confiance.
• L'accompagnement lors des visites de biens et la gestion des négociations.`
          },
          {
               question: "3. Intégration Scolaire et Éducative",
               answer: `Si vous revenez avec des enfants, leur intégration scolaire est une priorité. Nous vous aidons à :

• Identifier les écoles, collèges ou lycées les plus adaptés (publics, privés, internationaux).
• Gérer les inscriptions scolaires et les démarches administratives correspondantes.
• Trouver des solutions pour la continuité des études ou des programmes adaptés à leur niveau.`
          },
          {
               question: "4. Orientation Professionnelle et Création d'Entreprise",
               answer: `Votre retour au pays peut également être une opportunité pour relancer votre carrière ou entreprendre de nouveaux projets :

• Conseil en recherche d'emploi, mise en relation avec des recruteurs et accompagnement dans la rédaction de CV et de lettres de motivation adaptés au marché algérien.
• Accompagnement à la création d'entreprise : étude de marché, formalités de création, conseils juridiques et fiscaux.`
          },
          {
               question: "5. Assistance à la Réintégration Sociale",
               answer: `Se réadapter à la vie en Algérie après des années à l'étranger peut demander du temps. Nous proposons :

• Des sessions de coaching pour faciliter votre réintégration sociale et culturelle.
• L'organisation d'événements de networking pour vous aider à reconstruire votre réseau personnel et professionnel.
• Un service de conciergerie pour répondre à vos besoins quotidiens (déménagement, abonnement internet, ouverture de compte bancaire, etc.).`
          },
          {
               question: "Pourquoi Nous Choisir ?",
               answer: `• Expérience et Expertise : Une équipe d'experts connaissant parfaitement le contexte algérien et les besoins des expatriés.
• Service Personnalisé : Chaque retour est unique, c'est pourquoi nos solutions sont entièrement personnalisées selon votre situation.
• Assistance Complète : De la préparation avant votre départ à votre installation complète, nous sommes à vos côtés à chaque étape.`
          }
     ];

     const toggleQuestion = (index) => {
          setActiveIndex(activeIndex === index ? null : index);
     };

     const formatAnswer = (answer) => {
          return answer.split('\n').map((line, index) => (
               <React.Fragment key={index}>
                    {line}
                    <br />
               </React.Fragment>
          ));
     };

     return (
          <div className="container-qst">
               <h1 className='title'>Offre de Service pour les Expats Souhaitant Revenir en Algérie</h1>
               <h2>Bienvenue chez Tiberium Consulting
                    Vous êtes un expatrié algérien et vous envisagez de revenir vivre en Algérie ? Chez Tiberium Consulting, nous comprenons que le retour dans votre pays d'origine peut être une étape à la fois excitante et complexe. C'est pourquoi nous avons créé une offre de service dédiée pour vous accompagner tout au long de ce processus.
               </h2>
               <h1>Notre Mission</h1>
               <p>Faciliter votre retour en Algérie en vous offrant une assistance complète, personnalisée et adaptée à vos besoins, afin que votre transition se déroule en toute sérénité.</p>
               <h1>Nos Services</h1>
               <div className="question-list">
                    {questions.map((item, index) => (
                         <div key={index} className={`question ${activeIndex === index ? 'active' : ''}`}>
                              <div className="question-header" onClick={() => toggleQuestion(index)}>
                                   {item.question}
                              </div>
                              <div className="answer">
                                   {formatAnswer(item.answer)}
                              </div>
                         </div>
                    ))}
               </div>
               <h1 className='contactez-h1'>Contactez-nous</h1>
               <p>Prêt à faire le grand saut et revenir en Algérie ? <a className='contactez-nous' href='/contact'>Contactez-nous</a> dès aujourd'hui pour une consultation gratuite. Nous serons ravis de discuter de votre projet et de vous montrer comment nous pouvons vous aider à faire de ce retour une réussite.

                    Votre retour en Algérie est notre priorité. Chez Tiberium Consulting, nous faisons tout pour que vous vous sentiez à nouveau chez vous, dès le premier jour.
               </p>
          </div>
     );
};

export default ExpatsServices;