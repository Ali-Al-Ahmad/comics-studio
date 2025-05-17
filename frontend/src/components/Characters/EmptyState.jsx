import { Icon } from '@iconify-icon/react'
import './EmptyState.css'

const EmptyState = ({ searchTerm, activeFilter }) => {
  return (
    <div className='no-characters characters-grid-appear'>
      <div className='empty-state-content'>
        <div className='icon-container'>
          <Icon
            icon={activeFilter === 'favorites' ? 'mdi:star' : 'mdi:view-grid'}
            width='48'
            height='48'
            className='empty-state-icon'
          />
        </div>
        <p>
          {searchTerm
            ? `No characters found matching "${searchTerm}". Try a different search term.`
            : activeFilter === 'favorites'
            ? 'No favorite characters yet. Click the star icon on any character to mark it as favorite.'
            : 'No characters found. Create your first character!'}
        </p>
      </div>
    </div>
  )
}

export default EmptyState
