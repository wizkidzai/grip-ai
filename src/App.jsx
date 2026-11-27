import { useEffect, useRef, useState } from 'react'
import Emoji from './components/Emoji.jsx'
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'
import { pages } from './pages.js'

// The part of the address after "#/" picks the page, like ".../grip-ai/#/contact"
function readPage() {
  return window.location.hash.replace(/^#\/?/, '')
}

export default function App() {
  const [pageId, setPageId] = useState(readPage)
  const main = useRef(null)
  const firstLook = useRef(true)

  useEffect(() => {
    const onChange = () => setPageId(readPage())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const page = pages.find((p) => p.id === pageId)

  useEffect(() => {
    document.title = page ? `${page.label} | GRiP AI` : 'GRiP AI: Girls in Robotics and Physical AI'
    // After the first page, go to the top and tell screen readers the page changed.
    if (firstLook.current) {
      firstLook.current = false
      return
    }
    window.scrollTo(0, 0)
    main.current?.focus()
  }, [page])

  return (
    <div className="site">
      <header className="top">
        <Nav current={page ? page.id : ''} />
      </header>
      <main id="main" ref={main} tabIndex={-1} className={page ? page.color : undefined}>
        {page ? <page.Component /> : <Home />}
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
