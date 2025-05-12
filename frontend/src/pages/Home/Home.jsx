import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify-icon/react'
import { ReactTyped } from 'react-typed'
import ComoicStudioMainLogo from '../../assets/images/logonavbar.png'
import './Home.css'

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState(null)
  const testimonials = [
    {
      id: 't1',
      text: "I absolutely adore Comics Studio! It has rekindled my passion for creating comics. The way it brings my ideas to life is truly remarkable. I can't imagine my creative process without it.",
      author: 'Sarah Johnson',
      handle: '@SarahCreatesComics',
    },
    {
      id: 't2',
      text: "Comics Studio is my go-to tool for comic creation. Its ability to turn my text descriptions into beautiful comic panels is pure magic. It's like having a skilled illustrator at my fingertips.",
      author: 'Alex Turner',
      handle: '@ComicGeekAlex',
    },
    {
      id: 't3',
      text: "I've been a comic enthusiast for years, and Comics Studio has revolutionized the way I create comics. The variety of styles and layouts, along with the freedom to edit prompt, makes it an essential tool for any comic artist.",
      author: 'Michael Rodriguez',
      handle: '@ComicArtMike',
    },
    {
      id: 't4',
      text: 'As an educator, I use Comics Studio to create engaging visual content for my students. The intuitive interface and diverse style options make it perfect for educational storytelling. My students love the comics we create!',
      author: 'Emily Chen',
      handle: '@TeachWithComics',
    },
  ]

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free',
      credits: '0',
      price: '0',
      popular: false,
      features: [
        'Normal speed generation',
        'Character consistency',
        'Single/Double page mode',
        'Custom caption language',
      ],
    },
    {
      id: 'starter',
      name: 'Starter',
      credits: '600',
      price: '9.99',
      popular: true,
      features: [
        '600 credits per month',
        'Faster image generation',
        'Stable storytelling output',
        'Ads free',
        'Character consistency',
        'Upload your own character',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      credits: '1200',
      price: '13.99',
      popular: false,
      features: [
        '1200 credits per month',
        'Support for advanced features',
        'Character consistency',
        'Upload your own character',
        'Faster image generation',
        'Stable storytelling output',
      ],
    },
    {
      id: 'advanced',
      name: 'Advanced',
      credits: 'Unlimited',
      price: '34.99',
      popular: false,
      features: [
        'Unlimited credits',
        'Support for all features',
        'Character consistency',
        'Upload your own character',
        'Faster image generation',
        'Stable storytelling output',
      ],
    },
  ]

  const faqItems = [
    {
      id: 'faq1',
      question: 'How are credits calculated and used within the app?',
      answer:
        'Credits are consumed when you generate comic panels. Creating one panel requires 1 credit. You can track your credit usage in your account dashboard.',
    },
    {
      id: 'faq2',
      question: 'Can I use Comics Studio for commercial purposes?',
      answer:
        'Yes, all plans allow for commercial use of the comics you create. The commercial license is included in all our subscription plans.',
    },
    {
      id: 'faq3',
      question: 'Can I get more credits?',
      answer:
        'Yes, you can purchase additional credits or upgrade your plan at any time from your account settings page.',
    },
    {
      id: 'faq4',
      question: 'Can I change my plan later?',
      answer:
        'Absolutely! You can upgrade, downgrade, or cancel your plan at any time from your account settings.',
    },
    {
      id: 'faq5',
      question: 'What if I decide to cancel?',
      answer:
        "You can cancel your subscription anytime. You'll still have access to your plan until the end of your current billing cycle.",
    },
    {
      id: 'faq6',
      question: 'What about the returns and refunds?',
      answer:
        "While we don't offer refunds for subscription time already used, you can cancel anytime to prevent future charges. Please contact our support team for special circumstances.",
    },
    {
      id: 'faq7',
      question: 'Will my unused credits roll over to the next month?',
      answer:
        "Credits don't roll over to the next billing cycle. We encourage you to use your credits before your billing cycle resets.",
    },
  ]

  const toggleQuestion = (id) => {
    if (activeQuestion === id) {
      setActiveQuestion(null)
    } else {
      setActiveQuestion(id)
    }
  }

  const handleKeyPress = (e, callback) => {
    if (e.key === 'Enter' || e.key === ' ') {
      callback()
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)

    document.title =
      'Comics Studio - Create Stunning Comics without Drawing Skills'

    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-section')
      if (heroSection) {
        const heroBottom =
          heroSection.offsetTop + heroSection.offsetHeight - 200
        setShowBackToTop(window.scrollY > heroBottom)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const targetId = this.getAttribute('href')
        if (targetId === '#') return
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth',
          })
        }
      })
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className='home-page'>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link
            to='/'
            className='navbar-logo'
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <img
              src={ComoicStudioMainLogo}
              alt='Comics Studio Logo'
            />
          </Link>
          <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <Link
                to='/'
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <a href='#features-overview'>About</a>
            </li>
            <li>
              <a href='#gallery'>Explore</a>
            </li>
            <li>
              <a href='#pricing'>Pricing</a>
            </li>
          </ul>
          <Link
            to='/login'
            className='nav-login-btn black-btn'
          >
            Sign In
          </Link>
          <button
            className='navbar-menu-toggle'
            onClick={toggleMenu}
            onKeyDown={(e) => handleKeyPress(e, toggleMenu)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <Icon icon={isMenuOpen ? 'mdi:close' : 'mdi:menu'} />
          </button>
        </div>
      </nav>
 





    </div>
  )
}

export default Home
