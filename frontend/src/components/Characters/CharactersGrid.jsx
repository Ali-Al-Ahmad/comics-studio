import CharacterCard from '../CharacterCard/CharacterCard'
import PropTypes from 'prop-types'
import './CharactersGrid.css'

const CharactersGrid = ({
  characters,
  handleEditCharacter,
  confirmDeleteCharacter,
  toggleFavorite,
  apiBaseUrl,
}) => {
  return (
    <div className='characters-grid characters-grid-appear'>
      {characters.map((character) => {
        let imageUrl = character.image_url

        if (
          imageUrl &&
          !imageUrl.startsWith('data:') &&
          !imageUrl.includes('placehold.co')
        ) {
          imageUrl = `${apiBaseUrl}/${imageUrl}`
        } else if (!imageUrl) {
          imageUrl = `https://placehold.co/300x400/3498db/FFFFFF?text=${encodeURIComponent(
            character.name
          )}`
        }

        return (
          <article
            key={character.id}
            className='character-card-wrapper'
            aria-label={`Character: ${character.name}`}
          >
            <CharacterCard
              character={{
                ...character,
                image_url: imageUrl,
              }}
              onEdit={handleEditCharacter}
              onDelete={() => confirmDeleteCharacter(character)}
              onFavorite={() => toggleFavorite(character.id)}
              isFavorite={character.is_favorite === true}
            />
          </article>
        )
      })}
    </div>
  )
}

CharactersGrid.propTypes = {
  characters: PropTypes.array.isRequired,
  handleEditCharacter: PropTypes.func.isRequired,
  confirmDeleteCharacter: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  apiBaseUrl: PropTypes.string,
}

export default CharactersGrid
