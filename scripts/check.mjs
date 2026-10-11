// Checks the project for common mistakes.
// Run it with:  node scripts/check.mjs
// Each check prints ✅ (good) or ❌ (problem) with how to fix it.
// It uses only what comes with Node.js, so there is nothing extra to install.

import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { basename, join } from 'node:path'

const root = join(import.meta.dirname, '..')
const MAX_FILE_MB = 2
let failures = 0

function pass(name) {
  console.log(`✅ ${name}`)
}

function fail(name, problems, howToFix) {
  failures++
  console.log(`❌ ${name}`)
  for (const problem of problems.slice(0, 10)) console.log(`   - ${problem}`)
  if (problems.length > 10) console.log(`   - ...and ${problems.length - 10} more`)
  console.log(`   How to fix: ${howToFix}`)
}

function run(command) {
  // shell: true lets "npm" work on Windows, Mac, and Linux.
  const result = spawnSync(command, { cwd: root, shell: true, encoding: 'utf8' })
  return { ok: result.status === 0, output: `${result.stdout}${result.stderr}`.trim() }
}

// Keep only the useful part of a tool's error message: no colors, no
// "> npm run ..." lines, and no "at ..." lines that point inside the tools.
const colorCodes = new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, 'g')
function shortError(output) {
  return output
    .replace(colorCodes, '')
    .split('\n')
    .filter((line) => line.trim() && !line.startsWith('> ') && !/^\s+at /.test(line))
    .slice(-15)
}

// Every file we would share: saved (committed) files AND new files git
// doesn't know about yet. Files listed in .gitignore are skipped.
function projectFiles() {
  const result = run('git ls-files --cached --others --exclude-standard')
  if (!result.ok) return null
  return result.output
    .split('\n')
    .map((line) => line.trim())
    .filter((file) => file && existsSync(join(root, file)))
}

function readText(file) {
  const data = readFileSync(join(root, file))
  if (data.subarray(0, 8000).includes(0)) return null // a picture or other non-text file
  return data.toString('utf8')
}

const files = projectFiles()

if (!files) {
  fail('Git is working', ['Could not list the project files with git.'],
    'Make sure git is installed and you are inside the grip-ai folder. See skills/devops/SKILL.md, job 1.')
  process.exit(1)
}

// Checks 1-5 test the website. Before the first build there is no website
// yet (no package.json), so they are skipped.
if (existsSync(join(root, 'package.json'))) websiteChecks()
else console.log('⏭️  Website checks skipped: the website isn\'t set up yet. See skills/start-the-website/SKILL.md.')

function websiteChecks() {
  // 1. Tools are installed
  if (!existsSync(join(root, 'node_modules'))) {
    fail('Project tools are installed', ['The node_modules folder is missing.'], 'Run: npm install')
    return
  }
  pass('Project tools are installed')

  // 2. Lint: finds code mistakes, like typos in names or broken React code
  const lint = run('npm run lint')
  if (lint.ok) pass('Code has no mistakes the linter can find')
  else fail('Code has no mistakes the linter can find', shortError(lint.output),
    'Read the messages above. Each one names a file and line number. Fix it, then run the check again.')

  // 3. Build: makes the real website, and fails if any file is broken or missing
  const build = run('npm run build')
  if (build.ok) pass('Website builds')
  else fail('Website builds', shortError(build.output),
    'Read the error above. It usually names the file and line that is broken.')

  // 4. Every app folder has both of its files
  const appsDir = join(root, 'src', 'apps')
  const appProblems = []
  for (const name of existsSync(appsDir) ? readdirSync(appsDir) : []) {
    const folder = join(appsDir, name)
    if (!statSync(folder).isDirectory()) continue
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) {
      appProblems.push(`src/apps/${name}: folder names use only small letters, numbers, and dashes (like "space-quiz")`)
    }
    if (!existsSync(join(folder, 'App.jsx'))) appProblems.push(`src/apps/${name}/App.jsx is missing`)
    const aboutFile = join(folder, 'about.js')
    if (!existsSync(aboutFile)) {
      appProblems.push(`src/apps/${name}/about.js is missing`)
      continue
    }
    const about = readFileSync(aboutFile, 'utf8')
    for (const field of ['name', 'emoji', 'description']) {
      if (!new RegExp(`\\b${field}\\s*:`).test(about)) {
        appProblems.push(`src/apps/${name}/about.js needs a "${field}"`)
      }
    }
  }
  if (appProblems.length === 0) pass('Every app has App.jsx and about.js')
  else fail('Every app has App.jsx and about.js', appProblems,
    'Each app folder needs App.jsx and about.js, and about.js needs a name, emoji, and description. See skills/start-the-website/SKILL.md, step 11.')

  // 5. The website address matches the repo name
  const configFile = join(root, 'vite.config.js')
  const config = existsSync(configFile) ? readFileSync(configFile, 'utf8') : ''
  const base = config.match(/base:\s*['"`]([^'"`]*)['"`]/)?.[1]
  const remote = run('git remote get-url origin')
  const repoName = remote.ok ? basename(remote.output).replace(/\.git$/, '') : null
  if (!repoName) pass('Website address matches repo name (skipped: no origin remote)')
  else if (base === `/${repoName}/`) pass('Website address matches repo name')
  else fail('Website address matches repo name',
    [`vite.config.js has base: '${base}', but the repo is called "${repoName}"`],
    `Ask a grown-up to set base: '/${repoName}/' in vite.config.js.`)
}

// 6. No secrets (passwords, tokens, keys)
// Each pattern needs real-looking letters after the start, so this file's own
// patterns don't match themselves.
const secretPatterns = [
  ['GitHub token', /\bgh[pousr]_[A-Za-z0-9]{36,}/],
  ['GitHub token', /\bgithub_pat_[A-Za-z0-9_]{22,}/],
  ['AI or API key', /\bsk-[A-Za-z0-9_-]{20,}/],
  ['Google API key', /\bAIza[0-9A-Za-z_-]{35}/],
  ['AWS key', /\bAKIA[0-9A-Z]{16}\b/],
  ['Slack token', /\bxox[abposr]-[A-Za-z0-9-]{10,}/],
  ['Private key', new RegExp('-----BEGIN [A-Z ]*PRIVATE ' + 'KEY-----')],
  ['Password', /\bpassword\s*[:=]\s*['"][^'"\s]{4,}['"]/i],
]
const secretFileNames = /(^|\/)(\.env(\..*)?|[^/]*\.(env|pem|key)|id_rsa|id_ed25519)$/
const secretProblems = []
for (const file of files) {
  if (secretFileNames.test(file) && !file.endsWith('.env.example')) {
    secretProblems.push(`${file}: this kind of file usually holds secrets`)
    continue
  }
  const text = readText(file)
  if (text === null) continue
  text.split('\n').forEach((line, i) => {
    for (const [kind, pattern] of secretPatterns) {
      if (pattern.test(line)) secretProblems.push(`${file} line ${i + 1}: looks like a ${kind}`)
    }
  })
}
if (secretProblems.length === 0) pass('No secrets found')
else fail('No secrets found', secretProblems,
  'Remove the secret from the file. This repo and website are public, so anyone could see it. ' +
  'Tell a grown-up right away: if it was ever pushed, they need to cancel it and make a new one.')

// 7. No private information, like email addresses
const okEmail = /(@example\.(com|org)|@users\.noreply\.github\.com|^noreply@)/i
const emailProblems = []
for (const file of files) {
  if (file === 'package-lock.json') continue
  const text = readText(file)
  if (text === null) continue
  text.split('\n').forEach((line, i) => {
    for (const email of line.match(/[\w.+-]+@[\w-]+(\.[\w-]+)*\.[a-z]{2,}/gi) ?? []) {
      if (!okEmail.test(email)) emailProblems.push(`${file} line ${i + 1}: ${email}`)
    }
  })
}
if (emailProblems.length === 0) pass('No email addresses or private info found')
else fail('No email addresses or private info found', emailProblems,
  'Take the email address out. The website is public, so keep people\'s emails, last names, and addresses off it.')

// 8. No huge files
const bigFiles = files
  .map((file) => [file, statSync(join(root, file)).size / 1024 / 1024])
  .filter(([, mb]) => mb > MAX_FILE_MB)
  .map(([file, mb]) => `${file} is ${mb.toFixed(1)} MB`)
if (bigFiles.length === 0) pass(`No files bigger than ${MAX_FILE_MB} MB`)
else fail(`No files bigger than ${MAX_FILE_MB} MB`, bigFiles,
  'Big files make the website slow. Make pictures smaller (for example, save as .jpg or .webp at a smaller size). Ask a grown-up if you really need it.')

// 9. Files that must never be shared are listed in .gitignore
const gitignore = existsSync(join(root, '.gitignore')) ? readFileSync(join(root, '.gitignore'), 'utf8') : ''
const missing = ['node_modules', 'dist', '.env'].filter((entry) => !gitignore.split('\n').includes(entry))
if (missing.length === 0) pass('.gitignore keeps tools, builds, and secrets out')
else fail('.gitignore keeps tools, builds, and secrets out', missing.map((entry) => `"${entry}" is missing from .gitignore`),
  'Ask a grown-up to add those lines back to .gitignore.')

console.log('')
if (failures === 0) {
  console.log('🎉 All checks passed!')
} else {
  console.log(`${failures} ${failures === 1 ? 'check' : 'checks'} failed. Fix the ❌ items above, then run node scripts/check.mjs again.`)
  process.exit(1)
}
