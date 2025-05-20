import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showToast } from '../../redux/slices/toastSlice'
import axiosInstance from '../../utils/axiosInstance'
import ViewGeneratedBook from '../../components/ViewGeneratedBook/ViewGeneratedBook'
import {
  CreateComicHeader,
  PromptSection,
} from '../../components/ComicCreation'
import './css/base.css'
import './css/prompt-form.css'
import './css/character-selection.css'
import './css/image-upload.css'
import './css/panels.css'

const CreateComic = () => {
  const [comic, setComic] = useState({
    prompt: '',
    style: 'Comic book',
    panels: [],
    captions: [],
    viewMode: 'grid',
    isGenerating: false,
    isEditing: false,
    currentEditPanel: null,
  })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { isCollapsed } = useSelector((state) => state.sidebar)
  const user = useSelector((state) => state.user)
  const credits = user?.credits || 0

  const comicViewRef = useRef(null)

  const [characters, setCharacters] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [loadingCharacters, setLoadingCharacters] = useState(false)

  const [uploadedImage, setUploadedImage] = useState(null) 






  return (
    <div
      className={`create-comic-container ${
        isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
      }`}
    >
      {' '}


    </div>
  )
}

export default CreateComic
