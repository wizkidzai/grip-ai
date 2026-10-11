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
| `skills/` | Step-by-step guides for AI helpers (see "Team skills" below) |
| `scripts/check.mjs` | Checks the project for mistakes. Run it with `node scripts/check.mjs`. |
| `.github/workflows/` | Robots on GitHub that check and publish the website |
| `src/apps/<app-name>/` | One folder per app. `App.jsx` is the app. `about.js` is its name and description. |
| `src/App.jsx` | The frame around every app. It finds every app in `src/apps/` by itself. |
| `src/index.css` | Styles for the whole website |

`src/`, `package.json`, and the other website files appear the first time we build. Until then,
the website doesn't exist yet. That's OK!

## How to try it
Run `npm run dev`, then open http://localhost:5173/grip-ai/ in a browser.
(The first time on a computer, run `npm install` first.) No `package.json` yet? Then the website
hasn't been started. Plan the first feature, and the planning skill will set it up.
For setup, testing, git, and GitHub, use `skills/devops/SKILL.md`.

## Rules
1. **New feature? Who, what, and why come first.** Follow `skills/plan-a-feature/SKILL.md` in
   order: who it's for → what they need → why → how we'll build it. Write no code until the kid has
   clear answers and the plan is in `requirements.md`. *Why: building the wrong thing wastes time.*
   A new feature is something the site can't do yet, including the very first thing we build. Bug
   fixes, tweaks, and small look changes don't need a plan.
2. **Keep secrets secret.** This repo and the website are public: anyone in the world can read the
   code. Never put passwords, tokens, or API keys in any file. If you find one, stop and tell a
   grown-up. *Why: people could use a secret to break things or cost money.*
3. **Keep private data private.** Use first names only. No last names, schools, addresses, emails,
   phone numbers, or photos of faces. Apps must not ask visitors for personal info, or send data to
   other websites, without a grown-up's OK. *Why: the website is public and our team is kids.*
4. **Ask a grown-up before changing these:** `.github/workflows/`, `vite.config.js`,
   `scripts/check.mjs`, `package.json` (like adding a package), `AGENTS.md`, and `CLAUDE.md`.
   *Why: they control how the whole site is checked and published, for everyone.*
5. **Some things come in pairs.** Every app folder needs both `App.jsx` and `about.js`. The `base`
   in `vite.config.js` must match the repo name. `node scripts/check.mjs` tests both.
   *Why: if one half is missing, the app or the whole site won't show up.*
6. **Keep it kind and simple.** Everything people see should be friendly and welcoming to every
   girl, and easy to read. Give pictures alt text (words that describe the picture).
   *Why: GRiP is for everyone, including people who use screen readers.*
7. **Use `skills/devops/SKILL.md` for all setup, testing, git, and GitHub work.** Each kid works on
   their own branch, opens a pull request, and a grown-up merges it. Nobody pushes to `main`.
   *Why: a grown-up checks every change before it goes on the real website.*

## Team skills
Skills are step-by-step guides that live at `skills/<name>/SKILL.md`. Before starting a task, read
the `description` at the top of each one. If one fits, read the whole file and follow it.
To make a new skill, use `skills/make-a-skill/SKILL.md`.
