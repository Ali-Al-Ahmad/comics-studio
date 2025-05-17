import { Link } from 'react-router-dom'
import { Icon } from '@iconify-icon/react'
import './PricingSection.css'

const PricingSection = () => {
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

  return (
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
  )
}

export default PricingSection
