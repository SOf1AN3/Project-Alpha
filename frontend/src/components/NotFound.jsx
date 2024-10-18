import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Utilisez useNavigate à la place de useHistory
import servicesVideo from '../assets/expats-cmp.mp4';

const NotFound = () => {
     const videoRef = useRef(null);
     const [videoStatus, setVideoStatus] = useState('Not loaded');
     const navigate = useNavigate(); // Utilisez useNavigate pour la redirection

     useEffect(() => {
          if (videoRef.current) {
               const videoElement = videoRef.current;

               const updateVideoStatus = () => {
                    if (videoElement.paused) {
                         setVideoStatus('Paused');
                    } else if (videoElement.ended) {
                         setVideoStatus('Ended');
                    } else {
                         setVideoStatus('Playing');
                    }
               };

               videoElement.addEventListener('loadeddata', () => setVideoStatus('Loaded'));
               videoElement.addEventListener('playing', updateVideoStatus);
               videoElement.addEventListener('pause', updateVideoStatus);
               videoElement.addEventListener('ended', updateVideoStatus);

               videoElement.play().catch(error => {
                    console.error("Error attempting to play video:", error);
                    setVideoStatus('Error playing');
               });

               return () => {
                    videoElement.removeEventListener('loadeddata', () => setVideoStatus('Loaded'));
                    videoElement.removeEventListener('playing', updateVideoStatus);
                    videoElement.removeEventListener('pause', updateVideoStatus);
                    videoElement.removeEventListener('ended', updateVideoStatus);
               };
          }
     }, []);

     useEffect(() => {
          const timer = setTimeout(() => {
               navigate('/'); // Utilisez navigate pour rediriger
          }, 5000); // 5000 millisecondes = 5 secondes

          return () => clearTimeout(timer); // Nettoyer le timer si le composant est démonté
     }, [navigate]);

     return (
          <div className="services-wrapper">
               <video
                    ref={videoRef}
                    className="background-video-404"
                    autoPlay
                    loop
                    muted
                    playsInline
               >
                    <source src={servicesVideo} type="video/mp4" />
                    Your browser does not support the video tag.
               </video>
               {videoStatus !== 'Playing' && (
                    <div style={{ position: 'absolute', bottom: 0, left: 10, color: 'white', zIndex: -1 }}>
                         Video status: {videoStatus}
                    </div>
               )}
               <div className="not-found-message">
                    <h1>404 Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                    <a className='link' href="/"><p>Click here to go back to the homepage.</p></a>
               </div>
          </div>
     );
};

export default NotFound;