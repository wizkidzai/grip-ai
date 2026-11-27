// Emoji pictures from Google's Noto Emoji (see the credits in the footer).
// They are pictures, not emoji letters, so they look the same on every computer.
import heart from '../emoji/green-heart.svg' // 💚

const pictures = { heart }

// They only decorate: the words next to them say the same thing, so screen readers skip them.
export default function Emoji({ name, className = '' }) {
  return (
    <img
      className={`emoji ${className}`.trim()}
      src={pictures[name]}
      alt=""
      width="128"
      height="128"
      draggable="false"
    />
  )
}
