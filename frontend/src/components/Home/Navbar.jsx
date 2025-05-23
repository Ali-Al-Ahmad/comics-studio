import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify-icon/react'
import ComoicStudioMainLogo from '../../assets/images/logonavbar.png'
import './Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleKeyPress = (e, callback) => {
    if (e.key === 'Enter' || e.key === ' ') {
      callback()
    }
  }

  return (
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
          {' '}
          <li>
            <Link
              to='/'
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setIsMenuOpen(false)
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <a
              href='#features-overview'
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
          </li>
          <li>
            <a
              href='#gallery'
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </a>{' '}
          </li>{' '}
          <li>
            <a
              href='#pricing'
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
          </li>
          <li className='mobile-signin'>
            <Link
              to='/login'
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          </li>
        </ul>
        <Link
          to='/login'
          className='nav-login-btn black-btn desktop-only'
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
  )
}

export default Navbar
