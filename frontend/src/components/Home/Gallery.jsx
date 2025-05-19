import './Gallery.css'

const Gallery = () => {
  const comicsRow1 = [
    {
      id: 'comic1',
      image: '../../../src/assets/images/comic1.jpeg',
      caption: 'Captain America punching a giant octopus',
    },
    {
      id: 'comic2',
      image: '../../../src/assets/images/comic2.jpeg',
      caption: 'Iron Man vs Monkey King',
    },
    {
      id: 'comic3',
      image: '../../../src/assets/images/comic3.jpeg',
      caption: 'Batman as a computer hacker',
    },
  ]
  const comicsRow2 = [
    {
      id: 'comic4',
      image: '../../../src/assets/images/comic4.jpeg',
      caption: 'Zeus fights Hades',
    },
    {
      id: 'comic5',
      image: '../../../src/assets/images/comic5.jpeg',
      caption: 'A llama discovering Paris',
    },
    {
      id: 'comic6',
      image: '../../../src/assets/images/comic6.jpeg',
      caption: 'Mystery City: Mark and Jane hide in a cave from a dinosaur',
    },
  ]

  return (
    <section
      id='gallery'
      className='gallery-section'
    >
      <h2 className='gallery-title'>
        Explore Comics Created with Comics Studio
      </h2>

      <div className='comics-categories'>
        <div className='comics-grid'>
          {' '}
          {comicsRow1.map((comic) => (
            <div
              className='comic-card'
              key={comic.id}
            >
              <img
                src={comic.image}
                alt={comic.caption}
                className='gallery-comic-image'
                onError={(e) => {
                  console.error(`Failed to load image: ${comic.image}`)
                  e.target.onerror = null
                  e.target.src = '/csmainlogoplanet.png'
                }}
              />
              <div className='comic-info'>
                <p className='comic-caption'>{comic.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='comics-grid'>
          {' '}
          {comicsRow2.map((comic) => (
            <div
              className='comic-card'
              key={comic.id}
            >
              <img
                src={comic.image}
                alt={comic.caption}
                className='gallery-comic-image'
                onError={(e) => {
                  console.error(`Failed to load image: ${comic.image}`)
                  e.target.onerror = null
                  e.target.src = '/csmainlogoplanet.png'
                }}
              />
              <div className='comic-info'>
                <p className='comic-caption'>{comic.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
