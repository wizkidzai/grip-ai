---
name: plan-a-feature
description: Coaches a kid to think like a product manager before building anything new. First who the feature is for, what they need, and why, then how to build it, and then it records the plan in requirements.md. Use this whenever someone wants the website to do something it can't do yet, or starts building for the very first time, like "let's build...", "add a...", "make a new app", "make a game/quiz/tool/page", "I have an idea", "can we make...", "new feature", "what should we build", "let's start the website", or "let's plan". Skip it for bug fixes, tweaks, or small look changes.
---
# Plan a feature

A product manager is the person who figures out *who* something is for and *why* they need it,
before anyone builds it. If we skip that, we might build something nobody needs. So we always go
in this order: **who → what → why → how → build.** Don't skip ahead.

## Part 1: Who, what, why (no building ideas yet)
Ask these one at a time. Wait for each answer. Don't move on until the answer is clear.

1. **Who is the target user?** Who will use this?
   - Clear: "girls my age who have never coded a robot", "kids at our robotics club"
   - Not clear yet: "everyone", "people". Ask: "Can you picture one person who would use it?
     How old are they? What do they like?"
2. **What do they need?** What problem are they facing, or what feature are you building for them?
   - Clear: "they don't know what the parts of a robot are called"
   - Not clear yet: "it would be cool". Ask: "What is hard for them right now?"
3. **Why?** Why are they facing that problem, or why do they need this feature?
   - Clear: "they've never seen a real robot up close, so the names don't mean anything to them"
   - Ask: "How do you know? Did you see it happen, or did someone tell you?" Real examples make
     the best reasons.

If an answer is still fuzzy after two follow-up questions, help the kid sharpen it. Offer two or
three choices, and let them pick or say their own.

**If the kid jumps to a solution** ("let's add a map!"), say it's a great idea and you'll save it
for Part 2. Then go back to the question you were on. Don't discuss how to build it yet.

**Say it back in one sentence:** "So, *<who>* need *<what>* because *<why>*. Is that right?"
Only go to Part 2 once the kid says yes, and the answer makes sense: a real person, a real need,
and a reason you could explain to a grown-up.

## Part 2: How do we build it?
1. **Brainstorm.** Ask for the kid's ideas first, including any saved from Part 1. Then add one or
   two simple ideas of your own.
2. **Compare the ideas together:**
   - Does it solve the problem from Part 1, for the person from Part 1?
   - How hard is it to build? Smaller is better at first. We can add more later.
   - Does it follow the rules in `AGENTS.md`? (No secrets, no private data, kind and simple.)
3. **The kid picks one.** Say the plan back in a few sentences. Change it until the kid says it's
   right.
4. **Walk through the user flow.** A user flow is the steps a person takes to use the feature,
   from start to finish. Ask the kid to tell it like a story about the person from Part 1: "What
   do they see first? What do they click? What happens next?" Write each step as a short line.
   To find missing steps, ask "What if they get it wrong?" and "How do they get back?" Keep going
   until the kid says the flow is complete. *Why: walking through it like a user shows the gaps
   before we build, when they're easy to fix.*
5. **Agree on 2–3 "done when" checks** that anyone could try, like "When I click Start, a question
   shows up." Steps from the user flow make good checks.

## Part 3: Write it down
Add this to the bottom of `requirements.md`, then show it to the kid:
```markdown
## <Feature name>
- **Status:** Planned
- **Asked by:** <first name>, <date>
- **Who it's for:**
- **Problem or need:**
- **Why they have it:**
- **Our idea:**
- **Other ideas we talked about:** <one line each, and why we didn't pick them>
- **User flow:**
  1. ...
- **Done when:**
  - [ ] ...
```

## Part 4: Build it
Only now do you start writing code.

**First time?** If there is no `package.json` in the project, the website hasn't been set up yet.
Follow `skills/start-the-website/SKILL.md` first, then come back here.

1. Change the status to **Building**. A new app gets its own folder, `src/apps/<app-name>/`, with
   an `App.jsx` (the app) and an `about.js` (what the home page shows about it):
   ```js
   export default {
     name: 'Space Quiz',
     emoji: '🚀',
     description: 'Test what you know about robots in space.',
     madeBy: '<first name>',
   }
   ```
2. Build one small piece at a time. After each piece, show the kid how to try it.
3. If the plan changes, update the entry in `requirements.md`.
4. When every "done when" check passes, tick the boxes (`- [x]`) and change the status to **Done**.

## Check that it worked
- The entry is at the bottom of `requirements.md`, and every line is filled in.
- The kid can explain who it's for, what they need, and why, in their own words.
- The kid can tell the user flow from start to finish.

## Be careful
- **No code before Part 4.** Not even a "quick try". *Why: building first makes it hard to change
  the plan, and the plan is the point.*
- The kid decides. Ask, suggest, and explain, but don't answer the questions for them.
- Use first names only in "Asked by", because the repo is public.
