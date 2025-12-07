---
layout: home

hero:
  name: Reeves
  text: The Best Task Manager Until AGI Gets Here
  tagline: Your personal AI assistant that remembers everything about your life, handles your busywork, and saves you hours every day.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/dshanklin-bv/reeves

features:
  - icon: 🏠
    title: Real Life Management
    details: Track house repairs, family events, friend birthdays, side businesses, legal matters, and everything that actually matters.

  - icon: ⏱️
    title: Save 6+ Hours Per Week
    details: Real users save 50+ minutes daily by automating message reviews, task tracking, and follow-ups in their actual lives.

  - icon: 🧠
    title: Never Forget Anything
    details: Reeves remembers every conversation, every task, every follow-up—across all your life's projects.

  - icon: 👥
    title: People Management
    details: Remember how to talk to everyone. Communication preferences, relationship context, recent interactions—all tracked.

  - icon: 📁
    title: Intentionally Simple
    details: Plain JSON files instead of databases. Easy to read, edit, debug, and backup. No complexity.

  - icon: 🔒
    title: Privacy First
    details: All your data stays local. Nothing is sent to servers. Your life, your data, your control.

  - icon: 📱
    title: Smart Messaging
    details: Draft texts with the right tone for each person. Double-verify to never send to the wrong recipient.

  - icon: 💼
    title: Works for Software Too
    details: Yes, you can manage software projects. But Reeves was built for the messy reality of human life.
---

## Real-World Time Savings

::: tip From Actual Usage (2025-12-06)
**15 minutes saved:** Reviewed 24 hours of text messages, identified 5 new tasks, updated 3 existing tasks

**10 minutes saved:** Drafted professional text with correct tone, verified recipient across two databases

**20 minutes saved:** Created partnership project with context files, follow-up tasks, and learning logs

**5 minutes saved:** Tracked lunch expenses and gift purchases automatically

**Total: 50+ minutes saved today = 6+ hours per week = 25+ hours per month**
:::

## What is Reeves?

**Reeves is not for everyone.** It's for Claude Code power users who want to build their own life management system.

If you're into tinkering with MCP servers, customizing AI workflows, and want a **starting point** (not a finished product) to manage your life through AI—Reeves gives you that headstart.

### Why Reeves is Different

Traditional task managers lock you into:
- ❌ Their database schema
- ❌ Their UI patterns
- ❌ Their idea of how you should work
- ❌ Their AI integration (or lack thereof)

Reeves is just **a folder structure and some TypeScript**:
- ✅ Modify the schema however you want
- ✅ Add your own MCP tools
- ✅ Use with Claude Code, Gemini CLI, or Codex
- ✅ Built for 2026-2027 when AI gets smarter

### The Reeves Philosophy

Reeves is opinionated about **getting things done**, not code:

1. **Narrate your life** - Talk to Claude about what's happening
2. **Capture everything** - Tasks, context, people, projects
3. **Research naturally** - AI understands dependencies through notes
4. **Limit human overhead** - AI digests info, you make decisions
5. **Execute in real world** - Phone calls, texts, follow-ups

**If you're willing to be disciplined** about narrating details of your life into Claude Code (or Gemini CLI, or Codex), you'll see growing gains as you use Reeves more. Reeves learns about you, your habits, your communication patterns, and improves itself. The AI gets better at managing your life because it remembers everything.

```bash
# Install in 5 minutes
git clone git@github.com:dshanklin-bv/reeves.git
cd reeves/mcp-server
npm install && npm run build

# Configure once, use forever
# See Getting Started guide for MCP configuration
```

## Who Should Use Reeves?

### You Should Use Reeves If:

- ✅ You use **Claude Code** (or Gemini CLI, or Codex) regularly
- ✅ You're comfortable with **MCP servers** and TypeScript
- ✅ You want to **tinker and customize** your task system
- ✅ You're disciplined about **narrating your life** to AI
- ✅ You understand this is a **starting point**, not a finished product
- ✅ You want a system built for **future AI** (2026-2027 capabilities)

### You Should NOT Use Reeves If:

- ❌ You want a finished SaaS product with a UI
- ❌ You're not technical or don't want to tinker
- ❌ You need team collaboration features
- ❌ You want something that "just works" out of the box
- ❌ You're not willing to adapt your workflow

**Reeves is for power users who want control.** If that's you, welcome. If not, try Todoist or Things—they're great finished products.

## Why Files Instead of a Database?

**Because files are debuggable.** You can:
- Open tasks.json and see everything
- Edit with any text editor
- Backup with simple file copy
- Version control with git
- No Docker, no migrations, no complexity

When you outgrow JSON (~300 tasks), there's a clear migration path to SQLite or Postgres. But most users never need it.

## Philosophy

Reeves is designed for **AI reasoning, not rigid automation**:

- Read all tasks and understand dependencies naturally
- Make judgment calls about task priority
- Skip overly complex dependency systems
- Trust plain English notes over strict schemas

**Build for understanding, not just execution.**

## Quick Example

```
You: "Create a task to research database options"
Claude: [Creates task with Reeves]

You: "What's next?"
Claude: [Shows prioritized active tasks]

You: "Mark task 5 as complete with notes about what I found"
Claude: [Completes task, preserves context]
```

All your work is saved. Forever. Across sessions.

## Ready to Save Hours?

<div style="text-align: center; margin: 2rem 0;">
  <a href="/guide/getting-started" style="display: inline-block; padding: 1rem 2rem; background: #3eaf7c; color: white; border-radius: 4px; text-decoration: none; font-weight: 600;">
    Get Started in 5 Minutes →
  </a>
</div>
