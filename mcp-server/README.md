# Reeves MCP Server

Deterministic API layer for Reeves task management system.

## Architecture

```
┌─────────────────┐
│  Reeves MCP     │  ← Business logic, validation, storage
│   Server        │
└────────┬────────┘
         │
    ─────┴─────
    │         │
┌───▼────┐ ┌──▼──────┐
│ Claude │ │ Web App │  ← Both clients use same tools
│  Code  │ │         │
└────────┘ └─────────┘
```

## Installation

### 1. Build the server

```bash
cd /Users/dshanklinbv/repos/ds-dot-com/reeves/mcp-server
npm install
npm run build
```

### 2. Add to Claude Code config

Edit `~/.claude/config/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "reeves": {
      "command": "node",
      "args": [
        "/Users/dshanklinbv/repos/ds-dot-com/reeves/mcp-server/dist/index.js"
      ],
      "env": {
        "REEVES_ROOT": "/Users/dshanklinbv/repos/ds-dot-com/reeves"
      }
    }
  }
}
```

### 3. Restart Claude Code

Quit and reopen Claude Code to load the MCP server.

## Available Tools

### Task Management

- **`mcp__reeves__list_tasks`** - Get all tasks (optionally filtered)
  ```
  { status: 'pending', project: '239-eagle-dr-house-sale', priority: 'urgent' }
  ```

- **`mcp__reeves__get_task`** - Get specific task
  ```
  { id: 35 }
  ```

- **`mcp__reeves__create_task`** - Create new task
  ```
  { content: 'Send flowers', project: 'personal', assignee: 'daniel', priority: 'high' }
  ```

- **`mcp__reeves__update_task`** - Update task
  ```
  { id: 35, status: 'completed', notes: 'Called sheriff at 2pm' }
  ```

- **`mcp__reeves__complete_task`** - Mark task complete
  ```
  { id: 35, notes: 'Finished around noon' }
  ```

### Project Management

- **`mcp__reeves__list_projects`** - Get all projects with metadata

### Queue Management

- **`mcp__reeves__get_queue`** - Get all unprocessed queue items

- **`mcp__reeves__process_queue_item`** - Mark item processed
  ```
  { filename: '1733001234567.json' }
  ```

## Data Storage

**Individual task files:**
```
reeves/tasks/
  1.json   ← Task #1
  35.json  ← Task #35
  63.json  ← Task #63
```

**Projects metadata:**
```
reeves/projects.json
```

**Queue (unchanged):**
```
reeves/queue/
  1733001234567.json
  1733001235891.json
reeves/queue/processed/
  ...
```

## Benefits

1. **Atomic updates** - Only one task file modified per operation
2. **No corruption** - Can't hallucinate unrelated tasks
3. **Deterministic** - Same tools for Claude Code and web app
4. **Extensible** - Add features to server without changing clients
5. **Validated** - Server enforces business rules

## Example Usage

**Claude Code session:**

```
Me: "Morning! Let me check the queue..."

[mcp__reeves__get_queue()]
→ Returns all queue items

Me: "I see 3 notes. Processing..."

[mcp__reeves__complete_task({ id: 1, notes: 'Dump run done' })]
[mcp__reeves__create_task({ content: 'Send flowers', ... })]
[mcp__reeves__process_queue_item({ filename: '...' })]

Me: "✓ Queue cleared!"
```

**Web app:**

```typescript
// Same tools via MCP client library
const tasks = await mcp.call('mcp__reeves__list_tasks', { status: 'pending' });
```

## Development

**Watch mode:**
```bash
npm run dev
```

**Rebuild:**
```bash
npm run build
```

## Migration

The migration script (`migrate.js`) splits `tasks.json` into individual files. Already run during setup.

**Rollback if needed:**
```bash
rm -rf tasks/
mv tasks.json.backup tasks.json
```
