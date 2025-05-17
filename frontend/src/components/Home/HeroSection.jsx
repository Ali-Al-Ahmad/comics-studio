import { Link } from 'react-router-dom'
import { Icon } from '@iconify-icon/react'
import { ReactTyped } from 'react-typed'
import './HeroSection.css'

const HeroSection = () => {
  return (
    <section className='hero-section'>
      <div className='hero-content'>
        <h1 className='hero-title'>
          AI <span>Comics</span> Studio
        </h1>
        <p className='hero-subtitle'>
          Create Stunning Comics without Drawing Skills using our cutting-edge
          AI Comic Generator. Bring Your Comic Dreams to Life with AI
          Creativity.
        </p>
        <div className='hero-buttons'>
          <Link
            to='/register'
            className='btn btn-primary'
          >
            Get Started for Free
          </Link>
          <a
            href='#features-overview'
            className='learn-more-link'
          >
            Learn more
            <Icon
              icon='pajamas:long-arrow'
              className='learn-more-arrow'
            />
          </a>
        </div>
        <div className='animated-text-wrapper'>
          <ReactTyped
            strings={[
              'Unleash Your Creative Storytelling',
              'Create Without Drawing Skills',
              'Build Comics in Minutes',
              'Let AI Power Your Stories',
            ]}
            typeSpeed={50}
            backSpeed={30}
            backDelay={2000}
            loop
            className='animated-typed-text'
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
