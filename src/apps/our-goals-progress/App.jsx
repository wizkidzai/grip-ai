import './our-goals-progress.css'

// Update these numbers when the team makes progress!
//   goal = what we want to reach
//   done = how far we have gotten so far
const goals = [
  { emoji: '🎉', name: 'Events', goal: 12, done: 5 },
  { emoji: '👋', name: 'People', goal: 1000, done: 223 },
  { emoji: '🌐', name: 'Digital impact', goal: 1000, done: 0 },
  { emoji: '🧑‍🏫', name: 'Mentors', goal: 3, done: 0, note: '2 women, 1 man' },
  { emoji: '🤝', name: 'Partners outside the team', goal: 5, done: 0 },
]

export default function App() {
  return (
    <div className="goals">
      <h1>Our goals + progress</h1>
      <p className="goals-intro">
        Here's what the Electrified Entrepreneurs want to do, and how far we've gotten so far.
      </p>

      <section className="goals-card">
        <div className="goals-header" aria-hidden="true">
          <span>Goals</span>
          <span>Progress</span>
        </div>
        <ul className="goals-list">
          {goals.map((g) => {
            const percent = Math.min(100, Math.round((g.done / g.goal) * 100))
            return (
              <li key={g.name} className="goal-row">
                <div className="goal-name">
                  <span className="goal-emoji" aria-hidden="true">
                    {g.emoji}
                  </span>
                  <span>
                    <strong>{g.name}</strong>
                    <span className="goal-target">
                      Goal: {g.goal.toLocaleString()}
                      {g.note && ` (${g.note})`}
                    </span>
                  </span>
                </div>
                <div className="goal-progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-label={`${g.name} progress`}
                    aria-valuemin={0}
                    aria-valuemax={g.goal}
                    aria-valuenow={g.done}
                    aria-valuetext={`${g.done.toLocaleString()} of ${g.goal.toLocaleString()}`}
                  >
                    <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
                  </div>
                  <span className="goal-count">
                    <strong>{g.done.toLocaleString()}</strong> of {g.goal.toLocaleString()}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
