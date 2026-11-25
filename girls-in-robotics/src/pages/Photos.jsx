import { useEffect, useState } from 'react'

export default function Photos() {
  const [photoUrl, setPhotoUrl] = useState('')
  const [problem, setProblem] = useState('')

  // Give the browser its memory back when the photo changes or when we leave this page.
  useEffect(() => {
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl)
    }
  }, [photoUrl])

  function pick(event) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setProblem('That is not a picture. Please pick a photo, like a .jpg or .png file.')
      return
    }
    setProblem('')
    setPhotoUrl(URL.createObjectURL(file))
  }

  return (
    <article>
      <h1>Photos</h1>
      <section className="card center">
        <p className="soon">Coming soon!</p>
        <p>Our photos will go here. Want to try it? Pick a photo from your device, and it shows up below.</p>
        <label className="button">
          Upload a photo
          <input className="sr-only" type="file" accept="image/*" onChange={pick} />
        </label>
        <p className="small">Your photo stays on your device. We do not save it or send it anywhere.</p>
        {problem && (
          <p className="problem" role="alert">
            {problem}
          </p>
        )}
        {photoUrl && <img className="preview" src={photoUrl} alt="The photo you picked" />}
      </section>
    </article>
  )
}
