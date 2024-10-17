import { useRef, useState, useEffect } from 'react'
import Cards from '../components/Cards'
import Header from '../components/Header'
import servicesVideo from '../assets/expats-cmp.mp4'
import Footer from '../components/Footer'

const Services = () => {
     const videoRef = useRef(null);
     const [videoStatus, setVideoStatus] = useState('Not loaded');

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

     return (
          <div className="services-wrapper">
               <video
                    ref={videoRef}
                    className="background-video"
                    autoPlay
                    loop
                    muted
                    playsInline
               >
                    <source src={servicesVideo} type="video/mp4" />
                    Your browser does not support the video tag.
               </video>
               {videoStatus !== 'Playing' && (
                    <div style={{ position: 'absolute', bottom: 0, left: 10, color: 'white', zIndex: 1000 }}>
                         Video status: {videoStatus}
                    </div>
               )}
               <Header />
               <Cards />
          </div>
     )
}

export default Services