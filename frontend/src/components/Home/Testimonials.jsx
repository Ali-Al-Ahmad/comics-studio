import './Testimonials.css'

const Testimonials = () => {
  const testimonials = [
    {
      id: 't1',
      text: "I absolutely adore Comics Studio! It has rekindled my passion for creating comics. The way it brings my ideas to life is truly remarkable. I can't imagine my creative process without it.",
      author: 'Sarah Johnson',
      handle: '@SarahCreatesComics',
    },
    {
      id: 't2',
      text: "Comics Studio is my go-to tool for comic creation. Its ability to turn my text descriptions into beautiful comic panels is pure magic. It's like having a skilled illustrator at my fingertips.",
      author: 'Alex Turner',
      handle: '@ComicGeekAlex',
    },
    {
      id: 't3',
      text: "I've been a comic enthusiast for years, and Comics Studio has revolutionized the way I create comics. The variety of styles and layouts, along with the freedom to edit prompt, makes it an essential tool for any comic artist.",
      author: 'Michael Rodriguez',
      handle: '@ComicArtMike',
    },
    {
      id: 't4',
      text: 'As an educator, I use Comics Studio to create engaging visual content for my students. The intuitive interface and diverse style options make it perfect for educational storytelling. My students love the comics we create!',
      author: 'Emily Chen',
      handle: '@TeachWithComics',
    },
  ]
  return (
    <section
      id='testimonials'
      className='testimonials-section'
    >
      <div className='testimonials-header'>
        <h2 className='testimonials-title'>User Love and Appreciation</h2>
        <h3 className='testimonials-subtitle'>
          Hear What Our Users Adore About AI Comics Studio
        </h3>
      </div>
      <div className='testimonials-container'>
        {testimonials.map((testimonial) => (
          <div
            className='testimonial-card'
            key={testimonial.id}
          >
            <div className='testimonial-quote'>❝</div>
            <p className='testimonial-text'>{testimonial.text}</p>
            <div className='testimonial-user'>
              <img
                src={`https://ui-avatars.com/api/?name=${testimonial.author.replace(
                  /\s+/g,
                  '+'
                )}&background=7063F1&color=fff`}
                alt={testimonial.author}
                className='testimonial-avatar'
              />
              <div className='testimonial-info'>
                <p className='testimonial-author'>{testimonial.author}</p>
                <p className='testimonial-handle'>{testimonial.handle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
