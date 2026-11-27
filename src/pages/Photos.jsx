import Gallery from '../components/Gallery.jsx'

export default function Photos() {
  return (
    <article>
      <h2 id="photos-title" className="section-title">Gallery</h2>
      <p className="lead">Swipe sideways to see us in action! You can also use the arrow keys.</p>
      <Gallery />
    </article>
  )
}
