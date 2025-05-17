import { Icon } from '@iconify-icon/react'
import './FeaturesOverview.css'

const FeaturesOverview = () => {
  const features = [
    {
      icon: 'mdi:magic-wand',
      title: 'Effortless Comic Generation',
      description:
        'Generate comics with ease by simply describing the characters, styles and scenes. No drawing skills required!',
    },
    {
      icon: 'mdi:palette',
      title: 'Diverse Comic Styles',
      description:
        'Choose from a wide range of comic styles, including American, Japanese, Nihonga, and more, to give your comics a unique look and feel.',
    },
    {
      icon: 'mdi:view-grid',
      title: 'Varied Layout Options',
      description:
        'Select from a range of layouts for your generated images, with more options coming soon.',
    },
    {
      icon: 'mdi:text',
      title: 'Captivating Captions',
      description:
        'Enhance your comics with captions that add context to each panel. Control the narrative with descriptive text.',
    },
    {
      icon: 'mdi:refresh',
      title: 'Redraw Image',
      description:
        "If you're not satisfied with the initial result, this feature allows you to start over and create a new version from scratch.",
    },
    {
      icon: 'mdi:pencil',
      title: 'Edit Prompt',
      description:
        "You can easily modify or refine prompt, allowing you to fine-tune the AI's response to better match your creative vision.",
    },
  ]

  return (
    <section
      id='features-overview'
      className='features-overview-section'
    >
      <h2 className='features-overview-title'>
        Everything You Need For Comic Creation
      </h2>
      <p className='features-overview-subtitle'>
        Powerful AI tools to bring your comic ideas to life
      </p>

      <div className='features-overview-grid'>
        {features.map((feature, index) => (
          <div
            className='feature-overview-card'
            key={index}
          >
            <div className='feature-overview-icon'>
              <Icon icon={feature.icon} />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesOverview
