# Task Schema Reference

Complete reference for task data structure in Reeves.

## Task Interface

```typescript
interface Task {
  id: number;
  content: string;
  activeForm: string;
  status: TaskStatus;
  assignee: Assignee;
  project: string;
  priority: Priority;
  tags: string[];
  notes: string;
  created: string;
  updated: string;
  completed?: string;
}
```

## Field Definitions

### id

**Type:** `number`
**Required:** Yes (auto-generated)
**Unique:** Yes

Task identifier. Auto-incremented starting from 1.

```json
{
  "id": 42
}
```

---

### content

**Type:** `string`
**Required:** Yes
**Format:** Imperative form ("Do X")

What needs to be done. Should be clear, actionable, and concise.

**Examples:**
```json
{
  "content": "Research database options"
}
{
  "content": "Fix login redirect loop"
}
{
  "content": "Call contractor about kitchen repair"
}
```

**Best Practices:**
- Use imperative mood ("Fix", "Research", "Call")
- Be specific ("Fix login bug" not "Fix thing")
- Keep under 100 characters
- Put details in `notes` field

---

### activeForm

**Type:** `string`
**Required:** No (defaults to content)
**Format:** Present continuous ("Doing X")

How the task appears when in progress.

**Examples:**
```json
{
  "content": "Research database options",
  "activeForm": "Researching database options"
}
{
  "content": "Fix login bug",
  "activeForm": "Fixing login bug"
}
```

**When to set manually:**
- Content doesn't convert well to continuous form
- Want specific wording for status display

---

### status

**Type:** `TaskStatus`
**Required:** Yes (defaults to "pending")
**Enum:** `"pending" | "in_progress" | "completed" | "blocked" | "cancelled" | "skipped"`

Current state of the task.

```typescript
type TaskStatus =
  | "pending"      // Ready to start
  | "in_progress"  // Currently working (ONLY ONE at a time)
  | "completed"    // Successfully finished
  | "blocked"      // Cannot proceed (dependency/blocker)
  | "cancelled"    // No longer needed
  | "skipped";     // Intentionally not doing
```

**Status Flow:**
```
pending → in_progress → completed
   ↓           ↓
blocked    cancelled/skipped
```

**Examples:**
```json
{ "status": "pending" }
{ "status": "in_progress" }
{ "status": "blocked" }
```

---

### assignee

**Type:** `Assignee`
**Required:** Yes
**Enum:** `"daniel" | "reeves"`

Who is responsible for completing the task.

```typescript
type Assignee =
  | "daniel"   // Human (you)
  | "reeves";  // AI assistant
```

**When to use "daniel":**
- Tasks requiring human judgment
- Phone calls, meetings
- Physical work
- Final decision-making

**When to use "reeves":**
- Research and analysis
- Drafting documents
- Data processing
- Technical implementation

**Examples:**
```json
{ "assignee": "daniel" }  // Call contractor
{ "assignee": "reeves" }  // Research options
```

---

### project

**Type:** `string`
**Required:** Yes
**Format:** lowercase-with-dashes

Which project this task belongs to.

**Examples:**
```json
{ "project": "backend-redesign" }
{ "project": "house-sale" }
{ "project": "legal-case-settlement" }
```

**Naming Rules:**
- Lowercase only
- Use hyphens (not underscores)
- Be descriptive (2-4 words)
- Keep consistent across tasks

---

### priority

**Type:** `Priority`
**Required:** No (defaults to "medium")
**Enum:** `"urgent" | "high" | "medium" | "low"`

How urgently the task needs to be completed.

```typescript
type Priority =
  | "urgent"   // Do immediately, drop everything
  | "high"     // Do soon, top of queue
  | "medium"   // Normal priority (default)
  | "low";     // Nice to have, do when time permits
```

**When to use each:**
- **urgent**: Production issues, time-sensitive deadlines
- **high**: Important but not emergency
- **medium**: Regular tasks (default)
- **low**: Cleanup, nice-to-haves

**Examples:**
```json
{ "priority": "urgent" }  // Production login broken
{ "priority": "high" }    // Important feature
{ "priority": "medium" }  // Regular task
{ "priority": "low" }     // Update docs
```

---

### tags

**Type:** `string[]`
**Required:** No (defaults to empty array)

Tags for categorization and filtering.

**Examples:**
```json
{
  "tags": ["bug", "frontend", "user-facing"]
}
{
  "tags": ["research", "database", "performance"]
}
{
  "tags": ["phone-call", "urgent"]
}
```

**Common Tag Patterns:**
- **Type**: bug, feature, research, refactor, cleanup
- **Area**: frontend, backend, database, api, infrastructure
- **Impact**: user-facing, internal, technical-debt
- **Effort**: quick-win, deep-dive, exploratory

---

### notes

**Type:** `string`
**Required:** No (recommended)

Detailed context, constraints, and history.

**What to include:**
- Why this task exists
- What problem it solves
- What constraints apply
- Links to resources
- Decision history
- Blockers or dependencies

**Examples:**
```json
{
  "notes": "Users report getting stuck in redirect loop after password reset. Check auth middleware and session handling. Related to task #38."
}
{
  "notes": "Need to compare PostgreSQL vs MongoDB for new backend. Consider scalability, query performance, transaction support, and team experience.\n\nUPDATE 2025-12-06: Researched both options. PostgreSQL chosen for transaction support."
}
```

**Best Practices:**
- Add context when creating task
- Update notes as work progresses
- Include timestamps for updates
- Link related tasks/projects
- Preserve decision rationale

---

### created

**Type:** `string`
**Required:** Yes (auto-generated)
**Format:** ISO 8601 timestamp

When the task was created.

```json
{
  "created": "2025-12-06T10:00:00Z"
}
```

---

### updated

**Type:** `string`
**Required:** Yes (auto-updated)
**Format:** ISO 8601 timestamp

When the task was last modified.

```json
{
  "updated": "2025-12-06T15:30:00Z"
}
```

**Auto-updates when:**
- Task status changes
- Priority changes
- Notes added
- Any field modified

---

### completed

**Type:** `string`
**Required:** No (only when status is "completed")
**Format:** ISO 8601 timestamp

When the task was marked as completed.

```json
{
  "completed": "2025-12-06T16:45:00Z"
}
```

**Only present when:** `status === "completed"`

---

## Complete Examples

### Basic Task

```json
{
  "id": 1,
  "content": "Research database options",
  "activeForm": "Researching database options",
  "status": "pending",
  "assignee": "reeves",
  "project": "backend-redesign",
  "priority": "medium",
  "tags": [],
  "notes": "",
  "created": "2025-12-06T10:00:00Z",
  "updated": "2025-12-06T10:00:00Z"
}
```

### Detailed Task

```json
{
  "id": 42,
  "content": "Fix login redirect loop",
  "activeForm": "Fixing login redirect loop",
  "status": "in_progress",
  "assignee": "reeves",
  "project": "backend-bugs",
  "priority": "urgent",
  "tags": ["bug", "auth", "user-facing"],
  "notes": "Users report getting stuck in redirect loop after password reset. Check auth middleware and session handling.\n\nUPDATE 2025-12-06: Found issue in session expiry logic. Testing fix.",
  "created": "2025-12-06T09:00:00Z",
  "updated": "2025-12-06T11:30:00Z"
}
```

### Completed Task

```json
{
  "id": 55,
  "content": "Research database options",
  "activeForm": "Researching database options",
  "status": "completed",
  "assignee": "reeves",
  "project": "backend-redesign",
  "priority": "high",
  "tags": ["research", "database"],
  "notes": "Need to compare PostgreSQL vs MongoDB.\n\nRESEARCH FINDINGS:\n- PostgreSQL: ACID transactions, better query performance\n- MongoDB: Flexible schema, but no transactions\n\nDECISION: Choose PostgreSQL for transaction support and team experience.\n\nCOMPLETED: Full analysis in learning log /reeves/learning-logs/2025-12-backend-redesign.md",
  "created": "2025-12-05T10:00:00Z",
  "updated": "2025-12-06T16:45:00Z",
  "completed": "2025-12-06T16:45:00Z"
}
```

### Life Management Task

```json
{
  "id": 78,
  "content": "Call contractor about kitchen repair",
  "activeForm": "Calling contractor about kitchen",
  "status": "pending",
  "assignee": "daniel",
  "project": "house-repairs",
  "priority": "high",
  "tags": ["phone-call", "contractor"],
  "notes": "Kitchen sink leak started yesterday. Contractor Tom (555-1234567) said to call if it gets worse. It's worse.\n\nNeed to discuss:\n- How soon can he come?\n- Estimate for repair\n- Check if under warranty",
  "created": "2025-12-06T08:00:00Z",
  "updated": "2025-12-06T08:00:00Z"
}
```

## Validation Rules

### Required Fields

```typescript
// Minimum valid task
{
  content: string,    // Required
  assignee: string,   // Required: "daniel" | "reeves"
  project: string     // Required
}
```

### Field Constraints

```typescript
// id: Auto-generated, positive integer
id: number (>= 1)

// content: Non-empty string
content: string (length >= 1)

// status: Must be valid enum value
status: "pending" | "in_progress" | "completed" | "blocked" | "cancelled" | "skipped"

// assignee: Must be valid enum value
assignee: "daniel" | "reeves"

// project: Non-empty string, lowercase-with-dashes
project: string (match: /^[a-z0-9-]+$/)

// priority: Must be valid enum value if provided
priority?: "urgent" | "high" | "medium" | "low"

// tags: Array of strings
tags: string[]

// notes: String (can be empty)
notes: string

// Timestamps: ISO 8601 format
created: string (ISO 8601)
updated: string (ISO 8601)
completed?: string (ISO 8601)
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "content", "status", "assignee", "project", "created", "updated"],
  "properties": {
    "id": {
      "type": "integer",
      "minimum": 1
    },
    "content": {
      "type": "string",
      "minLength": 1
    },
    "activeForm": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": ["pending", "in_progress", "completed", "blocked", "cancelled", "skipped"]
    },
    "assignee": {
      "type": "string",
      "enum": ["daniel", "reeves"]
    },
    "project": {
      "type": "string",
      "pattern": "^[a-z0-9-]+$"
    },
    "priority": {
      "type": "string",
      "enum": ["urgent", "high", "medium", "low"]
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "notes": {
      "type": "string"
    },
    "created": {
      "type": "string",
      "format": "date-time"
    },
    "updated": {
      "type": "string",
      "format": "date-time"
    },
    "completed": {
      "type": "string",
      "format": "date-time"
    }
  }
}
```

## Next Steps

- [MCP Tools Reference](/api/tools)
- [Project Schema Reference](/api/project-schema)
- [Task Management Guide](/guide/tasks)
- [AI Assistant Guide](/guide/ai-assistant-guide)

---

**Complete task data structure for Reeves.**
