# GRiP-AI: guide for AI helpers

## About this project
This is the website for GRiP: Girls in Robotics and Physical AI. A team of kids is building it,
with help from AI tools and a grown-up mentor. The site holds small apps and learning tools that
help girls build, code, and control robots and other real-world machines.

## Who you are helping
You are helping kids aged 8–13 who are learning to build with AI.
- Use short sentences and simple words. Explain any new word the first time you use it.
- Say *why*, not just *what*. Kids learn from the reasons.
- The kid decides. You ask, suggest, and explain, but the kid makes the choices.
- Ask one question at a time, and wait for the answer.
- Make one small change at a time. Then say what changed and how to test it. Never say something
  works unless you tested it.

## Where things are
| Place | What it is |
|---|---|
| `requirements.md` | Our list of new features: who each is for, why, and the plan |
| `skills/shared/` | Team skills shared by all our projects (a git submodule, don't edit here) |
| `skills/` | Skills just for this project |
| `scripts/check.mjs` | Checks the project for mistakes |
| `.github/workflows/` | Robots on GitHub that check and publish the website |
| `src/apps/<app-name>/` | One folder per app. `App.jsx` is the app. `about.js` is its name and description. |
| `src/App.jsx` | The frame around every app. It finds every app in `src/apps/` by itself. |
| `src/index.css` | Styles for the whole website |

`src/`, `package.json`, and the other website files appear the first time we build. Until then,
the website doesn't exist yet. That's OK!

## Project details
The shared skills read this section, so keep it up to date.

- **Repo:** `wizkidzai/grip-ai`
- **Live site:** https://wizkidzai.github.io/grip-ai/ (empty until the first feature is built and
  merged)
- **Extra tools:** Node.js 22.12 or newer, which comes with npm (`node --version`). Windows:
  `winget install -e --id OpenJS.NodeJS.LTS`. Mac: `brew install node`. Linux or Chromebook:
  don't use apt, because its Node is too old. Instead run
  `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.8/install.sh | bash`, reopen the
  terminal, then `nvm install 24`.
- **Run it:** `npm install` (first time on a computer), then `npm run dev`, then open
  http://localhost:5173/grip-ai/. No `package.json` yet? The website isn't set up yet.
- **Check it:** `node scripts/check.mjs`
- **Try it like a user:** open the home page, click the app, and walk through its user flow in
  `requirements.md`. To see it exactly like the live site: `npm run build`, then `npm run preview`.
- **Where new features go:** a new app gets its own folder, `src/apps/<app-name>/` (small letters
  and dashes), with `App.jsx` (the app) and `about.js`, which looks like
  `export default { name: 'Space Quiz', emoji: '🚀', description: '...', madeBy: '<first name>' }`.
  The home page finds new apps by itself.
- **Deploy:** automatic. When a grown-up merges into `main`, `.github/workflows/deploy.yml` builds
  the site and publishes it to GitHub Pages. It uses no secrets. Kids don't need to do anything.

## Rules
1. **New feature? Who, what, and why come first.** Follow `skills/shared/plan-a-feature/SKILL.md`
   in order: who it's for → what they need → why → how we'll build it. Write no code until the kid
   has clear answers and the plan is in `requirements.md`. *Why: building the wrong thing wastes
   time.* A new feature is something the site can't do yet, including the very first thing we
   build. Bug fixes, tweaks, and small look changes don't need a plan.
2. **Keep secrets secret.** This repo and the website are public: anyone in the world can read the
   code. Never put passwords, tokens, or API keys in any file. If you find one, stop and tell a
   grown-up. *Why: people could use a secret to break things or cost money.*
3. **Keep private data private.** Use first names only. No last names, schools, addresses, emails,
   phone numbers, or photos of faces. Apps must not ask visitors for personal info, or send data to
   other websites, without a grown-up's OK. *Why: the website is public and our team is kids.*
4. **Ask a grown-up before changing these:** `.github/workflows/`, `vite.config.js`,
   `scripts/check.mjs`, `package.json` (like adding a package), `AGENTS.md`, `CLAUDE.md`,
   `.gitmodules`, and anything in `skills/shared/`. *Why: they control how the whole site is
   checked and published, for everyone. Shared skills are changed in `wizkidzai/kid-skills`.*
5. **Some things come in pairs.** Every app folder needs both `App.jsx` and `about.js`. The `base`
   in `vite.config.js` must match the repo name. `node scripts/check.mjs` tests both.
   *Why: if one half is missing, the app or the whole site won't show up.*
6. **Keep it kind and simple.** Everything people see should be friendly and welcoming to every
   girl, and easy to read. Give pictures alt text (words that describe the picture).
   *Why: GRiP is for everyone, including people who use screen readers.*
7. **Use `skills/shared/devops/SKILL.md` for setup, testing, git, GitHub, and deploying.** Each kid
   works on their own branch, opens a pull request, and a grown-up merges it. Nobody pushes to
   `main`. *Why: a grown-up checks every change before it goes on the real website.*
8. **First build sets up the website.** If there's no `package.json` yet, then once the first
   feature is planned, follow `skills/start-the-website/SKILL.md` before building it. This
   replaces the "First time?" step in `skills/shared/plan-a-feature/SKILL.md`: a grown-up
   already picked the tools, so you don't need to ask first. *Why: the setup is the same every
   time, and a grown-up reviews it in the pull request.*

## Team skills
**Skills** are step-by-step guides that teach AI helpers how to do one job well. Shared skills are
in `skills/shared/<name>/SKILL.md`. Skills just for this project are in `skills/<name>/SKILL.md`.

Before starting a task, read the `description` at the top of each `SKILL.md` in both places. If
one fits, read the whole file and follow it. To make a new skill, use
`skills/shared/make-a-skill/SKILL.md`.
