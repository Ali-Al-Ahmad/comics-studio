import './Gallery.css'

const Gallery = () => {
  const comicsRow1 = [
    {
      id: 'comic1',
      image:
        'https://cdn-uploads.huggingface.co/production/uploads/noauth/MKjLZDJumVcjrK0HcjKOc.jpeg',
      caption: 'Captain America punching a giant octopus',
    },
    {
      id: 'comic2',
      image:
        'https://cdn-uploads.huggingface.co/production/uploads/noauth/PeK-MtQwvltH-OlnXtwwe.jpeg',
      caption: 'Iron Man vs Monkey King',
    },
    {
      id: 'comic3',
      image:
        'https://cdn-uploads.huggingface.co/production/uploads/noauth/FhRd_Gast7omVXwtikfoq.jpeg',
      caption: 'Batman as a computer hacker',
    },
  ]

  const comicsRow2 = [
    {
      id: 'comic4',
      image:
        'https://cdn-uploads.huggingface.co/production/uploads/noauth/N-Azz6mApVS3eMMSmTu-h.jpeg',
      caption: 'Zeus fights Hades',
    },
    {
      id: 'comic5',
      image:
        'https://cdn-uploads.huggingface.co/production/uploads/noauth/tkLJQj5NnD4P9idfw03IS.jpeg',
      caption: 'A llama discovering Paris',
    },
    {
      id: 'comic6',
      image:
        'https://cdn-uploads.huggingface.co/production/uploads/noauth/Bobl3XtiJcrrRLWmTJUGX.jpeg',
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
          {comicsRow1.map((comic) => (
            <div
              className='comic-card'
              key={comic.id}
            >
              <img
                src={comic.image}
                alt={comic.caption}
                className='comic-image'
              />
              <div className='comic-info'>
                <p className='comic-caption'>{comic.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='comics-grid'>
          {comicsRow2.map((comic) => (
            <div
              className='comic-card'
              key={comic.id}
            >
              <img
                src={comic.image}
                alt={comic.caption}
                className='comic-image'
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
