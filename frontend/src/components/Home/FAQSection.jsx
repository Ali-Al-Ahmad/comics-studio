import { useState } from 'react'
import { Icon } from '@iconify-icon/react'
import './FAQSection.css'

const FAQSection = () => {
  const [activeQuestion, setActiveQuestion] = useState(null)

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
      e.preventDefault()
      callback()
    }
  }

  return (
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
  )
}

export default FAQSection
