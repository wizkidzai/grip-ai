import { useState } from 'react'
import './hello.css'

// An example app. Copy this folder to start a new app.
export default function HelloRobot() {
  const [waves, setWaves] = useState(0)

  return (
    <section className="hello">
      <h1>Hello, Robot!</h1>
      <div
        className={waves % 2 === 1 ? 'hello-robot waving' : 'hello-robot'}
        role="img"
        aria-label="A friendly robot"
      >
        🤖
      </div>
      <p>The robot has waved {waves} {waves === 1 ? 'time' : 'times'}.</p>
      <button onClick={() => setWaves(waves + 1)}>Wave hello</button>
      <p><a href="#/">Back to all apps</a></p>
    </section>
  )
}
