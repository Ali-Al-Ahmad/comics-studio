import CharacterFormModal from '../CharacterFormModal/CharacterFormModal'
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'

const CharacterModals = ({
  showCharacterModal,
  handleCloseCharacterModal,
  handleSaveCharacter,
  currentCharacter,
  isCollapsed,
  showDeleteConfirm,
  setShowDeleteConfirm,
  handleDeleteCharacter,
  characterToDelete,
}) => {
  return (
    <>
      <CharacterFormModal
        isOpen={showCharacterModal}
        onClose={handleCloseCharacterModal}
        onSave={handleSaveCharacter}
        character={currentCharacter}
        title={currentCharacter ? 'Edit Character' : 'Create Character'}
        isSidebarCollapsed={isCollapsed}
      />
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteCharacter}
        title='Delete Character'
        message={
          characterToDelete
            ? `Are you sure you want to delete ${characterToDelete.name}? This action cannot be undone.`
            : 'Are you sure you want to delete this character? This action cannot be undone.'
        }
        confirmText='Delete'
        type='danger'
      />
    </>
  )
}

export default CharacterModals
