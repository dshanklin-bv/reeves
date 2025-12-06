# Reeves - AI Task Management System

> **Personal AI assistant powered by MCP for task management, project coordination, and life organization.**

Reeves is a persistent task management system designed for AI-first workflows. It maintains state across Claude Code sessions, manages complex projects, and helps coordinate life's moving parts.

## ⚠️ Privacy Notice

**This repository contains only the Reeves framework code.** User data (tasks, contacts, learning logs) is stored locally in your private directory and never committed to version control.

## Features

- **Persistent Task Management** - Tasks survive across sessions
- **Project Organization** - Group related work with context files
- **AI-First Design** - Built for AI reasoning, not rigid automation
- **MCP Integration** - Native Model Context Protocol support
- **Contact Enrichment** - Communication preferences and relationship context
- **Learning Logs** - Capture project history and strategic decisions
- **Queue System** - Capture ideas and notes for later processing

## Architecture

```
/your-private-location/
├── reeves/                  # Your private data (never shared)
│   ├── tasks.json          # Active tasks
│   ├── projects.json       # Project metadata
│   ├── learning-logs/      # Project context and history
│   ├── artifacts/          # Documents and evidence
│   └── queue/              # Unprocessed items
└── life-data/
    └── contacts.json       # Contact info with communication prefs

/path-to-this-repo/
├── mcp-server/             # MCP server implementation
├── schemas/                # JSON schemas and templates
└── ARCHITECTURE.md         # Data management rules
```

## Installation

### Prerequisites

- Node.js 18+ and npm
- Claude Code CLI (for MCP integration)
- Git

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
# Create your private Reeves data directory (example location)
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

**Important:** Replace paths with your actual locations:
- `/path/to/reeves/` → where you cloned this repo
- `/path/to/your/private/reeves` → your private data directory

### 6. Restart Claude Code

```bash
# Restart Claude Code to load the MCP server
# The server will be available in your next Claude Code session
```

## Quick Start

### Using with Claude Code

Once configured, Reeves tools are available in Claude Code:

```
You: "Create a task to research database options"
Claude: [Uses reeves tools to create task]

You: "What's next?"
Claude: [Uses whats_next to show prioritized tasks]

You: "Mark task 5 as complete"
Claude: [Uses complete_task with notes]
```

### Available Tools

- `how_to` - Get comprehensive usage guide
- `list_tasks` - List tasks with filters (status, project, priority, tag)
- `list_active_tasks` - Quick view of pending/in_progress/blocked tasks
- `whats_next` - Active tasks with prioritization guidance
- `get_task` - Get detailed task information
- `create_task` - Create new task
- `update_task` - Modify task (status, notes, priority, tags)
- `complete_task` - Mark task complete with notes
- `delete_task` - Remove task
- `list_projects` - Show all projects
- `get_stats` - Task statistics and counts

### Task Lifecycle

```
pending → in_progress → completed
   ↓           ↓
blocked    cancelled/skipped
```

**Best Practice:** Only ONE task should be `in_progress` at a time.

## Data Management

Reeves follows a **lean contact** principle:

- **Contacts** (`life-data/contacts.json`) - Communication preferences, recent interactions only
- **Learning Logs** (`reeves/learning-logs/`) - Project context, interviews, strategic decisions
- **Artifacts** (`reeves/artifacts/`) - Evidence, documents, timelines

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for complete data management rules.

## Task Structure

```json
{
  "id": 42,
  "content": "Research database options",
  "activeForm": "Researching database options",
  "status": "pending",
  "assignee": "reeves",
  "project": "backend-redesign",
  "priority": "high",
  "tags": ["research", "database"],
  "notes": "Need to compare PostgreSQL vs MongoDB for new backend",
  "created": "2025-12-06T10:00:00Z"
}
```

## Project Structure

```json
{
  "backend-redesign": {
    "owner": "reeves",
    "status": "active",
    "context_file": "/reeves/learning-logs/2025-12-backend-redesign.md",
    "notes": "Redesigning backend architecture for scale"
  }
}
```

## Philosophy

Reeves is designed for **AI reasoning, not rigid automation**:

- Read all tasks and understand dependencies naturally
- Make judgment calls about task priority
- Skip overly complex dependency systems
- Trust plain English notes over strict schemas

**Build for understanding, not just execution.**

## Examples

See [`examples/`](./examples/) for:
- Sample project workflows
- Task management patterns
- Learning log templates
- Contact management examples

## Development

```bash
# Watch mode for development
cd mcp-server
npm run watch

# Type checking
npm run typecheck

# Build
npm run build
```

## Security & Privacy

### What's Public (This Repo)
- MCP server TypeScript code
- Documentation and examples
- JSON schemas and templates

### What's Private (Your Data)
- All tasks and projects
- Contact information
- Learning logs and artifacts
- Queue items

**Never commit your private data to any repository.**

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

**Important:** Never include personal data in pull requests.

## Scaling

Reeves uses JSON files for simplicity. Current limits:

- **Tasks:** ~200-300 (performance starts degrading)
- **Contacts:** ~50-100 (file size manageable)

For larger scale, see `ARCHITECTURE.md` for migration path to SQLite/Postgres.

## Troubleshooting

### MCP Server Not Loading

1. Check paths in `mcp.json` are correct
2. Verify `REEVES_ROOT` points to your private data directory
3. Ensure MCP server is built: `cd mcp-server && npm run build`
4. Check Claude Code logs for errors

### Tasks Not Persisting

1. Verify `tasks.json` exists in your `REEVES_ROOT` directory
2. Check file permissions (must be writable)
3. Ensure JSON is valid (no syntax errors)

### Can't Find Tools

1. Restart Claude Code after MCP config changes
2. Use `how_to` tool to verify Reeves is loaded
3. Check MCP server is in config: `cat ~/.config/claude-code/mcp.json`

## License

MIT License - See [LICENSE](./LICENSE)

## Author

Daniel Shanklin ([@dshanklin-bv](https://github.com/dshanklin-bv))

## Acknowledgments

Built with:
- [Model Context Protocol](https://modelcontextprotocol.io/) by Anthropic
- [Claude Code](https://claude.com/claude-code) CLI
- TypeScript & Node.js

---

**Questions?** Open an issue or reach out on GitHub.
