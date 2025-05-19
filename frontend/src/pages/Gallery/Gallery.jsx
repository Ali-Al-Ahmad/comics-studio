import './Gallery.css'
import Spinner from '../../components/Spinner/Spinner'
import GalleryHeader from '../../components/Gallery/GalleryHeader/GalleryHeader'
import GalleryControls from '../../components/Gallery/GalleryControls/GalleryControls'
import ComicCard from '../../components/Gallery/ComicCard/ComicCard'
import useGallery from '../../hooks/useGallery'

const Gallery = () => {
  const {
    filteredComics,
    loading,
    activeFilter,
    searchTerm,
    handleFilterClick,
    handleSearch,
  } = useGallery()
  return (
    <div className={`gallery-container`}>
      <div className='gallery-header'>
        {' '}
        <GalleryHeader
          activeFilter={activeFilter}
          handleFilterClick={handleFilterClick}
        />
        <GalleryControls
          searchTerm={searchTerm}
          handleSearch={handleSearch}
        />
      </div>
      {loading ? (
        <div className='comics-loading'>
          <Spinner />
          <p>Loading comics...</p>
        </div>
      ) : (
        <>
          {' '}
          {filteredComics.length === 0 ? (
            <div className='no-comics comics-grid-appear'>
              <p>
                {searchTerm
                  ? `No comics found matching "${searchTerm}". Try a different search term.`
                  : 'No comics found.'}
              </p>
            </div>
          ) : (
            <div className='gallery-comics-grid comics-grid-appear'>
              {filteredComics.map((comic) => (
                <article
                  key={comic.id}
                  className='comic-card-wrapper'
                  aria-label={`Comic: ${comic.title}`}
                >
                  <ComicCard comic={comic} />
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Gallery
