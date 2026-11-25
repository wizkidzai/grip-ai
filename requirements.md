# Requirements: our new features

This is our team's list of new features: what we want to build, who it's for, and why.
Before building something the website can't do yet, plan it with `skills/shared/plan-a-feature/SKILL.md`.
We always plan in this order: **who** it's for → **what** they need → **why** → **how** we'll
build it. That skill adds the plan to the bottom of this file.

Bug fixes, tweaks, and small look-and-feel changes don't go here.

**Status:** Planned → Building → Done

---

## GRiP AI outreach website
- **Status:** Done
- **Asked by:** Prisha, 2026-11-24
- **Who it's for:** Girls aged 10–13, and people of all ages.
- **Problem or need:** They don't see many other girls in robotics, so it feels like it's not for them.
- **Why they have it:** Fewer girls stay at each step. About half of kids are girls, but women earned only
  25.5% of engineering bachelor's degrees in 2024, and only 9.4% of electrical and electronics
  engineers are women. Source: [Society of Women Engineers, U.S. Fast Facts 2026](https://swe.org/wp-content/uploads/2026/10/SWE-US-FastFacts-2026-2.pdf).
  (We first wrote 24% for college, but this source says 25.5%, so we use the source's number.)
- **Our idea:** A fun, light green pastel outreach website by the Electrified Entrepreneurs, with its own
  link: https://wizkidzai.github.io/grip-ai/girls-in-robotics/. It uses a cute round font (Fredoka). A
  menu bar on every page:
  - **Home:** "Electrified Entrepreneurs", "GRiP AI", and 6 big round 3D buttons, in this order and
    color: About our topic (pink 👧), Our progress (peach 📈), GRiP AI Simulator (yellow, the robot
    bicep 🦾), Photos (green 📷), Game (blue 🎮), Contact us (purple 💌). Each button has its name and
    an emoji picture inside, and a darker edge that makes it look 3D.
  - **About our topic:** "We noticed fewer girls in robotics and physical AI", a graph going down
    (elementary 50% → college 25.5% → jobs 9.4%) with its sources, and a "more about" box.
  - **Our progress:** goal bars (Outreach events 7 of 12, Girls reached 223 of 500) and a drawing of a
    girl at a laptop (a drawing, because we don't use photos of faces).
  - **GRiP AI Simulator:** a picture of the arm, a button that opens our arm simulator, and a
    drop-down about the SO-101 and how we built it.
  - **Photos:** a gallery of 13 photos from our events that visitors scroll through (swipe, or use
    the arrow buttons). No upload button. These photos show faces: Prisha said a grown-up and the
    parents OK'd them, and the pull request asks the reviewing grown-up to confirm (rule 3).
  - **Game:** "Coming soon!" for now. The real world-tour game gets planned on its own, next.
  - **Contact us:** a button that opens our Google Form (student leader or mentor sign-up), and
    "Learn more about our mission!" with a link to our mission website.
- **Other ideas we talked about:**
  - Add these pages to the outreach website in pull request #4: we chose a brand-new website with its
    own link, so both can live side by side.
  - Build the real game now: it's big, so we plan it next as its own feature.
- **User flow:**
  1. The visitor opens the website and sees the home page with 6 big buttons.
  2. They click **About our topic**, read about the problem, and look at the graph going down.
  3. They click **Our progress** and see how far our goals have come.
  4. They click **GRiP AI Simulator**, open the arm simulator, and read about the SO-101 in the drop-down.
  5. They click **Photos** and scroll through the photos with the arrow buttons or by swiping.
  6. They click **Game** and see that it's coming soon.
  7. They click **Contact us**, then open the Google Form to sign up as a student leader or mentor,
     or follow the link to learn more about our mission.
  8. From any page, the menu bar takes them to any other page, or back home.
- **Done when:**
  - [x] I open the website, see 6 buttons, and each one opens the right page.
  - [x] On every page, the menu bar takes me to any other page, or home.
  - [x] On Contact us, the button opens our Google Form.
