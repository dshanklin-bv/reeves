# Getting Started

Reeves is a mental model for working with AI on life management.

## The Pattern

1. **Narrate your life** - Tell Claude what's happening
2. **Let AI structure it** - Tasks, projects, contacts get organized automatically
3. **Ask what's next** - Claude prioritizes and surfaces what matters
4. **Close the loop** - Mark things done, capture outcomes

That's it. Everything else is implementation.

## Install

```bash
git clone git@github.com:dshanklin-bv/reeves.git ~/repos/reeves
cd ~/repos/reeves/mcp-server && npm install && npm run build
mkdir -p ~/private/reeves/{learning-logs,artifacts,queue} ~/private/life-data
cp ~/repos/reeves/templates/*.template ~/private/reeves/
```

Add to `~/.config/claude-code/mcp.json`:

```json
{
  "mcpServers": {
    "reeves": {
      "command": "node",
      "args": ["/Users/you/repos/reeves/mcp-server/dist/index.js"],
      "env": { "REEVES_ROOT": "/Users/you/private/reeves" }
    }
  }
}
```

Restart Claude Code.

## Start Using It

```
You: "I need to call the plumber about the kitchen sink,
      email Sarah about the partnership proposal,
      and remember to follow up with John about the contract"

Claude: [Creates 3 tasks, asks clarifying questions, organizes by project]

You: "What's next?"

Claude: [Shows prioritized tasks with context]

You: "I called the plumber, he's coming Tuesday"

Claude: [Updates task, adds note, adjusts related tasks]
```

## Key Concepts

**Tasks** - Things to do. Claude creates, updates, and completes them.

**Projects** - Groups of related tasks. Reeves infers these from context.

**Learning Logs** - Deep context files. When a project is complex, Reeves maintains a living document with history, decisions, and strategic thinking.

**Contacts** - How to communicate with people. Tone, preferences, recent interactions.

## What Makes This Different

Traditional task managers force you to structure first, then execute.

Reeves inverts this: **narrate naturally, let AI structure later**.

The AI reads your tasks.json, understands dependencies through notes, makes judgment calls about priority. No rigid dependency graphs. No forced categorization.

## Next Steps

- [See real workflows](/examples/real-world) - How people actually use this
- [Task philosophy](/guide/tasks) - How to think about task management with AI
- [API reference](/api/tools) - When you need specifics
