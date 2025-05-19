import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ComicHeader from '../../components/ViewComicBookComponents/ComicHeader'
import LoadingState from '../../components/ViewComicBookComponents/LoadingState'
import ComicContent from '../../components/ViewComicBookComponents/ComicContent'
import { useComicBook } from '../../hooks/useComicBook'
import './ViewComicBook.css'

const ViewComicBook = () => {
  const { bookId } = useParams()
  const dispatch = useDispatch()
  const { isCollapsed } = useSelector((state) => state.sidebar)
  const user = useSelector((state) => state.user)
  const {
    comic,
    loading,
    handleChangeViewMode,
    handleEditPanel,
    handleRegeneratePanel,
    handleCaptionChange,
    handlePublishStatusChange,
  } = useComicBook(bookId, dispatch)
  return (
    <div
      className={`view-comic-container ${
        isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
      }`}
    ></div>
  )
}

export default ViewComicBook
