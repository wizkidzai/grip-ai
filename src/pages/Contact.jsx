import { MISSION_SITE, SIGN_UP_FORM } from '../links.js'

export default function Contact() {
  return (
    <article>
      <h2 id="contact-title" className="section-title">Join Us</h2>
      <div className="stack">
        <section className="card center">
          <h3>Want to be a student leader or a mentor?</h3>
          <p>Sign up with our Google Form. It opens in a new tab.</p>
          <a className="button" href={SIGN_UP_FORM} target="_blank" rel="noopener noreferrer">
            Sign up here
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <p className="small">Kids: please ask a grown-up before you fill in a form.</p>
        </section>
        <section className="card center mission">
          <h3>Learn more about our mission!</h3>
          <a className="button green" href={MISSION_SITE} target="_blank" rel="noopener noreferrer">
            Visit our mission website
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </section>
      </div>
    </article>
  )
}
