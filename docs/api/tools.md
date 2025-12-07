# MCP Tools

All Reeves MCP tools available to AI assistants.

## Quick Reference

**Task Management:** `list_tasks`, `list_active_tasks`, `whats_next`, `get_task`, `create_task`, `update_task`, `complete_task`, `delete_task`

**Project Management:** `list_projects`

**Statistics:** `get_stats`

**Queue:** `get_queue`, `add_queue_item`, `process_queue_item`

**Documentation:** `how_to`

---

## Task Management

### how_to()

Get comprehensive usage guide for Reeves.

**Returns:** Complete guide with patterns and examples

```typescript
how_to() → { guide: string }
```

---

### list_tasks({ ...filters })

Get all tasks with optional filtering.

**Parameters:**
- `status` - "pending" | "in_progress" | "completed" | "cancelled" | "blocked" | "skipped"
- `project` - Partial match on project name
- `priority` - "urgent" | "high" | "medium" | "low"
- `assignee` - "daniel" | "reeves"
- `tag` - Partial match on tag

**Examples:**
```typescript
list_tasks({ status: "pending" })
list_tasks({ project: "backend", priority: "high" })
list_tasks({ assignee: "daniel" })
```

---

### list_active_tasks()

Quick way to see all active work (pending, in_progress, or blocked).

```typescript
list_active_tasks() → Task[]
```

---

### whats_next({ assignee? })

Get active tasks with prioritization guidance. Provides data and context for AI reasoning, does NOT make decisions.

**Parameters:**
- `assignee` - Optional: "daniel" | "reeves"

**Returns:**
- `tasks` - Array of active tasks
- `guidance` - Instructions on how to think about priority

```typescript
whats_next() → { tasks: Task[], guidance: string }
whats_next({ assignee: "daniel" })
```

---

### get_task({ id })

Get detailed information about a specific task.

**Parameters:**
- `id` - Task ID (required)

```typescript
get_task({ id: 42 }) → Task
```

---

### create_task({ content, assignee, project, ... })

Create a new task. **Always provide content, assignee, and project at minimum.**

**Required:**
- `content` - What needs to be done (imperative: "Fix bug")
- `assignee` - "daniel" (human) or "reeves" (AI)
- `project` - Project slug (lowercase-with-dashes)

**Optional:**
- `activeForm` - Present continuous ("Fixing bug")
- `priority` - "urgent" | "high" | "medium" | "low"
- `tags` - Array of tags
- `notes` - Context and details

**Examples:**
```typescript
create_task({
  content: "Research database options",
  assignee: "reeves",
  project: "backend-redesign"
})

create_task({
  content: "Fix login redirect loop",
  assignee: "reeves",
  project: "backend-bugs",
  priority: "urgent",
  tags: ["bug", "auth"],
  notes: "Users stuck in redirect after password reset"
})
```

---

### update_task({ id, ...changes })

Modify an existing task.

**Required:**
- `id` - Task ID

**Optional (at least one):**
- `status` - Change status
- `priority` - Change priority
- `notes` - Add notes (appended with timestamp)
- `tags` - Replace tags
- `content` - Change description
- `activeForm` - Change active form
- `project` - Move to different project
- `assignee` - Reassign

**Examples:**
```typescript
update_task({ id: 42, status: "in_progress" })
update_task({ id: 42, notes: "Update: need to change schema first" })
update_task({ id: 42, priority: "urgent", tags: ["critical"] })
```

---

### complete_task({ id, notes? })

Mark task as completed with optional completion notes.

**Parameters:**
- `id` - Task ID (required)
- `notes` - What was done, outcomes, follow-ups (optional but recommended)

**Example:**
```typescript
complete_task({
  id: 42,
  notes: "Chose PostgreSQL. Better transaction support. Migration plan in learning log."
})
```

**Best practice:** Always add completion notes.

---

### delete_task({ id })

Permanently delete a task. **Use sparingly** - prefer marking as cancelled/skipped.

**Parameters:**
- `id` - Task ID (required)

**Warning:** Deletion is permanent. Prefer:
```typescript
update_task({ id: 42, status: "cancelled", notes: "Why cancelled" })
```

---

## Project Management

### list_projects()

Get all projects with their metadata.

**Returns:** Array of projects with slug, owner, status, context_file, notes

```typescript
list_projects() → Project[]
```

**Example result:**
```json
[
  {
    "slug": "backend-redesign",
    "owner": "reeves",
    "status": "active",
    "context_file": "/reeves/learning-logs/2025-12-backend.md",
    "notes": "Redesigning backend for scale"
  }
]
```

---

## Statistics

### get_stats()

Get task statistics and counts.

**Returns:**
- `total` - Total task count
- `by_status` - Count per status
- `by_priority` - Count per priority
- `by_project` - Count per project
- `by_assignee` - Count per assignee

```typescript
get_stats() → {
  total: number,
  by_status: Record<string, number>,
  by_priority: Record<string, number>,
  by_project: Record<string, number>,
  by_assignee: Record<string, number>
}
```

---

## Queue Management

### get_queue()

Get all unprocessed items from the queue.

```typescript
get_queue() → QueueItem[]
```

---

### add_queue_item({ type, content, ... })

Add item to queue for later processing.

**Parameters:**
- `type` - "general-note" | "project-note" | "task-note" | "progress-report"
- `content` - Note content (required)
- `task_id` - For task-note type
- `project` - For project-note type

**Examples:**
```typescript
add_queue_item({
  type: "general-note",
  content: "Research framework options"
})

add_queue_item({
  type: "project-note",
  project: "backend-redesign",
  content: "Team decided on PostgreSQL"
})
```

---

### process_queue_item({ filename })

Mark queue item as processed and move to processed folder.

**Parameters:**
- `filename` - Queue item filename (e.g., "1733001234567.json")

```typescript
process_queue_item({ filename: "1733001234567.json" })
```

---

## Common Patterns

### Starting a Session
```typescript
// Check what's active
list_active_tasks()

// Get prioritization guidance
whats_next()

// Start highest priority task
update_task({ id: 42, status: "in_progress" })
```

### Creating Related Tasks
```typescript
// Create main task
const task = create_task({
  content: "Research database options",
  assignee: "reeves",
  project: "backend-redesign"
})

// Create follow-up
create_task({
  content: "Design schema",
  assignee: "reeves",
  project: "backend-redesign",
  notes: `Depends on task #${task.id}`
})
```

### Completing Work
```typescript
// Complete with notes
complete_task({
  id: 42,
  notes: "Chose PostgreSQL. See learning log."
})

// Create next task
create_task({
  content: "Implement migration",
  assignee: "reeves",
  project: "backend-redesign",
  notes: "Following completion of task #42"
})
```

---

## Error Handling

All tools return errors in consistent format:
```typescript
{
  error: string,
  code?: string
}
```

**Common errors:**
- Task not found: `{ error: "Task not found", code: "TASK_NOT_FOUND" }`
- Invalid status: `{ error: "Invalid status", code: "INVALID_STATUS" }`
- Missing field: `{ error: "Missing required field: content" }`
