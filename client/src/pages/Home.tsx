import HeroSection from "../sections/HeroSection"
import FeaturesSection from "../sections/FeaturesSection"
import CallToAction from "../sections/CallToAction"
import Footer from "../components/Footer"


const Home = () => {
    return (
        <div className="min-h-screen overflow-hidden bg-[#050706] text-white">
            <HeroSection />
            <FeaturesSection />
            <CallToAction />
            <Footer />
        </div>
    )
}

export default Home
