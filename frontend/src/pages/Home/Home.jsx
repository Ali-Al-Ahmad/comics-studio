import './Home.css'

import Navbar from '../../components/Home/Navbar'
import HeroSection from '../../components/Home/HeroSection'
import FeaturesOverview from '../../components/Home/FeaturesOverview'
import FeatureDetails from '../../components/Home/FeatureDetails'
import Gallery from '../../components/Home/Gallery'
import Testimonials from '../../components/Home/Testimonials'
import PricingSection from '../../components/Home/PricingSection'
import FAQSection from '../../components/Home/FAQSection'
import Footer from '../../components/Home/Footer'
import BackToTop from '../../components/Home/BackToTop'

const Home = () => {
  return (
    <div className='home-page'>
      <Navbar />
      <HeroSection />
      <FeaturesOverview />
      <FeatureDetails />
      <Gallery />
      <Testimonials />
      <PricingSection />
      <FAQSection />
      <Footer />
      <BackToTop />
    </div>
  )
}

export default Home
