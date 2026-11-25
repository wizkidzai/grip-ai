import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Game from './pages/Game.jsx'
import Photos from './pages/Photos.jsx'
import Progress from './pages/Progress.jsx'
import Simulator from './pages/Simulator.jsx'

// The menu bar and the big round buttons on the home page are both made from this list.
// Each page has an emoji picture (see components/Emoji.jsx) and a color (pink, peach, yellow,
// green, blue, or purple). To add a page: make a file in src/pages/, then add one line here.
export const pages = [
  { id: 'about', label: 'About our topic', emoji: 'girl', color: 'pink', Component: About },
  { id: 'progress', label: 'Our progress', emoji: 'chart', color: 'peach', Component: Progress },
  { id: 'simulator', label: 'GRiP AI Simulator', emoji: 'robotArm', color: 'yellow', Component: Simulator },
  { id: 'photos', label: 'Photos', emoji: 'camera', color: 'green', Component: Photos },
  { id: 'game', label: 'Game', emoji: 'gameController', color: 'blue', Component: Game },
  { id: 'contact', label: 'Contact us', emoji: 'loveLetter', color: 'purple', Component: Contact },
]
