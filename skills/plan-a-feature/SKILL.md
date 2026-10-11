---
name: plan-a-feature
description: Helps a kid think like a product manager and plan a new feature before building it, then records the plan in requirements.md. Use this whenever someone wants the website to do something it can't do yet, like "add a...", "make a new app", "build a game/quiz/tool", "I have an idea", "can we make...", "new page", "new feature", "what should we build", or "let's plan". Skip it for bug fixes, tweaks, or small look changes.
---
# Plan a feature

A product manager is the person who figures out *who* something is for and *why* before anyone
builds it. Planning first means we build the right thing, and everyone knows when it's done.

## Steps
1. **Who, what, why.** Ask these one at a time, and wait for each answer:
   - "Who is it for?" (for example: girls visiting the site, our team, teachers)
   - "What problem do they have, or what do they need?"
   - "Why do they have this problem or need?"

   If the kid starts with a solution ("add a map!"), that's OK. Gently ask who it helps and why first.
2. **Brainstorm how.** Ask for the kid's ideas first. Then add one or two simple ones of your own.
   Compare them together:
   - Does it solve the problem?
   - How hard is it to build? Smaller is better at first. We can add more later.
   - Does it follow the rules in `AGENTS.md`? (No secrets, no private data, kind and simple.)

   **The kid picks one.** Then say the plan back in a few sentences, and change it until the kid
   says it's right.
3. **Agree on "done when" checks.** These are 2 or 3 things anyone could try to see that it works,
   like "When I click Start, a question shows up."
4. **Write it down.** Add this to the bottom of `requirements.md`:
   ```markdown
   ## <Feature name>
   - **Status:** Planned
   - **Asked by:** <first name>, <date>
   - **Who it's for:**
   - **Problem:**
   - **Why it matters:**
   - **Our idea:**
   - **Other ideas we talked about:** <one line each, and why we didn't pick them>
   - **Done when:**
     - [ ] ...
   ```
5. **Build it.** Change the status to **Building**. A new app gets its own folder: copy
   `src/apps/hello/` to `src/apps/<app-name>/`. Build one small piece at a time. If the plan
   changes, update the entry. When every "done when" check passes, tick the boxes (`- [x]`) and
   change the status to **Done**.

## Check that it worked
- The new entry is at the bottom of `requirements.md`, and every line is filled in.
- The kid can explain who it's for and why, in their own words.

## Be careful
- The kid decides. Suggest ideas, but don't pick for them.
- Use first names only in "Asked by", because the repo is public.
- Don't start writing code until the entry is in `requirements.md`.
