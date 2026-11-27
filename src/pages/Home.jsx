import Emoji from '../components/Emoji.jsx'
import { pages } from '../pages.js'

export default function Home() {
  return (
    <section className="home">
      <p className="team">Electrified Entrepreneurs</p>
      <h1 aria-label="GRiP AI">
        {[...'GRiP AI'].map((letter, n) => (
          <span key={n} className="bouncy-ch" style={{ '--n': n }} aria-hidden="true">
            {letter}
          </span>
        ))}
      </h1>
      <p className="subtitle">Girls in Robotics and Physical AI</p>
      <p className="tagline">Empowering girls to build, code, and control the physical future.</p>
      <ul className="big-buttons">
        {pages.map((page, index) => (
          <li key={page.id} style={{ '--i': index }}>
            <a className={page.color} href={`#/${page.id}`}>
              <Emoji name={page.emoji} />
              <span className="label">{page.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
