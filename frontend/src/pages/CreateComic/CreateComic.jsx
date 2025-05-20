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
