# Getting Started

## Install

```bash
# 1. Clone and build
git clone git@github.com:dshanklin-bv/reeves.git ~/repos/reeves
cd ~/repos/reeves/mcp-server
npm install && npm run build

# 2. Create private data directory
mkdir -p ~/private/reeves/{learning-logs,artifacts,queue}
mkdir -p ~/private/life-data

# 3. Copy templates
cp ~/repos/reeves/templates/*.template ~/private/reeves/
```

## Configure MCP

Add to `~/.config/claude-code/mcp.json`:

```json
{
  "mcpServers": {
    "reeves": {
      "command": "node",
      "args": ["/Users/you/repos/reeves/mcp-server/dist/index.js"],
      "env": {
        "REEVES_ROOT": "/Users/you/private/reeves"
      }
    }
  }
}
```

Replace `/Users/you/` with your actual paths.

Restart Claude Code.

## Verify

```
You: "List my tasks"
Claude: [Shows empty list - success!]
```

## Use It

```
You: "Create a task to explore Reeves"
You: "What's next?"
You: "Mark task 1 done"
```

Done.

## Troubleshooting

**MCP not loading?**
- Use absolute paths in `mcp.json` (not `~`)
- Run `npm run build` in mcp-server/
- Restart Claude Code

**Tasks not saving?**
- Check `tasks.json` exists in `REEVES_ROOT`
- Verify file is writable
- Open in text editor to check for JSON errors

## Next Steps

- [Task Management](/guide/tasks)
- [Project Organization](/guide/projects)
- [Real-World Examples](/examples/real-world)
- [Contact Management](/guide/contacts)
