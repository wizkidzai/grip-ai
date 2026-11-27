import { pages } from '../pages.js'

export default function Nav() {
  return (
    <nav className="nav" aria-label="Sections">
      <ul>
        {pages.map((page) => (
          <li key={page.id}>
            <a href={`#${page.id}`}>{page.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
