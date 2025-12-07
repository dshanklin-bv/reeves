# Installation

Complete installation guide for Reeves with platform-specific instructions.

## Prerequisites

Before installing Reeves, ensure you have:

- **Node.js 18+** and npm
- **Git** for version control
- **Claude Code CLI** installed and configured
- **Terminal/Shell** access

### Check Prerequisites

```bash
# Check Node.js version (should be 18.0.0 or higher)
node --version

# Check npm
npm --version

# Check Git
git --version

# Check Claude Code
claude --version
```

## Installation Steps

### 1. Clone Repository

```bash
# Navigate to your preferred directory
cd ~/repos

# Clone the Reeves repository
git clone git@github.com:dshanklin-bv/reeves.git
cd reeves
```

::: tip Using HTTPS instead of SSH
If you prefer HTTPS:
```bash
git clone https://github.com/dshanklin-bv/reeves.git
```
:::

### 2. Install MCP Server Dependencies

```bash
cd mcp-server
npm install
npm run build
```

This will:
- Install all Node.js dependencies
- Compile TypeScript to JavaScript
- Create the `dist/` directory with compiled code

### 3. Create Private Data Directory

Your Reeves data should live in a **private** location, separate from the code repository.

```bash
# Option 1: Simple private directory
mkdir -p ~/private/reeves/{learning-logs,artifacts,queue}
mkdir -p ~/private/life-data

# Option 2: Keep with other personal data
mkdir -p ~/Documents/reeves/{learning-logs,artifacts,queue}
mkdir -p ~/Documents/life-data

# Option 3: Your own structure
mkdir -p /path/to/your/private/reeves/{learning-logs,artifacts,queue}
mkdir -p /path/to/your/private/life-data
```

::: warning Keep Data Private
Never put your private data directory inside a git repository. This keeps your personal tasks, contacts, and notes secure.
:::

### 4. Initialize Data Files

```bash
# Navigate to Reeves repo
cd ~/repos/reeves

# Copy templates to your private directory
cp templates/tasks.json.template ~/private/reeves/tasks.json
cp templates/projects.json.template ~/private/reeves/projects.json
cp templates/contacts.json.template ~/private/life-data/contacts.json
```

::: tip Customize Paths
Replace `~/private/reeves` with your chosen private data directory path.
:::

### 5. Configure MCP Server

#### Find Your MCP Configuration File

**Claude Code CLI:**
```bash
~/.config/claude-code/mcp.json
```

**Claude Desktop App (macOS):**
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

#### Create or Edit Configuration

Open your MCP configuration file and add the Reeves server:

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

::: danger Use Absolute Paths
Always use **absolute paths**, not relative paths like `~/repos/...`

❌ Bad: `"~/repos/reeves/mcp-server/dist/index.js"`
✅ Good: `"/Users/yourusername/repos/reeves/mcp-server/dist/index.js"`
:::

#### Find Your Absolute Paths

```bash
# Get absolute path to Reeves repo
cd ~/repos/reeves && pwd
# Example output: /Users/yourusername/repos/reeves

# Get absolute path to private data directory
cd ~/private/reeves && pwd
# Example output: /Users/yourusername/private/reeves
```

#### Example Configuration

Replace these paths with your actual paths:

```json
{
  "mcpServers": {
    "reeves": {
      "command": "node",
      "args": [
        "/Users/daniel/repos/reeves/mcp-server/dist/index.js"
      ],
      "env": {
        "REEVES_ROOT": "/Users/daniel/private/reeves"
      }
    }
  }
}
```

### 6. Restart Claude Code

```bash
# Quit Claude Code completely
# Then restart it

# Or use CLI if available
claude restart
```

The MCP server will be loaded on next Claude Code session.

## Verify Installation

### Check MCP Server is Loaded

Start Claude Code and ask:

```
You: "Call the how_to tool"
Claude: [Should return Reeves usage guide]
```

Or:

```
You: "List my tasks"
Claude: [Should return empty task list from your new tasks.json]
```

### Check File Paths

```bash
# Verify data files exist
ls -la ~/private/reeves/tasks.json
ls -la ~/private/reeves/projects.json
ls -la ~/private/life-data/contacts.json

# Verify directories exist
ls -la ~/private/reeves/learning-logs
ls -la ~/private/reeves/artifacts
ls -la ~/private/reeves/queue
```

## Platform-Specific Notes

### macOS

- Use **Terminal.app** or **iTerm2**
- Paths typically start with `/Users/yourusername/`
- Claude Code config: `~/.config/claude-code/mcp.json`

### Linux

- Paths typically start with `/home/yourusername/`
- Claude Code config: `~/.config/claude-code/mcp.json`
- Ensure Node.js is installed via your package manager

```bash
# Ubuntu/Debian
sudo apt install nodejs npm

# Fedora
sudo dnf install nodejs npm

# Arch
sudo pacman -S nodejs npm
```

### Windows (WSL)

Reeves works best in **Windows Subsystem for Linux (WSL)**:

```bash
# Install WSL if needed
wsl --install

# Then follow Linux installation steps
```

## Troubleshooting

### MCP Server Not Loading

**Problem:** Claude Code doesn't recognize Reeves tools

**Solutions:**

1. **Check paths are absolute**
   ```bash
   # ❌ Wrong: ~/repos/reeves/...
   # ✅ Right: /Users/yourusername/repos/reeves/...
   ```

2. **Verify MCP server is built**
   ```bash
   cd ~/repos/reeves/mcp-server
   npm run build
   ls dist/index.js  # Should exist
   ```

3. **Check Node.js version**
   ```bash
   node --version  # Should be 18.0.0 or higher
   ```

4. **Verify REEVES_ROOT exists**
   ```bash
   ls $REEVES_ROOT/tasks.json  # Should exist
   ```

5. **Check MCP config syntax**
   ```bash
   cat ~/.config/claude-code/mcp.json | python -m json.tool
   # Should show no JSON errors
   ```

### Tasks Not Persisting

**Problem:** Tasks disappear after restarting Claude Code

**Solutions:**

1. **Verify tasks.json exists**
   ```bash
   ls -la ~/private/reeves/tasks.json
   ```

2. **Check file permissions**
   ```bash
   # Should be writable
   chmod 644 ~/private/reeves/tasks.json
   ```

3. **Validate JSON syntax**
   ```bash
   cat ~/private/reeves/tasks.json | python -m json.tool
   # Should show no JSON errors
   ```

4. **Check REEVES_ROOT path**
   - Ensure it matches your MCP configuration
   - Use absolute path, not relative

### Permission Denied Errors

**Problem:** Cannot write to tasks.json or other files

**Solutions:**

```bash
# Make directory writable
chmod 755 ~/private/reeves

# Make files writable
chmod 644 ~/private/reeves/tasks.json
chmod 644 ~/private/reeves/projects.json
chmod 644 ~/private/life-data/contacts.json
```

### Node Module Errors

**Problem:** `Cannot find module` errors

**Solutions:**

```bash
# Clean install
cd ~/repos/reeves/mcp-server
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Claude Code Not Finding MCP Config

**Problem:** MCP configuration not being read

**Solutions:**

1. **Check config file location**
   ```bash
   # Should be here
   ls ~/.config/claude-code/mcp.json
   ```

2. **Create directory if missing**
   ```bash
   mkdir -p ~/.config/claude-code
   ```

3. **Validate JSON**
   ```bash
   cat ~/.config/claude-code/mcp.json | python -m json.tool
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
    },
    "another-server": {
      "command": "node",
      "args": ["/path/to/another/server.js"]
    }
  }
}
```

## Development Setup

If you're contributing to Reeves or want to modify it:

```bash
# Clone repository
git clone git@github.com:dshanklin-bv/reeves.git
cd reeves/mcp-server

# Install dependencies
npm install

# Watch mode (auto-rebuild on changes)
npm run watch

# Type checking
npm run typecheck

# Build for production
npm run build
```

## Environment Variables

Optional environment variables for advanced configuration:

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

## Next Steps

Now that Reeves is installed:

1. [Create your first task](/guide/getting-started#your-first-task)
2. [Learn about task management](/guide/tasks)
3. [Set up project organization](/guide/projects)
4. [Configure contact management](/guide/contacts)
5. [Read the AI Assistant Guide](/guide/ai-assistant-guide) (if you're an AI)

## Updating Reeves

To update to the latest version:

```bash
# Pull latest code
cd ~/repos/reeves
git pull origin main

# Rebuild MCP server
cd mcp-server
npm install
npm run build

# Restart Claude Code
claude restart
```

## Uninstalling Reeves

To remove Reeves:

1. **Remove MCP configuration**
   ```bash
   # Edit ~/.config/claude-code/mcp.json
   # Remove the "reeves" section
   ```

2. **Remove code repository**
   ```bash
   rm -rf ~/repos/reeves
   ```

3. **Keep or remove your data** (optional)
   ```bash
   # Your tasks, contacts, logs are in ~/private/reeves
   # Only delete if you don't need this data anymore
   # rm -rf ~/private/reeves
   # rm -rf ~/private/life-data
   ```

4. **Restart Claude Code**

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting Guide](/guide/troubleshooting)
2. Review [GitHub Issues](https://github.com/dshanklin-bv/reeves/issues)
3. Open a new issue with:
   - Your operating system
   - Node.js version
   - Error messages
   - Steps to reproduce

---

**Installation complete!** You're ready to use Reeves with Claude Code.
