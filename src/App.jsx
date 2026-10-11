import { useEffect, useState } from 'react'

// Find every app in src/apps automatically.
// Each app folder needs two files:
//   App.jsx  - the app itself
//   about.js - its name, emoji, description, and who made it
const appFiles = import.meta.glob('./apps/*/App.jsx', { eager: true })
const aboutFiles = import.meta.glob('./apps/*/about.js', { eager: true })

const apps = Object.keys(aboutFiles)
  .map((path) => {
    const id = path.split('/')[2]
    return {
      id,
      ...aboutFiles[path].default,
      Component: appFiles[`./apps/${id}/App.jsx`]?.default,
    }
  })
  .filter((app) => app.Component)
  .sort((a, b) => a.name.localeCompare(b.name))

// The part of the address after "#/" says which app to show.
// For example, ".../grip-ai/#/hello" shows the app in src/apps/hello.
function readPage() {
  return window.location.hash.replace(/^#\/?/, '')
}

function usePage() {
  const [page, setPage] = useState(readPage)
  useEffect(() => {
    const onChange = () => {
      setPage(readPage())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return page
}

function Home() {
  return (
    <>
      <section className="hero">
        <h1>Build, code, and control the physical future.</h1>
        <p>
          GRiP stands for Girls in Robotics and Physical AI. Try the apps and
          learning tools our team made!
        </p>
      </section>
      <section className="app-grid" aria-label="Apps">
        {apps.map((app) => (
          <a key={app.id} className="app-card" href={`#/${app.id}`}>
            <span className="app-emoji" aria-hidden="true">{app.emoji}</span>
            <h2>{app.name}</h2>
            <p>{app.description}</p>
            {app.madeBy && <p className="made-by">Made by {app.madeBy}</p>}
          </a>
        ))}
      </section>
    </>
  )
}

function NotFound() {
  return (
    <section className="hero">
      <h1>Oops! We couldn&apos;t find that page.</h1>
      <p><a href="#/">Go back home</a></p>
    </section>
  )
}

export default function App() {
  const page = usePage()
  const app = apps.find((a) => a.id === page)

  let content = <Home />
  if (app) content = <app.Component />
  else if (page) content = <NotFound />

  return (
    <div className="site">
      <header className="site-header">
        <a className="logo" href="#/">GRiP</a>
        <span className="tagline">Girls in Robotics and Physical AI</span>
      </header>
      <main>{content}</main>
      <footer className="site-footer">Made with care by the GRiP team.</footer>
    </div>
  )
}
