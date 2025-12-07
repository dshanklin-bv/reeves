---
layout: home

hero:
  name: Reeves
  text: AI Assistant for Your Life
  tagline: Track projects, manage contacts, remember everything. Plain JSON files that AI reasons about.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/dshanklin-bv/reeves

features:
  - icon: 🧠
    title: Never Forget
    details: Every conversation, task, and follow-up saved across all your projects.

  - icon: ⏱️
    title: 6+ Hours/Week Saved
    details: Real usage managing 300+ tasks across house repairs, legal cases, family, and side projects.

  - icon: 👥
    title: Smart Contacts
    details: Communication preferences and relationship context for everyone in your life.

  - icon: 📁
    title: Plain JSON
    details: No databases, no Docker, no migrations. Just files you can read and edit.

  - icon: 🔒
    title: Privacy First
    details: All data stays local. Nothing sent to servers.

  - icon: 💬
    title: Natural Language
    details: Talk to Claude naturally. It handles task creation, updates, and prioritization.
---

## For Power Users Only

If you tinker with Claude Code and MCP servers, Reeves gives you a head start building your own life management system.

**Not a finished SaaS product.** It's a starting point you customize and extend.

## Install

```bash
git clone git@github.com:dshanklin-bv/reeves.git
cd reeves/mcp-server
npm install && npm run build

# Configure MCP in Claude Code (see Getting Started)
```

## Use It

```
You: "Create a task to call the plumber"
You: "What's next?"
You: "Mark task 5 done"
```

Claude handles the rest.

## Philosophy

**Intentionally not software.** Plain JSON files that AI reasons about. Built for 2026-2027 when AI manages your life through data, not buttons.

- Files instead of databases (migrate to SQLite at ~300 tasks)
- Learning logs for deep context, not bloated notes
- AI makes judgment calls, not rigid automation
- For narrating your life to AI, not clicking UIs

## Ready?

<div style="text-align: center; margin: 2rem 0;">
  <a href="/guide/getting-started" style="display: inline-block; padding: 1rem 2rem; background: #3eaf7c; color: white; border-radius: 4px; text-decoration: none; font-weight: 600;">
    Get Started →
  </a>
</div>
