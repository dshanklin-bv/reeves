# MCP Tools Reference

Complete reference for all Reeves MCP tools available to AI assistants.

## Task Management Tools

### how_to

Get comprehensive usage guide for Reeves.

**When to use:** First time using Reeves or need refresher on patterns.

```typescript
how_to() → { guide: string }
```

**Example:**
```
Claude: [Calls how_to]
Returns: Complete guide with tool signatures, patterns, and examples
```

---

### list_tasks

Get all tasks with optional filtering.

```typescript
list_tasks({
  status?: "pending" | "in_progress" | "completed" | "cancelled" | "blocked" | "skipped",
  project?: string,    // Partial match on project name
  priority?: "urgent" | "high" | "medium" | "low",
  assignee?: "daniel" | "reeves",
  tag?: string        // Partial match on tag
}) → Task[]
```

**Parameters:**
- `status` - Filter by task status
- `project` - Filter by project name (partial match)
- `priority` - Filter by priority level
- `assignee` - Filter by who's responsible
- `tag` - Filter by tag (partial match)

**Returns:** Array of matching tasks

**Examples:**
```typescript
// All pending tasks
list_tasks({ status: "pending" })

// High priority tasks in backend-redesign project
list_tasks({ project: "backend-redesign", priority: "high" })

// All tasks assigned to daniel
list_tasks({ assignee: "daniel" })

// All tasks tagged with "bug"
list_tasks({ tag: "bug" })
```

---

### list_active_tasks

Quick way to see all active work (pending, in_progress, or blocked).

```typescript
list_active_tasks() → Task[]
```

**Returns:** Array of active tasks

**Example:**
```typescript
// Get all active tasks
list_active_tasks()
```

**Equivalent to:**
```typescript
// Tasks where status is pending, in_progress, or blocked
```

---

### whats_next

Get active tasks with prioritization guidance. Does NOT make decisions - provides data and context for AI reasoning.

```typescript
whats_next({
  assignee?: "daniel" | "reeves"  // Optional: filter by assignee
}) → {
  tasks: Task[],
  guidance: string
}
```

**Parameters:**
- `assignee` - Optional filter by who's responsible

**Returns:**
- `tasks` - Array of active tasks
- `guidance` - Instructions on how to think about priority

**Example:**
```typescript
// Get prioritization guidance for all tasks
whats_next()

// Get what daniel should work on
whats_next({ assignee: "daniel" })
```

**Note:** This tool provides reasoning framework, not decisions. AI should evaluate based on notes, context, and user needs.

---

### get_task

Get detailed information about a specific task by ID.

```typescript
get_task({
  id: number  // Required: Task ID
}) → Task
```

**Parameters:**
- `id` - Task ID (required)

**Returns:** Full task object with all details

**Example:**
```typescript
// Get task #42
get_task({ id: 42 })
```

---

### create_task

Create a new task. **Always provide content, assignee, and project at minimum.**

```typescript
create_task({
  content: string,           // Required: "Do X" (imperative form)
  assignee: string,          // Required: "daniel" or "reeves"
  project: string,           // Required: "project-slug"
  activeForm?: string,       // Optional: "Doing X" (defaults to content)
  priority?: string,         // Optional: "urgent" | "high" | "medium" | "low"
  tags?: string[],           // Optional: Array of tags
  notes?: string            // Optional: Context, details, instructions
}) → Task
```

**Required Parameters:**
- `content` - What needs to be done (imperative: "Fix bug", "Research options")
- `assignee` - Who's responsible ("daniel" for human, "reeves" for AI)
- `project` - Which project this belongs to (lowercase-with-dashes)

**Optional Parameters:**
- `activeForm` - Present continuous form ("Fixing bug"). Defaults to content if not provided.
- `priority` - Urgency level (default: "medium")
- `tags` - Array of tags for filtering
- `notes` - Detailed context, constraints, or instructions

**Returns:** Newly created task with generated ID

**Examples:**
```typescript
// Basic task
create_task({
  content: "Research database options",
  assignee: "reeves",
  project: "backend-redesign"
})

// Task with full details
create_task({
  content: "Fix login redirect loop",
  activeForm: "Fixing login redirect loop",
  assignee: "reeves",
  project: "backend-bugs",
  priority: "urgent",
  tags: ["bug", "auth", "user-facing"],
  notes: "Users report getting stuck in redirect loop after password reset. Check auth middleware."
})
```

---

### update_task

Modify an existing task. Can update any field.

```typescript
update_task({
  id: number,               // Required: Task ID
  status?: string,          // Optional: New status
  priority?: string,        // Optional: New priority
  notes?: string,           // Optional: Additional notes (appended)
  tags?: string[],          // Optional: New tags (replaces existing)
  content?: string,         // Optional: New content
  activeForm?: string,      // Optional: New active form
  project?: string,         // Optional: Move to different project
  assignee?: string         // Optional: Reassign task
}) → Task
```

**Required Parameters:**
- `id` - Task ID to update

**Optional Parameters (at least one required):**
- `status` - Change task status
- `priority` - Change priority level
- `notes` - Add notes (appended to existing with timestamp)
- `tags` - Replace tags
- `content` - Change task description
- `activeForm` - Change active form
- `project` - Move to different project
- `assignee` - Reassign to daniel/reeves

**Returns:** Updated task

**Examples:**
```typescript
// Mark task as in progress
update_task({
  id: 42,
  status: "in_progress"
})

// Add notes to task
update_task({
  id: 42,
  notes: "Discovered we need to update schema first"
})

// Change priority and add tag
update_task({
  id: 42,
  priority: "urgent",
  tags: ["critical", "blocking"]
})
```

---

### complete_task

Mark a task as completed with optional completion notes.

```typescript
complete_task({
  id: number,        // Required: Task ID
  notes?: string     // Optional: What was done, outcomes, follow-ups
}) → Task
```

**Parameters:**
- `id` - Task ID (required)
- `notes` - Completion notes (optional but recommended)

**Returns:** Completed task with timestamp

**Example:**
```typescript
// Complete with notes
complete_task({
  id: 42,
  notes: "Chose PostgreSQL. Better transaction support and team has more experience. Migration plan documented in learning log."
})

// Complete without notes
complete_task({ id: 42 })
```

**Best Practice:** Always add completion notes to preserve context.

---

### delete_task

Permanently delete a task by ID. **Use sparingly** - prefer marking as cancelled/skipped.

```typescript
delete_task({
  id: number  // Required: Task ID
}) → {
  success: boolean,
  deleted: number  // Task ID that was deleted
}
```

**Parameters:**
- `id` - Task ID (required)

**Returns:**
- `success` - Whether deletion succeeded
- `deleted` - ID of deleted task

**Example:**
```typescript
// Delete task #42
delete_task({ id: 42 })
```

**Warning:** Deletion is permanent. Prefer:
- `update_task({ id: 42, status: "cancelled", notes: "Why cancelled" })`
- `update_task({ id: 42, status: "skipped", notes: "Why skipped" })`

---

## Project Management Tools

### list_projects

Get all projects with their metadata.

```typescript
list_projects() → Project[]
```

**Returns:** Array of all projects with:
- Project slug/name
- Owner (daniel/reeves)
- Status (active, on-hold, completed, cancelled, archived)
- Context file path
- Notes

**Example:**
```typescript
// List all projects
list_projects()

// Returns:
// [
//   {
//     slug: "backend-redesign",
//     owner: "reeves",
//     status: "active",
//     context_file: "/reeves/learning-logs/2025-12-backend-redesign.md",
//     notes: "Redesigning backend for scale"
//   },
//   ...
// ]
```

---

## Statistics Tools

### get_stats

Get task statistics and counts.

```typescript
get_stats() → {
  total: number,
  by_status: Record<string, number>,
  by_priority: Record<string, number>,
  by_project: Record<string, number>,
  by_assignee: Record<string, number>
}
```

**Returns:**
- `total` - Total number of tasks
- `by_status` - Count per status
- `by_priority` - Count per priority
- `by_project` - Count per project
- `by_assignee` - Count per assignee

**Example:**
```typescript
get_stats()

// Returns:
// {
//   total: 150,
//   by_status: {
//     pending: 45,
//     in_progress: 3,
//     completed: 98,
//     blocked: 4
//   },
//   by_priority: {
//     urgent: 2,
//     high: 15,
//     medium: 80,
//     low: 53
//   },
//   by_project: {
//     "backend-redesign": 12,
//     "house-sale": 8,
//     ...
//   },
//   by_assignee: {
//     daniel: 65,
//     reeves: 85
//   }
// }
```

---

## Queue Management Tools

### get_queue

Get all unprocessed items from the queue.

```typescript
get_queue() → QueueItem[]
```

**Returns:** Array of unprocessed queue items

**Example:**
```typescript
get_queue()

// Returns:
// [
//   {
//     filename: "1733001234567.json",
//     type: "general-note",
//     content: "Remember to follow up with John",
//     timestamp: "2025-12-06T10:00:00Z"
//   },
//   ...
// ]
```

---

### add_queue_item

Add a new item to the queue for later processing.

```typescript
add_queue_item({
  type: "general-note" | "project-note" | "task-note" | "progress-report",
  content: string,          // Required: Content of the note
  task_id?: number,         // Optional: For task-note type
  project?: string          // Optional: For project-note type
}) → QueueItem
```

**Parameters:**
- `type` - Type of queue item (required)
- `content` - Note content (required)
- `task_id` - Task ID (required for task-note type)
- `project` - Project name (required for project-note type)

**Returns:** Created queue item

**Examples:**
```typescript
// General note
add_queue_item({
  type: "general-note",
  content: "Research new framework options"
})

// Project-specific note
add_queue_item({
  type: "project-note",
  project: "backend-redesign",
  content: "Team meeting notes: Decided on PostgreSQL"
})

// Task-specific note
add_queue_item({
  type: "task-note",
  task_id: 42,
  content: "Blocked waiting for API documentation"
})
```

---

### process_queue_item

Mark a queue item as processed and move it to processed folder.

```typescript
process_queue_item({
  filename: string  // Required: Queue item filename
}) → {
  success: boolean
}
```

**Parameters:**
- `filename` - Queue item filename (e.g., "1733001234567.json")

**Returns:**
- `success` - Whether processing succeeded

**Example:**
```typescript
// Process queue item
process_queue_item({
  filename: "1733001234567.json"
})
```

---

## Tool Usage Patterns

### Starting a Session

```typescript
// 1. Check what's active
list_active_tasks()

// 2. Get prioritization guidance
whats_next()

// 3. Start highest priority task
update_task({ id: 42, status: "in_progress" })
```

### Creating Related Tasks

```typescript
// 1. Create main task
const task = create_task({
  content: "Research database options",
  assignee: "reeves",
  project: "backend-redesign",
  priority: "high"
})

// 2. Create follow-up tasks
create_task({
  content: "Design database schema",
  assignee: "reeves",
  project: "backend-redesign",
  notes: `Depends on task #${task.id} completing`
})
```

### Completing Work

```typescript
// 1. Complete task with notes
complete_task({
  id: 42,
  notes: "Chose PostgreSQL. See learning log for full analysis."
})

// 2. Create follow-up tasks
create_task({
  content: "Implement PostgreSQL migration",
  assignee: "reeves",
  project: "backend-redesign",
  notes: "Following completion of research task #42"
})
```

## Error Handling

All tools return errors in consistent format:

```typescript
{
  error: string,      // Error message
  code?: string      // Optional error code
}
```

**Common Errors:**
- Task not found: `{ error: "Task not found", code: "TASK_NOT_FOUND" }`
- Invalid status: `{ error: "Invalid status", code: "INVALID_STATUS" }`
- Missing required field: `{ error: "Missing required field: content" }`

## Next Steps

- [Task Schema Reference](/api/task-schema)
- [Project Schema Reference](/api/project-schema)
- [AI Assistant Guide](/guide/ai-assistant-guide)
- [Getting Started](/guide/getting-started)

---

**Complete tool reference for AI-first task management.**
