import { useRef, useState } from 'react'
import { photos } from '../photos.js'

// A row of photos you can scroll (swipe, or use the arrow buttons). Each photo snaps into place.
export default function Gallery() {
  const track = useRef(null)
  const [now, setNow] = useState(0)

  function go(step) {
    const el = track.current
    const next = Math.min(photos.length - 1, Math.max(0, now + step))
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
  }

  function onScroll(event) {
    const el = event.currentTarget
    setNow(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <section className="gallery" aria-roledescription="carousel" aria-label="Photo gallery">
      <div className="gallery-track" ref={track} onScroll={onScroll} tabIndex={0}>
        {photos.map((photo, index) => (
          <figure
            key={photo.src}
            className="slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`Photo ${index + 1} of ${photos.length}`}
          >
            <img src={photo.src} alt={photo.alt} loading={index < 2 ? 'eager' : 'lazy'} />
          </figure>
        ))}
      </div>
      <div className="gallery-bar">
        <button type="button" className="button pink" onClick={() => go(-1)} disabled={now === 0}>
          <span aria-hidden="true">◀</span>
          <span className="sr-only">Previous photo</span>
        </button>
        <p aria-live="polite">
          Photo {now + 1} of {photos.length}
        </p>
        <button
          type="button"
          className="button blue"
          onClick={() => go(1)}
          disabled={now === photos.length - 1}
        >
          <span aria-hidden="true">▶</span>
          <span className="sr-only">Next photo</span>
        </button>
      </div>
    </section>
  )
}
