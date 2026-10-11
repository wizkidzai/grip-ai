---
name: start-the-website
description: Sets up the GRiP website project the very first time, building the empty frame and tools the apps go into. Use this whenever there is no package.json in the project yet and someone wants to build, run, or test the website, or says things like "start the website", "set up the project", "create the website", "first time", "scaffold", "there's no code yet", or "npm run dev doesn't work". Only use it after the first feature has been planned with plan-a-feature.
---
# Start the website

The first time we build, the project needs a skeleton. That's the empty frame our apps go into.
A grown-up already picked the tools: **Vite** (turns our code into a website), **React** (makes
pages that react when you click), and **GitHub Pages** (puts the site online for free). This skill
builds only the frame, with no example apps. That way, everything on the site is something our
team planned.

## Before you start
1. Look for `package.json` in the project folder. If it's there, the website is already set up,
   so don't use this skill.
2. Look in `requirements.md` for a feature with **Status: Planned**. If there isn't one, follow
   `skills/plan-a-feature/SKILL.md` first. *Why: we build the website for someone, so we start
   by knowing who.*
3. Make sure you're on your own branch (`skills/devops/SKILL.md`, job 3), and that
   `node --version` says 22.12 or newer.

## Steps
Explain each step to the kid in one sentence as you go.

1. **Create `package.json`.** This is the project's ID card. It lists the commands we can run.
   ```json
   {
     "name": "grip-ai",
     "private": true,
     "version": "0.0.0",
     "type": "module",
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "lint": "oxlint",
       "preview": "vite preview"
     }
   }
   ```
2. **Install the tools.** This downloads the newest versions and writes them down in
   `package.json` and `package-lock.json`:
   `npm install react react-dom`, then `npm install --save-dev vite @vitejs/plugin-react oxlint`
3. **Create `vite.config.js`.** `base` must match the repo name, because the live site's address
   is https://wizkidzai.github.io/grip-ai/.
   ```js
   import react from '@vitejs/plugin-react'
   import { defineConfig } from 'vite'

   export default defineConfig({
     plugins: [react()],
     base: '/grip-ai/',
   })
   ```
4. **Create `.oxlintrc.json`.** The linter reads this to know which code mistakes to catch.
   ```json
   {
     "plugins": ["react", "oxc"],
     "categories": { "correctness": "error" },
     "rules": { "react/rules-of-hooks": "error" }
   }
   ```
5. **Create `index.html`.** This is the page the browser opens first.
   ```html
   <!doctype html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>GRiP: Girls in Robotics and Physical AI</title>
     </head>
     <body>
       <div id="root"></div>
       <script type="module" src="/src/main.jsx"></script>
     </body>
   </html>
   ```
6. **Create `src/main.jsx`.** It starts React.
   ```jsx
   import { StrictMode } from 'react'
   import { createRoot } from 'react-dom/client'
   import './index.css'
   import App from './App.jsx'

   createRoot(document.getElementById('root')).render(
     <StrictMode>
       <App />
     </StrictMode>,
   )
   ```
7. **Create `src/App.jsx`.** It's the frame: it finds every app in `src/apps/` and shows the one
   in the address.
   ```jsx
   import { useEffect, useState } from 'react'

   // Each app is a folder in src/apps/ with two files:
   //   App.jsx  - the app itself
   //   about.js - its name, emoji, and description
   // This finds them all, so nobody has to add their app to a list.
   const appFiles = import.meta.glob('./apps/*/App.jsx', { eager: true })
   const aboutFiles = import.meta.glob('./apps/*/about.js', { eager: true })
   const apps = Object.keys(aboutFiles)
     .map((path) => {
       const id = path.split('/')[2]
       const Component = appFiles[`./apps/${id}/App.jsx`]?.default
       return { id, ...aboutFiles[path].default, Component }
     })
     .filter((app) => app.Component)

   // The part of the address after "#/" picks the app, like ".../grip-ai/#/space-quiz"
   function readPage() {
     return window.location.hash.replace(/^#\/?/, '')
   }

   export default function App() {
     const [page, setPage] = useState(readPage)
     useEffect(() => {
       const onChange = () => setPage(readPage())
       window.addEventListener('hashchange', onChange)
       return () => window.removeEventListener('hashchange', onChange)
     }, [])
     const app = apps.find((a) => a.id === page)

     return (
       <div className="site">
         <header>
           <a href="#/">GRiP</a> Girls in Robotics and Physical AI
         </header>
         <main>
           {app ? (
             <app.Component />
           ) : (
             <ul>
               {apps.map((a) => (
                 <li key={a.id}>
                   <a href={`#/${a.id}`}>{a.emoji} {a.name}</a>: {a.description}
                 </li>
               ))}
             </ul>
           )}
         </main>
       </div>
     )
   }
   ```
8. **Create `src/index.css`.** These are the styles for the whole site. Keep them plain, so the
   team can design the look later.
   ```css
   :root {
     font-family: system-ui, sans-serif;
     line-height: 1.5;
     color: #1f2937;
     background: #ffffff;
   }
   body {
     margin: 0;
   }
   .site {
     max-width: 960px;
     margin: 0 auto;
     padding: 16px;
   }
   ```
9. **Create `.github/workflows/deploy.yml`.** This robot on GitHub publishes the site whenever a
   grown-up merges into `main`. It uses no secrets.
   ```yaml
   name: Deploy website
   on:
     push:
       branches: [main]
     workflow_dispatch:
   permissions:
     contents: read
     pages: write
     id-token: write
   concurrency:
     group: pages
     cancel-in-progress: false
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v7
         - uses: actions/setup-node@v7
           with:
             node-version-file: .nvmrc
         - run: npm ci
         - run: npm run build
         - uses: actions/configure-pages@v6
         - uses: actions/upload-pages-artifact@v5
           with:
             path: dist
     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - id: deployment
           uses: actions/deploy-pages@v5
   ```
10. **Save it** as its own commit, with a message like "Set up the website" (`skills/devops/SKILL.md`,
    job 4).
11. **Go back to `skills/plan-a-feature/SKILL.md`, Part 4,** and build the planned feature as the
    first app. Make a folder `src/apps/<app-name>/` with an `App.jsx` and an `about.js`:
    ```js
    export default {
      name: 'Space Quiz',
      emoji: '🚀',
      description: 'Test what you know about robots in space.',
      madeBy: '<first name>',
    }
    ```

## Check that it worked
- `node scripts/check.mjs` shows 🎉 All checks passed!
- `npm run dev`, then open http://localhost:5173/grip-ai/. You should see "GRiP" at the top and
  nothing else yet. That's right, because the first app comes next.

## Be careful
- **Don't add example apps, extra pages, or extra packages.** Build only the frame. The team's
  planned features fill it in.
- After this, `package.json`, `vite.config.js`, `.oxlintrc.json`, and `.github/workflows/` are
  grown-up files (rule 4 in `AGENTS.md`). Creating them here is OK, because a grown-up reviews
  this pull request.
- If any step fails, stop, explain what happened, and ask a grown-up. Don't guess at a fix.
