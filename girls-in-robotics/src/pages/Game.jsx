import Emoji from '../components/Emoji.jsx'

export default function Game() {
  return (
    <article>
      <h1>Game</h1>
      <section className="card center">
        <Emoji name="globe" className="globe" />
        <p className="soon">Coming soon!</p>
        <p>
          We are making an interactive game. It will take you around the world and teach you about
          girls in robotics and physical AI.
        </p>
      </section>
    </article>
  )
}
