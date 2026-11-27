import { ArmPicture } from '../components/Pictures.jsx'
import { ARM_SIMULATOR } from '../links.js'

export default function Simulator() {
  return (
    <article>
      <h2 id="simulator-title" className="section-title">Try Our GRiP AI Arm Sim</h2>
      <p className="lead">
        A simulator is a pretend robot on a screen. It moves like the real one, so you can try things
        safely.
      </p>
      <div className="two-col">
        <figure className="card picture">
          <ArmPicture />
          <figcaption>
            <a className="button" href={ARM_SIMULATOR}>
              Open the arm simulator
            </a>
          </figcaption>
        </figure>
        <section className="card">
          <h3>All about our arm</h3>
          <details open>
            <summary>What is the SO-101?</summary>
            <p>
              The SO-101 is a small robot arm kit. We have two. The <strong>leader</strong> arm has a
              trigger handle, and you move it with your hand. The <strong>follower</strong> arm has
              gripper jaws, and it copies the leader. Each arm has 6 motors: base, shoulder, elbow,
              wrist tilt, wrist spin, and hand.
            </p>
          </details>
          <details>
            <summary>How we built it</summary>
            <ol className="plain">
              <li>We put the two arms together from the kit.</li>
              <li>We gave every motor its own number, 1 to 6, so the computer knows which is which.</li>
              <li>We plugged each arm into the computer with a USB board and its own power adapter.</li>
              <li>We calibrated the arms, so the computer knows the middle of every joint.</li>
              <li>We made an app with a pretend arm, so anyone can try it without a robot.</li>
            </ol>
          </details>
          <details>
            <summary>What can it do?</summary>
            <p>
              In the simulator, you drive a pretend arm with sliders and buttons. With the real arms,
              you move the leader and the follower copies you. You can record what you did and teach
              the follower to do the job by itself.
            </p>
          </details>
          <details>
            <summary>What is physical AI?</summary>
            <p>Physical AI is AI that can see, think, and move in the real world.</p>
          </details>
        </section>
      </div>
    </article>
  )
}
