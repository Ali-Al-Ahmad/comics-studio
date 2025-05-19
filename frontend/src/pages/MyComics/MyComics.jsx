import './MyComics.css'
import Spinner from '../../components/Spinner/Spinner'
import { Icon } from '@iconify-icon/react'
import ComicCard from '../../components/Gallery/ComicCard/ComicCard'
import { useNavigate } from 'react-router-dom'
import BookFormModal from '../../components/BookFormModal/BookFormModal'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import useMyComics from '../../hooks/useMyComics'
import CreditsDisplay from '../../components/Common/CreditsDisplay/CreditsDisplay'

const MyComics = () => {
  const {
    filteredComics,
    loading,
    activeFilter,
    searchTerm,
    showComicModal,
    currentComic,
    showDeleteConfirm,
    comicToDelete,
    isCollapsed,
    handleFilterClick,
    handleSearch,
    handleOpenComicModal,
    handleCloseComicModal,
    handleSaveComic,
    handleDeleteClick,
    handleCancelDelete,
    handleConfirmDelete,
  } = useMyComics()
  const navigate = useNavigate()

  return (
    <div className='mycomics-container'>
      <div className='mycomics-header'>
        <div className='gallery-header-container'>
          <div className='filter-buttons'>
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterClick('all')}
            >
              <Icon
                icon='mdi:view-grid'
                width='18'
                height='18'
                className='filter-btn-icon'
              />
              <span className='filter-btn-text'>All Books</span>
            </button>
            <button
              className={`filter-btn ${
                activeFilter === 'recent' ? 'active' : ''
              }`}
              onClick={() => handleFilterClick('recent')}
            >
              <Icon
                icon='mdi:history'
                width='18'
                height='18'
                className='filter-btn-icon'
              />{' '}
              <span className='filter-btn-text'>Recently Viewed</span>
            </button>
          </div>
          <CreditsDisplay />
        </div>

        <div className='mycomics-search-controls'>
          <div className='search-container'>
            <input
              type='text'
              placeholder='Search comics...'
              value={searchTerm}
              onChange={handleSearch}
              className='search-input'
            />
          </div>
          <button
            onClick={() => navigate('/createcomic')}
            className='create-comic-btn'
          >
            <Icon
              icon='mdi:plus'
              width='20'
              height='20'
              className='create-icon'
            />
            <span className='create-text'>Create Comic</span>
          </button>
        </div>
      </div>
      {loading ? (
        <div className='comics-loading'>
          <Spinner />
          <p>Loading comics...</p>
        </div>
      ) : (
        <>
          {filteredComics.length === 0 ? (
            <div className='no-comics comics-grid-appear'>
              <div className='empty-state-content'>
                <div className='icon-container'>
                  <Icon
                    icon={
                      activeFilter === 'recent'
                        ? 'mdi:history'
                        : 'mdi:book-open-page-variant'
                    }
                    width='48'
                    height='48'
                    className='empty-state-icon'
                  />
                </div>
                <p>
                  {searchTerm
                    ? `No comics found matching "${searchTerm}". Try a different search term.`
                    : activeFilter === 'recent'
                    ? 'No recently viewed comics. Browse the gallery to see comics here.'
                    : 'No comics found. Create your first comic!'}
                </p>
                {activeFilter === 'all' && !searchTerm && (
                  <button
                    onClick={() => navigate('/createcomic')}
                    className='create-comic-btn'
                    style={{ marginTop: '1rem' }}
                  >
                    <Icon
                      icon='mdi:plus'
                      width='20'
                      height='20'
                      className='create-icon'
                    />
                    <span className='create-text'>Create Comic</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className='mycomics-comics-grid comics-grid-appear'>
              {filteredComics.map((comic) => (
                <article
                  key={comic.id}
                  className='comic-card-wrapper'
                  aria-label={`Comic: ${comic.title}`}
                >
                  <ComicCard
                    comic={comic}
                    onEdit={() => handleOpenComicModal(comic)}
                    onDelete={() => handleDeleteClick(comic)}
                    isUserComic={true}
                    current={true}
                  />
                </article>
              ))}
            </div>
          )}
        </>
      )}

      {showComicModal && (
        <BookFormModal
          isOpen={showComicModal}
          comic={currentComic}
          onSave={handleSaveComic}
          onClose={handleCloseComicModal}
          isSidebarCollapsed={isCollapsed}
          title={currentComic ? 'Edit Comic' : 'Create Comic'}
        />
      )}

      {showDeleteConfirm && comicToDelete && (
        <ConfirmDialog
          isOpen={showDeleteConfirm}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title='Delete Comic'
          message={`Are you sure you want to delete "${comicToDelete.title}"? This action cannot be undone.`}
          confirmText='Delete'
          cancelText='Cancel'
          type='danger'
        />
      )}
    </div>
  )
}

export default MyComics
