import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Photos from './pages/Photos.jsx'
import Progress from './pages/Progress.jsx'
import Simulator from './pages/Simulator.jsx'

// The menu and the sections on the page share this list.
export const pages = [
  { id: 'about', label: 'Our Mission', Component: About },
  { id: 'progress', label: 'Our Progress', Component: Progress },
  { id: 'simulator', label: 'Try Our GRiP AI Arm Sim', Component: Simulator },
  { id: 'photos', label: 'Gallery', Component: Photos },
  { id: 'contact', label: 'Join Us', Component: Contact },
]
