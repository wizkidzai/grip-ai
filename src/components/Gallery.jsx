import { photos } from '../photos.js'

export default function Gallery() {
  return (
    <div
      className="gallery-track"
      role="region"
      aria-label="Photo gallery. Scroll sideways to see more photos."
      tabIndex={0}
    >
      {photos.map((photo, index) => (
        <figure key={photo.src} className="slide">
          <img src={photo.src} alt={photo.alt} loading={index < 2 ? 'eager' : 'lazy'} />
          <figcaption>{index + 1} / {photos.length}</figcaption>
        </figure>
      ))}
    </div>
  )
}
