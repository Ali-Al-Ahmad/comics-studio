import { Link } from 'react-router-dom'
import './FeatureDetails.css'

const FeatureDetails = () => {
  const features = [
    {
      id: 'character-consistency',
      title: 'Consistent Characters Across Every Frame',
      description:
        "Harness the power of AI to maintain character consistency throughout your stories. Enhance your narrative with visuals that keep true to your characters' essence, ensuring a coherent visual experience from start to finish.",
      image: 'https://imgc.cc/2024/05/05/6637517f61c22.jpg',
      imageAlt: 'Consistent character',
      reversed: false,
    },
    {
      id: 'personalized-story',
      title: 'Upload Your Images, Personalize Your Story',
      description:
        'Personalize your visual stories by uploading reference images. Integrate your own characters and settings into the narrative, creating unique and compelling stories with visuals that speak directly to your audience.',
      image: 'https://imgc.cc/2024/05/05/66375076e1110.png',
      imageAlt: 'Reference',
      reversed: true,
    },
    {
      id: 'single-panel',
      title: 'Create Stunning Single-Panel Comics Instantly',
      description:
        'Comics Studio empowers you to design high-quality single-panel comics with ease. Whether for storytelling, branding, or entertainment, create visuals that captivate and communicate your ideas effectively.',
      image:
        'https://imagedelivery.net/X26-mmRvk4CuiCyo9bU9tw/76d58fc1-09d6-4c75-6f83-9f6f84dd0100/public',
      imageAlt: 'Single-panel creation',
      reversed: false,
    },
  ]

  return (
    <section
      id='feature-details'
      className='feature-details-section'
    >
      {features.map((feature) => (
        <div
          key={feature.id}
          className={`feature-container ${feature.reversed ? 'reverse' : ''}`}
        >
          {feature.reversed ? (
            <>
              <div className='feature-image'>
                <img
                  src={feature.image}
                  alt={feature.imageAlt}
                />
              </div>
              <div className='feature-text'>
                <h2 className='section-title'>{feature.title}</h2>
                <p className='section-description'>{feature.description}</p>
                <Link
                  to='/register'
                  className='btn btn-primary'
                >
                  Try Comics Studio for Free
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className='feature-text'>
                <h2 className='section-title'>{feature.title}</h2>
                <p className='section-description'>{feature.description}</p>
                <Link
                  to={
                    feature.id === 'single-panel'
                      ? '/comics-gallery'
                      : '/register'
                  }
                  className='btn btn-primary'
                >
                  {feature.id === 'single-panel'
                    ? 'Learn More About Comics Studio'
                    : 'Try Comics Studio for Free'}
                </Link>
              </div>
              <div className='feature-image'>
                <img
                  src={feature.image}
                  alt={feature.imageAlt}
                />
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  )
}

export default FeatureDetails
