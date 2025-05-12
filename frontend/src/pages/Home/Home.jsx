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
      <section
        id='features-overview'
        className='features-overview-section'
      >
        <h2 className='features-overview-title'>
          Everything You Need For Comic Creation
        </h2>
        <p className='features-overview-subtitle'>
          Powerful AI tools to bring your comic ideas to life
        </p>

        <div className='features-overview-grid'>
          <div className='feature-overview-card'>
            <div className='feature-overview-icon'>
              <Icon icon='mdi:magic-wand' />
            </div>
            <h3>Effortless Comic Generation</h3>
            <p>
              Generate comics with ease by simply describing the characters,
              styles and scenes. No drawing skills required!
            </p>
          </div>

          <div className='feature-overview-card'>
            <div className='feature-overview-icon'>
              <Icon icon='mdi:palette' />
            </div>
            <h3>Diverse Comic Styles</h3>
            <p>
              Choose from a wide range of comic styles, including American,
              Japanese, Nihonga, and more, to give your comics a unique look and
              feel.
            </p>
          </div>

          <div className='feature-overview-card'>
            <div className='feature-overview-icon'>
              <Icon icon='mdi:view-grid' />
            </div>
            <h3>Varied Layout Options</h3>
            <p>
              Select from a range of layouts for your generated images, with
              more options coming soon.
            </p>
          </div>

          <div className='feature-overview-card'>
            <div className='feature-overview-icon'>
              <Icon icon='mdi:text' />
            </div>
            <h3>Captivating Captions</h3>
            <p>
              Enhance your comics with captions that add context to each panel.
              Control the narrative with descriptive text.
            </p>
          </div>

          <div className='feature-overview-card'>
            <div className='feature-overview-icon'>
              <Icon icon='mdi:refresh' />
            </div>
            <h3>Redraw Image</h3>
            <p>
              If you&apos;re not satisfied with the initial result, this feature
              allows you to start over and create a new version from scratch.
            </p>
          </div>

          <div className='feature-overview-card'>
            <div className='feature-overview-icon'>
              <Icon icon='mdi:pencil' />
            </div>
            <h3>Edit Prompt</h3>
            <p>
              You can easily modify or refine prompt, allowing you to fine-tune
              the AI&apos;s response to better match your creative vision.
            </p>
          </div>
        </div>
      </section>
      <section
        id='feature-details'
        className='feature-section'
      >
        <div className='feature-container'>
          <div className='feature-text'>
            <h2 className='section-title'>
              Consistent Characters Across Every Frame
            </h2>
            <p className='section-description'>
              Harness the power of AI to maintain character consistency
              throughout your stories. Enhance your narrative with visuals that
              keep true to your characters&apos; essence, ensuring a coherent
              visual experience from start to finish.
            </p>
            <Link
              to='/register'
              className='btn btn-primary'
            >
              Try Comics Studio for Free
            </Link>
          </div>
          <div className='feature-image'>
            <img
              src='https://imgc.cc/2024/05/05/6637517f61c22.jpg'
              alt='Consistent character'
            />
          </div>
        </div>
      </section>
      <section className='feature-section alt'>
        <div className='feature-container reverse'>
          <div className='feature-image'>
            <img
              src='https://imgc.cc/2024/05/05/66375076e1110.png'
              alt='Reference'
            />
          </div>
          <div className='feature-text'>
            <h2 className='section-title'>
              Upload Your Images, Personalize Your Story
            </h2>
            <p className='section-description'>
              Personalize your visual stories by uploading reference images.
              Integrate your own characters and settings into the narrative,
              creating unique and compelling stories with visuals that speak
              directly to your audience.
            </p>
            <Link
              to='/register'
              className='btn btn-primary'
            >
              Try Comics Studio for Free
            </Link>
          </div>
        </div>
      </section>
      <section className='feature-section'>
        <div className='feature-container'>
          <div className='feature-text'>
            <h2 className='section-title'>
              Create Stunning Single-Panel Comics Instantly
            </h2>
            <p className='section-description'>
              Comics Studio empowers you to design high-quality single-panel
              comics with ease. Whether for storytelling, branding, or
              entertainment, create visuals that captivate and communicate your
              ideas effectively.
            </p>
            <Link
              to='/comics-gallery'
              className='btn btn-primary'
            >
              Learn More About Comics Studio
            </Link>
          </div>
          <div className='feature-image'>
            <img
              src='https://imagedelivery.net/X26-mmRvk4CuiCyo9bU9tw/76d58fc1-09d6-4c75-6f83-9f6f84dd0100/public'
              alt='Single-panel creation'
            />
          </div>
        </div>
      </section>
      <section
        id='gallery'
        className='gallery-section'
      >
        <h2 className='gallery-title'>
          Explore Comics Created with Comics Studio
        </h2>

        <div className='comics-categories'>
          <div className='comics-grid'>
            <div className='comic-card'>
              <img
                src='https://cdn-uploads.huggingface.co/production/uploads/noauth/MKjLZDJumVcjrK0HcjKOc.jpeg'
                alt='Captain America comic'
                className='comic-image'
              />
              <div className='comic-info'>
                <p className='comic-caption'>
                  Captain America punching a giant octopus
                </p>
              </div>
            </div>
            <div className='comic-card'>
              <img
                src='https://cdn-uploads.huggingface.co/production/uploads/noauth/PeK-MtQwvltH-OlnXtwwe.jpeg'
                alt='Iron Man comic'
                className='comic-image'
              />
              <div className='comic-info'>
                <p className='comic-caption'>Iron Man vs Monkey King</p>
              </div>
            </div>
            <div className='comic-card'>
              <img
                src='https://cdn-uploads.huggingface.co/production/uploads/noauth/FhRd_Gast7omVXwtikfoq.jpeg'
                alt='Batman comic'
                className='comic-image'
              />
              <div className='comic-info'>
                <p className='comic-caption'>Batman as a computer hacker</p>
              </div>
            </div>
          </div>

          <div className='comics-grid'>
            <div className='comic-card'>
              <img
                src='https://cdn-uploads.huggingface.co/production/uploads/noauth/N-Azz6mApVS3eMMSmTu-h.jpeg'
                alt='Zeus fights Hades'
                className='comic-image'
              />
              <div className='comic-info'>
                <p className='comic-caption'>Zeus fights Hades</p>
              </div>
            </div>
            <div className='comic-card'>
              <img
                src='https://cdn-uploads.huggingface.co/production/uploads/noauth/tkLJQj5NnD4P9idfw03IS.jpeg'
                alt='Llama discovering Paris'
                className='comic-image'
              />
              <div className='comic-info'>
                <p className='comic-caption'>A llama discovering Paris</p>
              </div>
            </div>
            <div className='comic-card'>
              <img
                src='https://cdn-uploads.huggingface.co/production/uploads/noauth/Bobl3XtiJcrrRLWmTJUGX.jpeg'
                alt='Dinosaur comic'
                className='comic-image'
              />
              <div className='comic-info'>
                <p className='comic-caption'>
                  Mystery City: Mark and Jane hide in a cave from a dinosaur
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id='testimonials'
        className='testimonials-section'
      >
        <div className='section-header'>
          <h2 className='section-title'>User Love and Appreciation</h2>
          <h3 className='section-subtitle'>
            Hear What Our Users Adore About AI Comics Studio
          </h3>
        </div>
        <div className='testimonials-container'>
          {testimonials.map((testimonial) => (
            <div
              className='testimonial-card'
              key={testimonial.id}
            >
              <div className='testimonial-quote'>❝</div>
              <p className='testimonial-text'>{testimonial.text}</p>
              <div className='testimonial-user'>
                <img
                  src={`https://ui-avatars.com/api/?name=${testimonial.author.replace(
                    /\s+/g,
                    '+'
                  )}&background=7063F1&color=fff`}
                  alt={testimonial.author}
                  className='testimonial-avatar'
                />
                <div className='testimonial-info'>
                  <p className='testimonial-author'>{testimonial.author}</p>
                  <p className='testimonial-handle'>{testimonial.handle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section
        id='pricing'
        className='pricing-section'
      >
        <h2 className='pricing-title'>Pricing</h2>
        <p className='pricing-subtitle'>
          Choose your bundle size. Pay as you want. Generating one image panel
          will consume 1 credit. Change or cancel your plan anytime. Start using
          our service for 100% free.
        </p>

        <div className='pricing-cards'>
          {pricingPlans.map((plan) => (
            <div
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
              key={plan.id}
            >
              {plan.popular && <span className='popular-badge'>Popular</span>}
              <h3 className='plan-name'>{plan.name} plan</h3>
              <p className='plan-credits'>{plan.credits} Credits</p>
              <p className='plan-price'>
                ${plan.price}
                <span>/month</span>
              </p>
              <Link
                to='/register'
                className={`btn ${
                  plan.popular ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                Buy Plan
              </Link>
              <div className='plan-features'>
                {plan.features.map((feature, i) => (
                  <div
                    className='plan-feature'
                    key={`${plan.id}-feature-${i}`}
                  >
                    <Icon
                      icon='mdi:check-circle'
                      className='feature-icon'
                    />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section
        id='faq'
        className='faq-section'
      >
        <div className='faq-shape'></div>
        <h2 className='faq-title'>Frequently Asked Questions</h2>
        <p className='faq-subtitle'>
          Everything you need to know about Comics Studio.
        </p>

        <div className='faq-container'>
          <div className='faq-grid'>
            {faqItems.map((item) => (
              <div
                className={`faq-item ${
                  activeQuestion === item.id ? 'active' : ''
                }`}
                key={item.id}
              >
                <button
                  className='faq-question'
                  onClick={() => toggleQuestion(item.id)}
                  onKeyDown={(e) =>
                    handleKeyPress(e, () => toggleQuestion(item.id))
                  }
                  aria-expanded={activeQuestion === item.id}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <div className='faq-question-content'>
                    <Icon
                      icon='mdi:help-circle-outline'
                      className='faq-icon'
                      aria-hidden='true'
                    />
                    <span>{item.question}</span>
                  </div>
                  <Icon
                    icon={
                      activeQuestion === item.id
                        ? 'mdi:minus-circle-outline'
                        : 'mdi:plus-circle-outline'
                    }
                    className='faq-toggle'
                    aria-hidden='true'
                  />
                </button>
                <div
                  className='faq-answer'
                  id={`faq-answer-${item.id}`}
                  style={{
                    maxHeight: activeQuestion === item.id ? '1000px' : '0',
                    opacity: activeQuestion === item.id ? 1 : 0,
                  }}
                >
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
