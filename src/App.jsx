import { useEffect, useState } from 'react'

// Each app is a folder in src/apps/ with two files:
//   App.jsx  - the app itself
//   about.js - its name, emoji, and description
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

// The part of the address after "#/" picks the app, like ".../grip-ai/#/space-quiz"
function readPage() {
  return window.location.hash.replace(/^#\/?/, '')
}

export default function App() {
  const [page, setPage] = useState(readPage)
  useEffect(() => {
    const onChange = () => setPage(readPage())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  const app = apps.find((a) => a.id === page)

  return (
    <div className="site">
      <header>
        <a href="#/">GRiP</a> Girls in Robotics and Physical AI
      </header>
      <main>
        {app ? (
          <app.Component />
        ) : (
          <ul>
            {apps.map((a) => (
              <li key={a.id}>
                <a href={`#/${a.id}`}>{a.emoji} {a.name}</a>: {a.description}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
