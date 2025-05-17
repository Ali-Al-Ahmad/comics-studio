import CharacterCard from '../CharacterCard/CharacterCard'
import './CharactersGrid.css'

const CharactersGrid = ({
  characters,
  favoriteCharacters,
  handleEditCharacter,
  confirmDeleteCharacter,
  toggleFavorite,
  apiBaseUrl,
}) => {
  return (
    <div className='characters-grid characters-grid-appear'>
      {characters.map((character, index) => {
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

        const animationDelay = {
          animationDelay: `${Math.min(index * 0.05, 0.5)}s`,
          opacity: 0,
          animation: 'fadeInGrid 0.3s forwards',
        }
        return (
          <div
            key={character.id}
            style={animationDelay}
            className='character-card-wrapper'
            tabIndex={0}
            role='article'
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
              isFavorite={
                character.is_favorite ||
                favoriteCharacters.includes(character.id)
              }
            />
          </div>
        )
      })}
    </div>
  )
}

export default CharactersGrid
