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

  return (
    <div className='sidebar-user-profile-section'>
      <div className='user-avatar-details'>
        <div className='user-avatar'>
          {' '}
          {user.profile_picture ? (
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/${
                user.profile_picture
              }`}
              alt='User Avatar'
            />
          ) : (
            <Icon
              icon='mdi:account-box'
              className='sidebar-icon default-avatar-icon'
            />
          )}
        </div>
        {!isCollapsed && (
          <div className='user-text-info'>
            <span
              className='user-name'
              title={`${user.first_name || ''} ${user.last_name || ''}`}
            >
              {`${user.first_name || 'User'} ${
                user.last_name || 'Name'
              }`.trim()}
            </span>
            <span
              className='user-email'
              title={user.email || ''}
            >
              {user.email || 'user@example.com'}
            </span>
          </div>
        )}
      </div>{' '}
      <button
        ref={userMenuToggleRef}
        className='user-menu-toggle-button'
        onClick={toggleUserMenu}
        title='User menu'
        aria-expanded={isUserMenuOpen}
      >
        <Icon
          icon='mdi:chevron-down'
          className={`sidebar-icon up-down-arrow-icon ${
            isUserMenuOpen ? 'rotated' : ''
          }`}
        />
      </button>
      {isUserMenuOpen && (
        <div
          ref={userMenuRef}
          className={`user-profile-menu ${isCollapsed ? 'collapsed-menu' : ''}`}
          role='menu'
        >
          {' '}
          <Link
            to='/profile'
            onClick={handleProfileLinkClick}
            className='user-profile-menu-item'
            role='menuitem'
          >
            <Icon
              icon='mdi:cog-outline'
              className='sidebar-icon user-menu-item-icon'
            />
            <span>Settings</span>
          </Link>{' '}
          <button
            onClick={handleLogoutClick}
            className='user-profile-menu-item logout-button'
            role='menuitem'
          >
            <Icon
              icon='mdi:logout'
              className='sidebar-icon user-menu-item-icon'
            />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  )
}
