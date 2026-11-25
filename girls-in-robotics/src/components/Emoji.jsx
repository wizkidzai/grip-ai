// Emoji pictures from Google's Noto Emoji (see the credits in the footer).
// They are pictures, not emoji letters, so they look the same on every computer.
import camera from '../emoji/camera.svg' // 📷
import chart from '../emoji/chart.svg' // 📈
import gameController from '../emoji/game-controller.svg' // 🎮
import girl from '../emoji/girl.svg' // 👧
import globe from '../emoji/globe.svg' // 🌍
import heart from '../emoji/green-heart.svg' // 💚
import house from '../emoji/house.svg' // 🏠
import loveLetter from '../emoji/love-letter.svg' // 💌
import robotArm from '../emoji/robot-arm.svg' // 🦾

const pictures = { camera, chart, gameController, girl, globe, heart, house, loveLetter, robotArm }

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
