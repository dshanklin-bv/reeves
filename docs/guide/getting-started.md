# Getting Started

Get Reeves running in 5 minutes and create your first task.

## Quick Installation

### 1. Clone Repository

```bash
cd ~/repos  # or your preferred location
git clone git@github.com:dshanklin-bv/reeves.git
cd reeves
```

### 2. Install MCP Server

```bash
cd mcp-server
npm install
npm run build
```

### 3. Create Private Data Directory

```bash
# Create your private Reeves data directory
mkdir -p ~/private/reeves/{learning-logs,artifacts,queue}
mkdir -p ~/private/life-data
```

### 4. Initialize Data Files

```bash
# Copy templates to your private directory
cp templates/tasks.json.template ~/private/reeves/tasks.json
cp templates/projects.json.template ~/private/reeves/projects.json
cp templates/contacts.json.template ~/private/life-data/contacts.json
```

### 5. Configure MCP Server

Add to your Claude Code MCP configuration (`~/.config/claude-code/mcp.json`):

```json
{
  "mcpServers": {
    "reeves": {
      "command": "node",
      "args": ["/path/to/reeves/mcp-server/dist/index.js"],
      "env": {
        "REEVES_ROOT": "/path/to/your/private/reeves"
      }
    }
  }
}
```

::: warning Replace Paths
- `/path/to/reeves/` → where you cloned this repo
- `/path/to/your/private/reeves` → your private data directory
:::

### 6. Restart Claude Code

Restart Claude Code to load the MCP server. Reeves will be available in your next session.

## Verify Installation

Test that Reeves is working:

```
You: "Call the how_to tool"
Claude: [Returns Reeves usage guide]
```

Or:

```
You: "List my tasks"
Claude: [Returns empty task list from your new tasks.json]
```

## Your First Task

Let's create your first task:

```
You: "Create a task to explore Reeves documentation"
Claude: [Uses create_task tool]
```

Claude will create a task like:

```json
{
  "id": 1,
  "content": "Explore Reeves documentation",
  "activeForm": "Exploring Reeves documentation",
  "status": "pending",
  "assignee": "reeves",
  "project": "learning-reeves",
  "priority": "medium",
  "created": "2025-12-07T01:00:00Z"
}
```

## Check What's Next

```
You: "What's next?"
Claude: [Shows prioritized active tasks]
```

## Complete Your Task

```
You: "Mark task 1 as complete. I learned about task management, projects, and contacts."
Claude: [Completes task with your notes]
```

## Real-World Example

Here's a typical workflow:

```
You: "Review my texts from John in the last 24 hours and create follow-up tasks"

Claude: [Uses Messages MCP to read texts]
Claude: [Analyzes conversation]
Claude: [Creates 3 follow-up tasks]
Claude: [Adds notes with context]

You: "What did you find?"

Claude: "I found 3 action items:
1. Send John the research brief
2. Schedule partnership discussion
3. Share software intel
All tasks created and linked to john-partnership project."
```

All that context is now **permanently saved**. Next week, next month—Reeves remembers.

## Next Steps

Now that you have Reeves running:

1. [Learn about task management](/guide/tasks)
2. [Understand projects](/guide/projects)
3. [See real-world examples](/examples/real-world)
4. [Configure contact management](/guide/contacts)

## Troubleshooting

### MCP Server Not Loading

1. Check paths in `mcp.json` are **absolute** (not `~/repos/...`)
2. Verify `REEVES_ROOT` points to your private data directory
3. Ensure MCP server is built: `cd mcp-server && npm run build`
4. Check Claude Code logs for errors

### Tasks Not Persisting

1. Verify `tasks.json` exists in your `REEVES_ROOT` directory
2. Check file permissions (must be writable)
3. Ensure JSON is valid (no syntax errors)
4. Try opening `tasks.json` in a text editor

### Can't Find Tools

1. Restart Claude Code after MCP config changes
2. Use `how_to` tool to verify Reeves is loaded
3. Check MCP server is in config: `cat ~/.config/claude-code/mcp.json`
4. Verify paths are correct (use `ls` to check they exist)

## Get Help

- [Installation Guide](/guide/installation) - Detailed setup instructions
- [Troubleshooting](/guide/troubleshooting) - Common issues and fixes
- [GitHub Issues](https://github.com/dshanklin-bv/reeves/issues) - Report problems or ask questions
