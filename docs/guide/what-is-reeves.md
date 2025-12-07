# What is Reeves?

Reeves is an AI assistant that remembers everything about your life across Claude Code sessions.

You talk naturally about what's happening—family events, house projects, work tasks, legal matters—and Reeves organizes it into tasks, projects, and contacts. Everything persists. Close Claude, come back tomorrow, and all your context is still there.

## The Core Shift

**Traditional task managers:** You must structure everything first (categories, tags, priorities, due dates), then you can start working.

**Reeves:** You narrate what's happening naturally. AI figures out the structure. You review and refine.

This inversion matters because life doesn't arrive pre-categorized. You're having a text conversation with your contractor, remembering you need to email your attorney, realizing you forgot to follow up with a friend—Reeves captures all of it as you think out loud.

## How It Works

1. **You talk to Claude** - "I need to call the plumber about the sink, email Sarah about the partnership, and follow up with John"
2. **Claude uses Reeves MCP tools** - Creates 3 tasks, asks clarifying questions, organizes by project
3. **Everything saves to JSON files** - Plain text you can open, edit, and understand
4. **Next session: it's all there** - Context preserved, ready to continue

## Why It Works

Reeves has just enough MCP tools to keep AI on task without restricting adaptability.

It's not a rigid workflow engine. It's not a locked database schema. It's **structured persistence** that AI can reason about—12 simple tools for creating, updating, and querying your life's data.

This minimal design means AI can adapt to situations Reeves was never explicitly programmed for. New project type? AI figures it out using the same tools. Complex dependency? AI reasons about it from task notes, not a rigid dependency graph.

## Core Concepts

**Tasks** - Things you need to do. AI creates, updates, and completes them based on natural conversation.

**Projects** - Groups of related tasks. Reeves infers these from context ("house-sale", "legal-case", "startup-validation").

**Learning Logs** - Deep context files for complex projects. When a project needs more than task notes can hold, Reeves maintains markdown files with history, decisions, and strategic thinking.

**Contacts** - How to communicate with people. Tone preferences, relationship context, recent interactions.

## Why JSON Files?

Reeves uses plain JSON instead of databases because you need to be able to:

- **Read** - Open tasks.json and see everything
- **Edit** - Fix a typo directly in the file
- **Debug** - Understand exactly what's stored
- **Backup** - Copy files, done
- **Version control** - Git for your life data

No Docker containers. No database migrations. No complexity until you need it.

When you outgrow JSON (~300 tasks), there's a clear migration path to SQLite or Postgres. Most people never need to migrate.

## Who Is This For?

**Power users managing complex lives:**
- Parents coordinating family schedules and events
- Homeowners managing contractors and house projects
- Professionals juggling work, family, and side businesses
- Anyone dealing with legal matters that require tracking
- People who want to remember how to communicate with everyone

**Technical requirements:**
- You use Claude Code (or willing to learn it)
- You're comfortable with MCP servers and JSON
- You want to tinker and customize
- You understand this is a starting point, not finished software

## What This Isn't

- **Not a team tool** - Deeply personal, built for one person's life
- **Not a calendar** - It's task and context-focused, not scheduling
- **Not a CRM** - For your personal life, not managing customers
- **Not finished SaaS** - It's a framework you customize and extend

## Next Steps

- [Get Started](/guide/getting-started) - Install and start using it
- [Real-World Examples](/examples/real-world) - See how people actually use this
- [Task Philosophy](/guide/tasks) - How to think about task management with AI
