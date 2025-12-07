---
layout: home

hero:
  name: Reeves
  text: AI Task Management System
  tagline: Your personal AI assistant that remembers everything, handles your busywork, and saves you hours every day.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/dshanklin-bv/reeves

features:
  - icon: ⏱️
    title: Save 6+ Hours Per Week
    details: Real users save 50+ minutes daily by automating message reviews, task tracking, and follow-ups.

  - icon: 🧠
    title: Never Forget Context
    details: Reeves remembers everything across Claude Code sessions. Pick up exactly where you left off.

  - icon: 📁
    title: Intentionally Simple
    details: Plain JSON files instead of databases. Easy to read, edit, debug, and backup. No complexity.

  - icon: 🔒
    title: Privacy First
    details: All your data stays local. Nothing is sent to servers. You own your tasks and contacts.

  - icon: 🤖
    title: AI-First Design
    details: Built for AI reasoning, not rigid automation. Claude understands dependencies naturally.

  - icon: 📱
    title: Message Management
    details: Double-verify protocol prevents wrong recipients. Draft messages with correct tone automatically.

  - icon: 📊
    title: Project Organization
    details: Group related tasks with context files. Learning logs capture strategic decisions.

  - icon: 🔄
    title: Scales When You Need
    details: Start with JSON. Migrate to SQLite or Postgres when you hit ~300 tasks.
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

Reeves is an AI-powered task manager that works alongside Claude Code. Instead of juggling sticky notes, scattered to-do lists, and forgotten context, Reeves remembers everything for you and handles the tedious stuff automatically.

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
