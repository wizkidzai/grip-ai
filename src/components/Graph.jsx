const points = [
  { label: 'Elementary school', value: 50, x: 110 },
  { label: 'College', value: 25.5, x: 280 },
  { label: 'Jobs', value: 9.4, x: 450 },
]

// 0% sits at the bottom (y = 230). Every 1% goes up 3.8 pixels, so 50% is near the top.
const y = (percent) => 230 - percent * 3.8

export default function Graph() {
  const line = points.map((p) => `${p.x},${y(p.value)}`).join(' ')
  return (
    <figure className="graph">
      <svg
        viewBox="0 0 540 290"
        role="img"
        aria-label="Line graph going down: about 50% in elementary school, 25.5% in college, and 9.4% in jobs."
      >
        {[0, 25, 50].map((tick) => (
          <g key={tick}>
            <line className="grid" x1="56" x2="520" y1={y(tick)} y2={y(tick)} />
            <text className="tick" x="48" y={y(tick) + 5} textAnchor="end">
              {tick}%
            </text>
          </g>
        ))}
        <polyline className="line" points={line} />
        {points.map((p) => (
          <g key={p.label}>
            <circle className="dot" cx={p.x} cy={y(p.value)} r="9" />
            <text className="value" x={p.x} y={y(p.value) - 18} textAnchor="middle">
              {p.value}%
            </text>
            <text className="step" x={p.x} y="264" textAnchor="middle">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
      <figcaption>
        <ul className="plain">
          <li>Elementary school: about half of kids are girls (50%).</li>
          <li>College: women earned 25.5% of engineering bachelor’s degrees in 2024.</li>
          <li>Jobs: women are 9.4% of electrical and electronics engineers (2024).</li>
        </ul>
      </figcaption>
    </figure>
  )
}
