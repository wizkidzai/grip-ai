---
name: devops
description: Does the behind-the-scenes work, like setting up a computer, running and testing the website, and using git and GitHub (branches, saving, pull requests, getting teammates' changes, deploying). Use this whenever someone says things like "set up my computer", "install", "it won't run", "start the website", "test it", "run the checks", "save my work", "commit", "new branch", "start something new", "push", "share my work", "make a pull request", "PR", "get the latest", "update my branch", "merge conflict", "deploy", "publish", "is it live", or "add a new tool".
---
# DevOps: behind-the-scenes work

DevOps means the jobs that keep a project running: tools, testing, saving, sharing, and
publishing. You do these jobs so the kid can focus on building. Explain each step in one sentence.

**Our repo:** https://github.com/wizkidzai/grip-ai
**Live website:** https://wizkidzai.github.io/grip-ai/
**Team workflow:** each kid works on their own branch and opens a pull request (a request to add
their changes). A grown-up reviews and merges it. When `main` changes, the website updates by itself.

## 1. Set up a computer
Check each tool first. Install only what's missing.

| Tool | Why we need it | Check |
|---|---|---|
| git | Saves the history of our work | `git --version` |
| gh (GitHub CLI) | Talks to GitHub for us | `gh --version` |
| Node.js 22.12 or newer (comes with npm) | Runs the website on your computer | `node --version` |

| Computer | Install |
|---|---|
| Windows | `winget install --id Git.Git -e`, `winget install --id GitHub.cli -e`, `winget install --id OpenJS.NodeJS.LTS -e`, then close and reopen the terminal |
| Mac | `brew install git gh node` (no `brew`? A grown-up installs it from https://brew.sh) |
| Linux / Chromebook | `sudo apt update && sudo apt install -y git gh`, then install Node with nvm (below) |

Node on Linux / Chromebook (no password needed): run
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.8/install.sh | bash`, close and reopen
the terminal, then run `nvm install 24`.

If a password or an "allow changes" box pops up, **stop and get a grown-up** to type it.

Then sign in and get the project:
1. `gh auth login` (choose GitHub.com, HTTPS, and log in with a web browser). Then `gh auth setup-git`.
2. Set your name, and a private email from GitHub so your real email stays off the public repo:
   `git config --global user.name "<first name>"`. For the email, run `gh api user --jq .id` and
   `gh api user --jq .login`, then `git config --global user.email "<id>+<login>@users.noreply.github.com"`.
3. Get the project: `git clone https://github.com/wizkidzai/grip-ai.git`, then `cd grip-ai`.
   Use `git clone`, not `gh repo clone`, so only our own repo gets connected.
4. `gh repo set-default wizkidzai/grip-ai`, then `npm install`.
5. Run it (see job 2).

Windows tip: if `npm` says "running scripts is disabled", use Command Prompt or Git Bash instead
of PowerShell, or ask a grown-up.

## 2. Run and test
1. `npm run dev` starts the website. Open http://localhost:5173/grip-ai/. Changes show up as you
   save. Press `Ctrl+C` in the terminal to stop it.
2. `npm run check` looks for common mistakes. Fix every ❌ before sharing.
3. Try it like a real visitor: click everything. Press `F12` and look in the **Console** tab for
   red errors. Press `Ctrl+Shift+M` (on Mac, `Cmd+Shift+M`) to see it at phone size.
4. Go through the "Done when" checks for this feature in `requirements.md`.
5. To see it exactly like the live site: `npm run build`, then `npm run preview`.

Side effects: the website has no server, emails, or payments, so testing on your computer can't
change anything real. Anything an app saves in the browser stays on your computer only.

## 3. Start new work
1. `git status`. If there are unsaved changes, **never throw them away.** Ask the kid: save them
   (job 4), or set them aside with `git stash push -m "<what it was>"`.
2. `git switch main`, then `git pull`. This gets the newest version.
3. `git switch -c <name>/<short-job>`, like `maya/space-quiz`. This is your own branch.

## 4. Save (commit)
1. `git status` and `git diff`: look at what changed together, and explain it simply.
2. Make sure there are no secrets or private info (rules 2 and 3 in `AGENTS.md`). Run `npm run check`.
3. `git add <the files>`, then `git commit -m "<short message in the kid's own words>"`.

## 5. Share for review
1. Get teammates' changes first (job 6), then run `npm run check` again.
2. `git push -u origin HEAD`
3. `gh pr create --repo wizkidzai/grip-ai --base main` with a title, and a body that says what
   changed, how to test it, and which `requirements.md` feature it's for (if any).
4. `gh pr checks --watch`. If anything shows ❌, fix it, commit, and `git push` again. The same pull
   request updates by itself.

## 6. Get teammates' changes
1. `git fetch origin`, then `git merge origin/main`.
2. **Merge, don't rebase.** Rebasing a branch that's already pushed needs a force push, which can
   erase work.
3. Merge conflict? That means two people changed the same lines. Show both versions simply, and
   let the kid choose (or mix them). Then `git add` the file and `git commit`.
4. If it gets confusing, run `git merge --abort` to go back to before, and ask a grown-up.

## 7. Deploy (publish)
The website publishes by itself. When a grown-up merges a pull request into `main`,
`.github/workflows/deploy.yml` builds the site and puts it on GitHub Pages. It uses no secrets.
1. Check it: `gh run list --workflow deploy.yml --limit 1`. After it finishes, open the live
   website (it can take a few minutes).
2. Tidy up: `gh pr view <branch> --json state`. If it says `MERGED`, the work is safe on `main`, so
   run `git switch main`, then `git pull`, then `git branch -D <branch>`.

Anything that would need a secret (a password or key) is deployed by a grown-up only.

## Adding a new tool
Need a new program or npm package? First explain why it's needed. Then get a grown-up's OK. Then
add it to the table in job 1, or to `package.json` with `npm install <name>`, so every teammate
gets it too.

## Check that it worked
- `npm run check` shows 🎉 All checks passed!
- `git status` says "nothing to commit, working tree clean" after saving.
- Your pull request shows ✅ for every check.

## Safety rules
- **Never push to `main`, and never force push** (`--force`). *Why: it can erase teammates' work.*
- **Never use `git reset --hard`, `git clean`, `git checkout -- .`, or anything that deletes work,**
  unless the kid agrees after hearing exactly what will be lost. *Why: deleted work can't come back.*
- **Never merge pull requests.** *Why: a grown-up reviews every change first.*
- **Only use the `origin` remote.** If `git remote -v` shows anything else, stop and ask a grown-up.
- **Only install tools from the table in job 1** (git, gh, and Node.js). Anything else needs a
  grown-up's OK.
- **When something unexpected happens, stop.** Explain what happened, and ask a grown-up.
