# MCP Configuration Guide

This guide explains how to configure Reeves as an MCP server for Claude Code.

## Configuration File Location

The MCP configuration file location depends on your setup:

**Claude Code CLI:**
```
~/.config/claude-code/mcp.json
```

**Claude Desktop App:**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

## Configuration Format

Add Reeves to your MCP configuration:

```json
{
  "mcpServers": {
    "reeves": {
      "command": "node",
      "args": [
        "/Users/yourusername/repos/reeves/mcp-server/dist/index.js"
      ],
      "env": {
        "REEVES_ROOT": "/Users/yourusername/private/reeves"
      }
    }
  }
}
```

## Path Configuration

**Replace these paths with your actual locations:**

### 1. MCP Server Path
```
"/Users/yourusername/repos/reeves/mcp-server/dist/index.js"
```
This should point to where you cloned the public Reeves repository.

### 2. Data Directory Path
```
"REEVES_ROOT": "/Users/yourusername/private/reeves"
```
This should point to your **private** data directory containing:
- `tasks.json`
- `projects.json`
- `learning-logs/`
- `artifacts/`
- `queue/`

## Example: Separate Public and Private

**Recommended structure:**

```
/Users/yourusername/repos/reeves/          # Public repo (code)
  ├── mcp-server/
  ├── README.md
  └── ...

/Users/yourusername/repos/ds-dot-com/reeves/  # Private data
  ├── tasks.json
  ├── projects.json
  ├── learning-logs/
  └── artifacts/

/Users/yourusername/repos/ds-dot-com/life-data/  # Private contacts
  └── contacts.json
```

**MCP Config:**
```json
{
  "mcpServers": {
    "reeves": {
      "command": "node",
      "args": [
        "/Users/yourusername/repos/reeves/mcp-server/dist/index.js"
      ],
      "env": {
        "REEVES_ROOT": "/Users/yourusername/repos/ds-dot-com/reeves"
      }
    }
  }
}
```

## Multiple MCP Servers

You can run Reeves alongside other MCP servers:

```json
{
  "mcpServers": {
    "reeves": {
      "command": "node",
      "args": ["/path/to/reeves/mcp-server/dist/index.js"],
      "env": {
        "REEVES_ROOT": "/path/to/private/reeves"
      }
    },
    "other-server": {
      "command": "python",
      "args": ["/path/to/other-server.py"]
    }
  }
}
```

## Verification

After configuring, restart Claude Code and verify Reeves is loaded:

```
You: "Call the how_to tool"
Claude: [Should return Reeves usage guide]
```

Or:

```
You: "List my tasks"
Claude: [Should list tasks from your private data directory]
```

## Troubleshooting

### Server Not Loading

1. **Check paths are absolute** (not relative like `~/repos/...`)
   ```
   ✗ ~/repos/reeves/...
   ✓ /Users/yourusername/repos/reeves/...
   ```

2. **Verify MCP server is built:**
   ```bash
   cd /path/to/reeves/mcp-server
   npm install
   npm run build
   ls dist/index.js  # Should exist
   ```

3. **Check Node.js version:**
   ```bash
   node --version  # Should be 18.0.0 or higher
   ```

4. **Verify REEVES_ROOT directory exists:**
   ```bash
   ls $REEVES_ROOT/tasks.json  # Should exist
   ```

### Permission Issues

Ensure your private data directory is writable:
```bash
chmod 755 /path/to/private/reeves
chmod 644 /path/to/private/reeves/tasks.json
```

### JSON Syntax Errors

Validate your MCP configuration:
```bash
cat ~/.config/claude-code/mcp.json | python -m json.tool
```

If errors, check for:
- Missing commas
- Trailing commas (not allowed in JSON)
- Unescaped backslashes in paths

## Environment Variables

You can set additional environment variables:

```json
{
  "mcpServers": {
    "reeves": {
      "command": "node",
      "args": ["/path/to/reeves/mcp-server/dist/index.js"],
      "env": {
        "REEVES_ROOT": "/path/to/private/reeves",
        "NODE_ENV": "production",
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

## Development Mode

For development, use watch mode:

```json
{
  "mcpServers": {
    "reeves-dev": {
      "command": "npm",
      "args": ["run", "watch"],
      "cwd": "/path/to/reeves/mcp-server",
      "env": {
        "REEVES_ROOT": "/path/to/private/reeves"
      }
    }
  }
}
```

This auto-rebuilds on file changes.

## Security Notes

- **Never** put sensitive data in the public repo
- **Never** commit your MCP config with real paths to git
- Keep `REEVES_ROOT` outside any git repositories
- Use `.gitignore` to protect private data

## Next Steps

1. Configure paths in `mcp.json`
2. Restart Claude Code
3. Test with `how_to` tool
4. Create your first task!
