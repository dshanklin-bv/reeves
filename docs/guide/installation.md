# Installation

## Prerequisites

- Node.js 18+
- Git
- Claude Code CLI

Check: `node --version && git --version`

## Install

```bash
# Clone and build
git clone git@github.com:dshanklin-bv/reeves.git ~/repos/reeves
cd ~/repos/reeves/mcp-server
npm install && npm run build

# Create private data directory
mkdir -p ~/private/reeves/{learning-logs,artifacts,queue}
mkdir -p ~/private/life-data

# Copy templates
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

**Important:** Use absolute paths, not `~`. Run `pwd` in each directory to get absolute paths.

Restart Claude Code.

## Verify

```
You: "List my tasks"
Claude: [Shows empty list]
```

Success.

## Common Issues

**MCP not loading?**
- Use absolute paths in config (not `~`)
- Verify `dist/index.js` exists after build
- Restart Claude Code

**Tasks not saving?**
- Check `tasks.json` exists in `REEVES_ROOT`
- Verify file is writable: `chmod 644 ~/private/reeves/*.json`

**Path errors?**
```bash
# Get absolute paths
cd ~/repos/reeves && pwd
cd ~/private/reeves && pwd
```

## Platform Notes

**macOS/Linux:** Use paths shown above

**Windows:** Use WSL (Windows Subsystem for Linux)

## Update Reeves

```bash
cd ~/repos/reeves
git pull
cd mcp-server && npm install && npm run build
```

Restart Claude Code.

## Next Steps

- [Get Started](/guide/getting-started)
- [Task Philosophy](/guide/tasks)
- [Real Examples](/examples/real-world)
