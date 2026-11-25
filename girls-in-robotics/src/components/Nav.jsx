import { pages } from '../pages.js'
import Emoji from './Emoji.jsx'

export default function Nav({ current }) {
  const links = [{ id: '', label: 'Home', emoji: 'house', color: 'green' }, ...pages]
  return (
    <nav className="nav" aria-label="Main menu">
      <ul>
        {links.map((link) => (
          <li key={link.id} className={link.color}>
            <a href={`#/${link.id}`} aria-current={link.id === current ? 'page' : undefined}>
              <Emoji name={link.emoji} />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
