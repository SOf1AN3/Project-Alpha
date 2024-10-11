import Header from '../components/Header'
import ExpatsServices from '../components/ExpatsServices'
import expatsVideo from '../assets/expats-cmp.mp4'

const Expats = () => {
     return (
          <div className="relative min-h-screen">
               <video
                    autoPlay
                    loop
                    muted
                    className="background-expats"
               >
                    <source src={expatsVideo} type="video/mp4" />
                    Your browser does not support the video tag.
               </video>
               <div className="relative z-10">
                    <Header />
                    <ExpatsServices />
               </div>
          </div>
     )
}

export default Expats