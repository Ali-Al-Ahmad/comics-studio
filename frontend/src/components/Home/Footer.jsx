import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-column'>
          <div className='footer-logo'>
            <span className='footer-logo-text'>Comics Studio</span>
          </div>
          <p>
            Create stunning comics without drawing skills using our cutting-edge
            AI Comic Generator.
          </p>
        </div>

        <div className='footer-column'>
          <h3>Help Center</h3>
          <ul className='footer-links'>
            <li>
              <Link to='/'>Contact Us</Link>
            </li>
            <li>
              <Link to='/'>Support</Link>
            </li>
          </ul>
        </div>

        <div className='footer-column'>
          <h3>Products</h3>
          <ul className='footer-links'>
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
        </div>

        <div className='footer-column'>
          <h3>Legal</h3>
          <ul className='footer-links'>
            <li>
              <Link to='/'>Terms of Use</Link>
            </li>
            <li>
              <Link to='/'>Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>© {new Date().getFullYear()} Comics Studio. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
