import { useState, useEffect, useRef } from 'react'
import CsMainLogoPath from '../../assets/images/csmainlogo.png'
import PlanetLogoPath from '../../assets/images/csmainlogoplanet.png'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Icon } from '@iconify-icon/react'
import { logout } from '../../redux/slices/userSlice'
import './Sidebar.css'

const UserProfileSection = ({ user, isCollapsed, onLogoutRequest }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)
  const userMenuToggleRef = useRef(null)

  const toggleUserMenu = (e) => {
    e.stopPropagation()
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isUserMenuOpen &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target) &&
        userMenuToggleRef.current &&
        !userMenuToggleRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false)
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen])

  const handleLogoutClick = () => {
    onLogoutRequest()
    setIsUserMenuOpen(false)
  }

  const handleProfileLinkClick = () => {
    setIsUserMenuOpen(false)
  }

  return <div></div>
}
