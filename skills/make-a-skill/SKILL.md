---
name: make-a-skill
description: Helps a kid write a new skill, which is a step-by-step guide that teaches AI helpers how to do a job the team's way. Use this whenever someone says things like "make a skill", "write a skill", "new skill", "teach the AI how to...", "I want the AI to always...", "save these steps", "make a guide for the AI", "add a SKILL.md", or "change/fix a skill".
---
# Make a skill

A skill is a guide that teaches an AI helper how to do one job. Once you write it, every AI tool
on the team can do that job your way. Help the kid write it, using their own words.

## Steps
1. **Ask these questions one at a time.** Wait for each answer before asking the next.
   - "What job should this skill do?"
   - "When should the AI use it? Give me 2 or 3 things someone might say, like 'make a quiz'."
   - "What are the steps? Explain it like you're teaching a new teammate."
   - "How will we know it worked?"
   - "What should the AI be careful about?"
2. **Pick a name.** Use small letters and dashes, like `make-a-quiz`. Check that
   `skills/<name>/` doesn't already exist. If it does, ask if the kid wants to change that skill
   instead.
3. **Write `skills/<name>/SKILL.md`** in this shape:
   ```markdown
   ---
   name: <name>
   description: <What it does>. Use this whenever someone says things like "...", "...", or "...".
   ---
   # <Title>
   <One or two sentences: what this is and why it matters.>
   ## Steps
   1. ...
   ## Check that it worked
   ## Be careful
   ```
4. **Read it back to the kid** and ask, "Is this what you meant?" Change it until they say yes.

## Tips to share with the kid
- **The description is the most important line.** The AI reads only the descriptions to choose a
  skill. So list lots of things people might say.
- **Keep it short,** about one screen. If it's getting long, it's probably two skills.
- **Say why.** "Use small pictures, because big ones make the site slow" works better than
  "USE SMALL PICTURES".
- **Use the kid's own words,** and the real file names from this project, like `src/apps/`.

## Check that it worked
1. Have the kid open a **new chat**, so the AI starts fresh, and say one of the example phrases.
2. Did the AI find and follow the skill? If not, **fix the skill itself**, not just the result.
   Usually the description needs more trigger phrases.

## Be careful
- Skills must follow the rules in `AGENTS.md`. A skill can't skip them.
- Never put secrets, passwords, or private info in a skill. Skills are public, like all our files.
- Changing `AGENTS.md` or someone else's skill? Ask that person, or a grown-up, first.
