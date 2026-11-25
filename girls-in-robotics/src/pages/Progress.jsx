import { GirlAtLaptop } from '../components/Pictures.jsx'

const goals = [
  { id: 'events', label: 'Outreach events', done: 7, goal: 12, color: 'pink' },
  { id: 'girls', label: 'Girls reached', done: 223, goal: 500, color: 'blue' },
]

export default function Progress() {
  return (
    <article>
      <h1>Our progress</h1>
      <div className="two-col flip">
        <figure className="picture">
          <GirlAtLaptop />
        </figure>
        <section className="card">
          <h2>Our goals</h2>
          {goals.map((g) => (
            <div key={g.id} className={`goal ${g.color}`}>
              <div className="goal-head">
                <span id={`goal-${g.id}`}>{g.label}</span>
                <strong>
                  {g.done} of {g.goal}
                </strong>
              </div>
              <div
                className="bar"
                role="progressbar"
                aria-labelledby={`goal-${g.id}`}
                aria-valuemin={0}
                aria-valuemax={g.goal}
                aria-valuenow={g.done}
                aria-valuetext={`${g.done} of ${g.goal}`}
              >
                <div className="fill" style={{ width: `${(g.done / g.goal) * 100}%` }} />
              </div>
            </div>
          ))}
        </section>
      </div>
    </article>
  )
}
