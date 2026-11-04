import './what-is-physical-ai.css'

// The 3 steps every physical AI uses, again and again.
const steps = [
  {
    emoji: '👀',
    name: 'Perception',
    meaning: 'Sensing the world',
    explain: 'Cameras, microphones, and touch sensors are like eyes, ears, and skin.',
    example: 'The robot vacuum feels a wall in front of it.',
  },
  {
    emoji: '🧠',
    name: 'Reasoning',
    meaning: 'Deciding what to do',
    explain: 'The AI is like a brain. It thinks about what it sensed and picks a plan.',
    example: 'It decides: "Turn left!"',
  },
  {
    emoji: '🦾',
    name: 'Action',
    meaning: 'Doing it',
    explain: 'Motors are like muscles. They move wheels, arms, and grippers.',
    example: 'Its wheels turn it left, and it keeps cleaning.',
  },
]

export default function App() {
  return (
    <div className="physical-ai">
      <h1>What is physical AI?</h1>
      <p className="physical-ai-intro">
        Physical AI is <strong>AI that can see, think, and move by itself</strong>. Some AI lives
        only on a screen, like a chatbot. Physical AI has a body, so it can do things in the real
        world.
      </p>

      <section className="physical-ai-card">
        <h2>The 3 steps</h2>
        <p>Every physical AI does these 3 steps, over and over:</p>
        <ol className="three-steps">
          {steps.map((step, i) => (
            <li key={step.name} className="step-card">
              <span className="step-emoji" aria-hidden="true">
                {step.emoji}
              </span>
              <span className="step-number">Step {i + 1}</span>
              <h3>{step.name}</h3>
              <p className="step-meaning">{step.meaning}</p>
              <p>{step.explain}</p>
              <p className="step-example">
                <span aria-hidden="true">🧹 </span>
                {step.example}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="physical-ai-card">
        <h2>Physical AI around us</h2>
        <div className="picture-row">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="picture-coming-soon">
              Picture coming soon
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
