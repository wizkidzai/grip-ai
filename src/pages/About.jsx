import Graph from '../components/Graph.jsx'

const SWE_FACTS = 'https://swe.org/wp-content/uploads/2026/10/SWE-US-FastFacts-2026-2.pdf'

export default function About() {
  return (
    <article>
      <p className="eyebrow">Electrified Entrepreneurs · Girls in Robotics and Physical AI</p>
      <h1 className="site-title">GRiP AI Website</h1>
      <h2 id="about-title" className="section-title">Our Mission</h2>
      <p className="intro">Empowering girls to build, code, and control the physical future.</p>
      <p className="lead">We noticed that fewer girls are in robotics and physical AI as they get older.</p>
      <div className="two-col">
        <section className="card">
          <h3>Fewer girls at every step</h3>
          <Graph />
          <p className="small">
            The college and jobs numbers come from the Society of Women Engineers,{' '}
            <a href={SWE_FACTS} target="_blank" rel="noopener noreferrer">
              U.S. Fast Facts 2026 (PDF)
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
        </section>
        <aside className="card">
          <h3>More about it</h3>
          <ul className="plain">
            <li>Physical AI is AI that can see, think, and move in the real world, like a robot arm.</li>
            <li>When fewer girls try robotics, fewer girls get to build the robots of the future.</li>
            <li>We are the Electrified Entrepreneurs. We want every girl to know robotics is for her!</li>
          </ul>
        </aside>
      </div>
    </article>
  )
}
