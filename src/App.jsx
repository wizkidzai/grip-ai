import { useEffect } from 'react'
import Emoji from './components/Emoji.jsx'
import Nav from './components/Nav.jsx'
import { pages } from './pages.js'

export default function App() {
  useEffect(() => {
    function followOldLink() {
      if (!window.location.hash.startsWith('#/')) return
      const id = window.location.hash.slice(2)
      const section = document.getElementById(id)
      const hash = section ? `#${id}` : ''
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${hash}`)
      section?.scrollIntoView()
    }

    followOldLink()
    window.addEventListener('hashchange', followOldLink)
    return () => window.removeEventListener('hashchange', followOldLink)
  }, [])

  return (
    <div className="site">
      <a className="skip" href="#main">Skip to content</a>
      <header className="top">
        <div className="top-inner">
          <a className="brand" href="#about" aria-label="GRiP AI, Our Mission">GRiP AI</a>
          <Nav />
        </div>
      </header>
      <main id="main">
        {pages.map((page) => (
          <section className="page-section" id={page.id} key={page.id} aria-labelledby={`${page.id}-title`}>
            <page.Component />
          </section>
        ))}
      </main>
      <footer>
        <p>
          Made by the Electrified Entrepreneurs <Emoji name="heart" className="heart" />
        </p>
        <p>GRiP: Girls in Robotics and Physical AI</p>
        <p className="credits">
          Emoji pictures:{' '}
          <a href={`${import.meta.env.BASE_URL}licenses/noto-emoji-OFL.txt`}>Noto Emoji by Google</a>.
        </p>
      </footer>
    </div>
  )
}
