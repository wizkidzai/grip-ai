import { useEffect, useState } from 'react'

// Each app is a folder in src/apps/ with two files:
//   App.jsx  - the app itself
//   about.js - its name, emoji, description, and order (where its button goes)
// This finds them all, so nobody has to add their app to a list.
const appFiles = import.meta.glob('./apps/*/App.jsx', { eager: true })
const aboutFiles = import.meta.glob('./apps/*/about.js', { eager: true })
const apps = Object.keys(aboutFiles)
  .map((path) => {
    const id = path.split('/')[2]
    const Component = appFiles[`./apps/${id}/App.jsx`]?.default
    return { id, ...aboutFiles[path].default, Component }
  })
  .filter((app) => app.Component)
  // Smaller order numbers come first. Apps with no order go at the end.
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))

// The part of the address after "#/" picks the app, like ".../grip-ai/#/space-quiz"
function readPage() {
  return window.location.hash.replace(/^#\/?/, '')
}

export default function App() {
  const [page, setPage] = useState(readPage)
  useEffect(() => {
    const onChange = () => {
      setPage(readPage())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  const app = apps.find((a) => a.id === page)

  return (
    <div className="site">
      {/* The menu bar is on every page, so visitors can jump anywhere in one click. */}
      <nav className="menu-bar" aria-label="Menu">
        <a href="#/" aria-current={app ? undefined : 'page'}>
          🏠 Home
        </a>
        {apps.map((a) => (
          <a key={a.id} href={`#/${a.id}`} aria-current={a.id === page ? 'page' : undefined}>
            {a.emoji} {a.name}
          </a>
        ))}
      </nav>
      <main>
        {app ? (
          <app.Component />
        ) : (
          <div className="home">
            <div className="banner">
              <p className="team-name">Electrified Entrepreneurs</p>
              <h1>
                <span aria-hidden="true">🤖 </span>Girls in Robotics and Physical AI
                <span aria-hidden="true"> 🦾</span>
              </h1>
              <p className="subtitle">Outreach Website</p>
            </div>
            <div className="home-buttons">
              {apps.map((a) => (
                <a key={a.id} className="home-button" href={`#/${a.id}`}>
                  <span className="home-button-emoji" aria-hidden="true">
                    {a.emoji}
                  </span>
                  <span className="home-button-name">{a.name}</span>
                  <span className="home-button-description">{a.description}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
