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

Reeves is an AI-powered personal assistant that manages your entire life. Track family events, coordinate contractors for your house sale, remember to follow up with friends, manage your side business—all while never forgetting a detail.

Instead of juggling sticky notes, scattered to-do lists, random text messages, and forgotten context, Reeves remembers everything for you and handles the tedious stuff automatically.

**Yes, you can use it for software projects too.** But Reeves shines when managing the messy, multi-threaded reality of actual human life.

```bash
# Install in 5 minutes
git clone git@github.com:dshanklin-bv/reeves.git
cd reeves/mcp-server
npm install && npm run build

# Configure once, use forever
# See Getting Started guide for MCP configuration
```

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
