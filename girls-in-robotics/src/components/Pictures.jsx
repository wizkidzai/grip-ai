// Drawings, not photos: our rules say no photos of faces.
// Every part is drawn twice: a darker copy a little lower makes the 3D edge.

export function GirlAtLaptop() {
  return (
    <svg
      viewBox="0 0 320 240"
      role="img"
      aria-label="Drawing of a girl with a ponytail working on a laptop. A little robot arm sits on her desk."
    >
      <rect width="320" height="240" rx="28" fill="#e4f7ec" />
      <rect x="40" y="200" width="14" height="32" fill="#dcae7d" />
      <rect x="266" y="200" width="14" height="32" fill="#dcae7d" />
      <rect x="20" y="190" width="280" height="16" rx="8" fill="#dcae7d" />
      <rect x="20" y="184" width="280" height="16" rx="8" fill="#f2cfa3" />
      <path d="M192 70c34 0 44 34 24 58-4-16-12-26-26-32z" fill="#4a2f22" />
      <path d="M96 186c0-46 28-68 64-68s64 22 64 68z" fill="#ffb3d1" />
      <rect x="150" y="98" width="20" height="26" rx="8" fill="#c68a5c" />
      <circle cx="160" cy="78" r="32" fill="#c68a5c" />
      <path d="M126 80c-6-36 22-50 42-44 22 6 30 26 26 46-8-20-22-28-38-28-14 0-26 8-30 26z" fill="#4a2f22" />
      <circle cx="194" cy="66" r="7" fill="#fff0a3" />
      <rect x="112" y="144" width="96" height="48" rx="8" fill="#7f9bc7" />
      <rect x="112" y="138" width="96" height="48" rx="8" fill="#9fb8e0" />
      <circle cx="160" cy="162" r="7" fill="#fff" />
      <rect x="236" y="172" width="36" height="12" rx="4" fill="#a98fe8" />
      <path d="M254 172v-28l20-14" fill="none" stroke="#a98fe8" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="276" cy="128" r="7" fill="#fff0a3" stroke="#e4c34c" strokeWidth="3" />
    </svg>
  )
}

export function ArmPicture() {
  return (
    <svg
      viewBox="0 0 320 240"
      role="img"
      aria-label="Drawing of our robot arm: a base, two long arm parts with round joints, and a gripper that opens and closes."
    >
      <rect width="320" height="240" rx="28" fill="#e4f7ec" />
      <ellipse cx="160" cy="208" rx="124" ry="22" fill="none" stroke="#a9e3bf" strokeWidth="4" />
      <ellipse cx="160" cy="208" rx="72" ry="12" fill="none" stroke="#a9e3bf" strokeWidth="4" />
      <rect x="116" y="190" width="88" height="22" rx="10" fill="#b9c4be" />
      <rect x="116" y="184" width="88" height="22" rx="10" fill="#fff" />
      <rect x="148" y="148" width="24" height="42" rx="9" fill="#a98fe8" />
      <rect x="148" y="142" width="24" height="42" rx="9" fill="#dccaff" />
      <path d="M160 142 118 90" stroke="#e47aa2" strokeWidth="20" strokeLinecap="round" transform="translate(0 6)" />
      <path d="M160 142 118 90" stroke="#ffc3da" strokeWidth="20" strokeLinecap="round" />
      <path d="M118 90 198 62" stroke="#6fa9e8" strokeWidth="18" strokeLinecap="round" transform="translate(0 6)" />
      <path d="M118 90 198 62" stroke="#bddcff" strokeWidth="18" strokeLinecap="round" />
      <path d="M206 58l24-12M206 68l26 8" stroke="#e4c34c" strokeWidth="8" strokeLinecap="round" transform="translate(0 4)" />
      <path d="M206 58l24-12M206 68l26 8" stroke="#fff0a3" strokeWidth="8" strokeLinecap="round" />
      <circle cx="160" cy="148" r="12" fill="#e4c34c" />
      <circle cx="160" cy="142" r="12" fill="#fff0a3" />
      <circle cx="118" cy="96" r="11" fill="#e4c34c" />
      <circle cx="118" cy="90" r="11" fill="#fff0a3" />
      <circle cx="198" cy="68" r="10" fill="#e4c34c" />
      <circle cx="198" cy="62" r="10" fill="#fff0a3" />
    </svg>
  )
}
