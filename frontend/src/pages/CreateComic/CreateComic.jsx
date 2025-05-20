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
  useEffect(() => {
    if (comic.panels.length === 0) {
      const emptyPanels = Array(6)
        .fill()
        .map(() => ({
          image: '',
          caption: '',
        }))
      setComic((prev) => ({ ...prev, panels: emptyPanels }))
    }

    fetchUserCharacters()
  }, [])

  const fetchUserCharacters = async () => {
    try {
      setLoadingCharacters(true)
      const response = await axiosInstance.get('/characters/usercharacters')
      if (response.data.success) {
        setCharacters(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching characters:', error)
      dispatch(
        showToast({
          message: 'Failed to fetch characters',
          type: 'error',
        })
      )
    } finally {
      setLoadingCharacters(false)
    }
  }

  const handlePromptChange = (e) => {
    setComic((prev) => ({ ...prev, prompt: e.target.value }))
  }

  const handleStyleChange = (e) => {
    setComic((prev) => ({ ...prev, style: e.target.value }))
  }

  const handleCaptionChange = (index, value) => {
    const updatedPanels = [...comic.panels]
    updatedPanels[index].caption = value
    setComic((prev) => ({ ...prev, panels: updatedPanels }))
  }

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character === selectedCharacter ? null : character)
    if (character !== selectedCharacter && character !== null) {
      setUploadedImage(null)
    }
  }

  const handleGenerate = async () => {
    if (!comic.prompt.trim()) {
      dispatch(
        showToast({
          message: 'Please enter a prompt to generate panels',
          type: 'error',
        })
      )
      return
    }

    if (credits < 1) {
      dispatch(
        showToast({
          message: 'Not enough credits to generate comic panels',
          type: 'error',
        })
      )
      return
    }

    try {
      setLoading(true)
      setComic((prev) => ({ ...prev, isGenerating: true }))

      const formData = new FormData()
      formData.append('user_prompt', comic.prompt)
      formData.append('comic_style', comic.style)

      if (selectedCharacter) {
        formData.append('given_character_id', selectedCharacter.id)
        formData.append('character_image_path', selectedCharacter.image_url)
        console.log(
          `Using character ${selectedCharacter.name} (ID: ${selectedCharacter.id}) for comic generation`
        )
      } else if (uploadedImage) {
        formData.append('character_image', uploadedImage)
        console.log('Using uploaded image for comic generation')
      }

      const response = await axiosInstance.post(
        '/comics/generatecomic',
        formData
      )

      if (response.data.success) {
        const { book, comics } = response.data.data
        console.log('comics', comics)
        const newPanels = comics.map((comic) => ({
          id: comic.id,
          image: comic.image_url,
          caption: comic.caption || '',
          book_id: comic.book_id,
        }))

        const generatedCaptions = comics.map((comic) => comic.caption)

        setComic((prev) => ({
          ...prev,
          panels: newPanels,
          captions: generatedCaptions,
          bookId: book.id,
          isGenerating: false,
        }))

        dispatch(
          showToast({
            message: 'Comic panels generated successfully!',
            type: 'success',
          })
        )
      }
    } catch (error) {
      console.error('Error generating comic panels:', error)
      dispatch(
        showToast({
          message: 'Failed to generate comic panels. Please try again.',
          type: 'error',
        })
      )
    } finally {
      setLoading(false)
      setComic((prev) => ({ ...prev, isGenerating: false }))

      setTimeout(() => {
        if (comicViewRef.current) {
          comicViewRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      }, 500)
    }
  }

  const handleRegeneratePanel = async (index) => {
    console.log('Regenerating clicked ', index)
  }

  const startEditPanel = (index) => {
    setComic((prev) => ({
      ...prev,
      isEditing: true,
      currentEditPanel: index,
    }))
  }

  const changeViewMode = (mode) => {
    setComic((prev) => ({ ...prev, viewMode: mode }))
  }

  return (
    <div
      className={`create-comic-container ${
        isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
      }`}
    >
      {' '}
      <CreateComicHeader credits={credits} />
      <PromptSection
        comic={comic}
        loading={loading}
        characters={characters}
        selectedCharacter={selectedCharacter}
        loadingCharacters={loadingCharacters}
        uploadedImage={uploadedImage}
        onPromptChange={handlePromptChange}
        onStyleChange={handleStyleChange}
        onCharacterSelect={handleCharacterSelect}
        setUploadedImage={setUploadedImage}
        onGenerate={handleGenerate}
      />

    </div>
  )
}

export default CreateComic
