import { useRef } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@iconify-icon/react'
import Spinner from '../Spinner/Spinner'
import './ViewGeneratedBook.css'

import { showToast } from '../../redux/slices/toastSlice'
import axiosInstance from '../../utils/axiosInstance'

import {
  usePublishStatus,
  useDownloadComic,
  useShareComic,
} from '../../hooks/useComicActions'

import PanelView from './components/PanelView'
import EditPanel from './components/EditPanel'
import ViewControls from './components/ViewControls'

const ViewGeneratedBook = ({
  comic,
  loading,
  onChangeViewMode,
  onEditPanel,
  onRegeneratePanel,
  onCaptionChange,
  onPublishStatusChange,
  dispatch,
  viewOnly = false,
}) => {
  const panelRefs = useRef([])

  const { isPublished, publishLoading, togglePublishStatus } = usePublishStatus(
    comic,
    dispatch,
    onPublishStatusChange
  )

  const { handleDownloadComic, handleDownloadPDF } = useDownloadComic(dispatch)
  const { shareComic } = useShareComic(comic, dispatch)

  const setPanelRef = (index, element) => {
    panelRefs.current[index] = element
  }
  const renderPanels = () => {
    if (loading && comic.panels.every((panel) => !panel.image)) {
      return (
        <div className='comics-loading'>
          <Spinner />
          <p>Generating comic panels...</p>
        </div>
      )
    }

    if (!viewOnly && comic.isEditing && comic.currentEditPanel !== null) {
      const panel = comic.panels[comic.currentEditPanel]
      return (
        <EditPanel
          panel={panel}
          panelIndex={comic.currentEditPanel}
          loading={loading}
          onCancelEdit={() => onEditPanel(null)}
          onRegeneratePanel={onRegeneratePanel}
          onCaptionChange={onCaptionChange}
        />
      )
    }

    switch (comic.viewMode) {
      case 'grid':
        return (
          <div className='panels-grid'>
            {comic.panels.map((panel, index) => (
              <PanelView
                key={panel.id || `panel-${index}`}
                panel={panel}
                index={index}
                viewMode='grid'
                loading={loading}
                viewOnly={viewOnly}
                onEditPanel={onEditPanel}
                setRef={setPanelRef}
              />
            ))}
          </div>
        )

      case 'book':
        return (
          <div className='panels-book'>
            <div className='book-pages'>
              {comic.panels.map((panel, index) => (
                <PanelView
                  key={panel.id || `panel-${index}`}
                  panel={panel}
                  index={index}
                  viewMode='book'
                  loading={loading}
                  viewOnly={viewOnly}
                  onEditPanel={onEditPanel}
                  setRef={setPanelRef}
                />
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }
  return (
    <>
      <ViewControls
        comic={comic}
        viewOnly={viewOnly}
        loading={loading}
        isPublished={isPublished}
        publishLoading={publishLoading}
        onChangeViewMode={onChangeViewMode}
        onDownloadComic={() => {
          const bookElement = document.querySelector('.panels-book')
          handleDownloadComic(bookElement, comic)
        }}
        onDownloadPDF={() => {
          const bookElement = document.querySelector('.panels-book')
          handleDownloadPDF(bookElement, comic)
        }}
        onTogglePublish={togglePublishStatus}
        onShareComic={shareComic}
      />

      <div className='comic-panels-container'>{renderPanels()}</div>
    </>
  )
}



export default ViewGeneratedBook
