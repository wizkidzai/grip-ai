import './about-our-topic.css'

// The numbers for the graph. Each one comes from a source listed under the graph.
const steps = [
  { label: 'Kids', percent: 50, note: 'of kids are girls' },
  { label: 'College', percent: 24, note: 'of engineering college degrees go to women' },
  {
    label: 'Jobs',
    percent: 9,
    note: 'of electrical and electronics engineers are women. They build the circuits that make robots move!',
  },
]

// Sizes for the graph drawing, in "SVG units" (like tiny pixels that grow and shrink).
const width = 300
const height = 220
const top = 30
const bottom = 190
const left = 50
const right = 270

function pointFor(index, percent) {
  const x = left + (index * (right - left)) / (steps.length - 1)
  const y = bottom - (percent / 50) * (bottom - top)
  return { x, y }
}

function DropGraph() {
  const points = steps.map((step, i) => pointFor(i, step.percent))
  return (
    <svg
      className="drop-graph"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="A line going down: about 50% of kids are girls, but only 24% of engineering college degrees and 9% of electrical and electronics engineering jobs go to women."
    >
      <line x1={left} y1={bottom} x2={right} y2={bottom} className="drop-graph-axis" />
      <polyline points={points.map((p) => `${p.x},${p.y}`).join(' ')} className="drop-graph-line" />
      {steps.map((step, i) => (
        <g key={step.label}>
          <circle cx={points[i].x} cy={points[i].y} r="7" className="drop-graph-dot" />
          <text x={points[i].x} y={points[i].y - 14} textAnchor="middle" className="drop-graph-percent">
            {step.percent}%
          </text>
          <text x={points[i].x} y={bottom + 22} textAnchor="middle" className="drop-graph-label">
            {step.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default function App() {
  return (
    <div className="topic">
      <h1>About our topic</h1>
      <p className="topic-intro">
        Lots of girls love building and coding when they're little. But as they grow up, many
        stop. Most people don't know this is happening. Here's what happens:
      </p>

      <section className="topic-card">
        <h2>📉 The drop</h2>
        <div className="topic-drop">
          <DropGraph />
          <ol className="stat-cards">
            {steps.map((step) => (
              <li key={step.label} className="stat-card">
                <span className="stat-card-label">{step.label}</span>
                <span className="stat-card-number">{step.percent}%</span>
                <span>{step.note}</span>
              </li>
            ))}
          </ol>
        </div>
        <p className="topic-sources">
          Sources:{' '}
          <a href="https://swe.org/research/2026/women-in-engineering-fast-facts/" target="_blank" rel="noreferrer">
            Society of Women Engineers, Fast Facts 2025
          </a>{' '}
          and{' '}
          <a href="https://www.firstinspires.org/about/impact" target="_blank" rel="noreferrer">
            FIRST Robotics Impact (Brandeis University study)
          </a>
        </p>
      </section>

      <div className="topic-pair">
        <section className="topic-card">
          <h2>🌟 Good news</h2>
          <p>
            Trying robotics really helps! About <strong>half</strong> of the girls who did FIRST
            Robotics in school chose to study engineering or computer science in college.
          </p>
        </section>

        <section className="topic-card">
          <h2>💡 Our solution</h2>
          <p>The Electrified Entrepreneurs help more girls try robotics:</p>
          <ul className="solution-list">
            <li>🎉 We hold fun events where girls build and code real robots.</li>
            <li>🧑‍🏫 We find mentors to help them.</li>
            <li>🌐 We made this website, so more people know.</li>
          </ul>
          <div className="picture-coming-soon">Picture coming soon</div>
        </section>
      </div>

      <section className="what-can-you-do">
        <h2>🙋 What can you do?</h2>
        <ul>
          <li>Invite a girl you know to try robotics!</li>
          <li>Tell a friend what you learned on this page.</li>
        </ul>
      </section>
    </div>
  )
}
