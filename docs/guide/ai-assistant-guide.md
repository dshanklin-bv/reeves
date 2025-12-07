# AI Assistant Guide

This guide is for AI assistants (like Claude) learning to use Reeves effectively.

## Overview

Reeves is a persistent task management system that you control through MCP (Model Context Protocol) tools. Unlike traditional systems, Reeves is designed for **AI reasoning**, not rigid automation.

## Core Philosophy

### Build for Understanding, Not Automation

- **Read all tasks** naturally and understand dependencies through context
- **Make judgment calls** about priority based on notes and situation
- **Trust plain English** notes over strict schemas
- **Skip overly complex** dependency systems

### Example:

```
❌ BAD: "Task #5 blocks Task #7 which depends on Task #3"
✅ GOOD: "Need to finish database migration before deploying API changes"
```

The AI can understand the second approach through reading notes.

## Available MCP Tools

### Task Management

#### `how_to`
Get comprehensive usage guide. **Always call this first** if unfamiliar with Reeves.

```typescript
how_to() → { guide: string }
```

#### `list_tasks`
Get all tasks, optionally filtered.

```typescript
list_tasks({
  status?: "pending" | "in_progress" | "completed" | "cancelled" | "blocked" | "skipped",
  project?: string,  // partial match
  priority?: "urgent" | "high" | "medium" | "low",
  assignee?: "daniel" | "reeves",
  tag?: string  // partial match
}) → Task[]
```

#### `list_active_tasks`
Quick way to see pending/in_progress/blocked tasks.

```typescript
list_active_tasks() → Task[]
```

#### `whats_next`
Active tasks with prioritization guidance. Provides data for AI reasoning, does NOT make decisions.

```typescript
whats_next(assignee?: "daniel" | "reeves") → {
  tasks: Task[],
  guidance: string
}
```

#### `get_task`
Get specific task by ID with all details.

```typescript
get_task(id: number) → Task
```

#### `create_task`
Create new task. **Always provide content, assignee, and project at minimum.**

```typescript
create_task({
  content: string,           // Required: "Do X" (imperative)
  assignee: string,          // Required: "daniel" or "reeves"
  project: string,           // Required: "project-slug"
  activeForm?: string,       // "Doing X" (defaults to content)
  priority?: string,         // "urgent" | "high" | "medium" | "low"
  tags?: string[],
  notes?: string            // Context, details, instructions
}) → Task
```

#### `update_task`
Modify existing task. Can update status, priority, notes, tags, or other fields.

```typescript
update_task({
  id: number,               // Required
  status?: string,
  priority?: string,
  notes?: string,           // Appended to existing notes
  tags?: string[],          // Replaces existing
  content?: string,
  activeForm?: string,
  project?: string,
  assignee?: string
}) → Task
```

#### `complete_task`
Mark task complete with optional completion notes.

```typescript
complete_task({
  id: number,              // Required
  notes?: string           // What was done, outcomes, follow-ups
}) → Task
```

#### `delete_task`
Delete task by ID. **Use sparingly** - prefer cancel/skip with notes.

```typescript
delete_task(id: number) → { success: boolean, deleted: number }
```

### Project Management

#### `list_projects`
Get all projects with metadata (owner, status, context files).

```typescript
list_projects() → Project[]
```

### Statistics

#### `get_stats`
Task statistics: total count, counts by status/priority/project.

```typescript
get_stats() → {
  total: number,
  by_status: Record<string, number>,
  by_priority: Record<string, number>,
  by_project: Record<string, number>
}
```

### Queue System

#### `get_queue`
Get all unprocessed queue items.

```typescript
get_queue() → QueueItem[]
```

#### `add_queue_item`
Add new item to queue.

```typescript
add_queue_item({
  type: "general-note" | "project-note" | "task-note" | "progress-report",
  content: string,
  task_id?: number,      // For task-note type
  project?: string       // For project-note type
}) → QueueItem
```

#### `process_queue_item`
Mark queue item as processed and move to processed folder.

```typescript
process_queue_item(filename: string) → { success: boolean }
```

## Task Structure

```typescript
interface Task {
  id: number;
  content: string;          // "Research database options"
  activeForm: string;       // "Researching database options"
  status: "pending" | "in_progress" | "completed" | "cancelled" | "blocked" | "skipped";
  assignee: "daniel" | "reeves";
  project: string;          // "backend-redesign"
  priority: "urgent" | "high" | "medium" | "low";
  tags: string[];           // ["research", "database"]
  notes: string;            // Detailed context
  created: string;          // ISO timestamp
  completed?: string;       // ISO timestamp when completed
}
```

## Decision-Making Patterns

### When to Create Tasks

✅ **DO create tasks for:**
- User explicitly requests tracking something
- Multi-step work that needs coordination
- Follow-ups discovered during conversation
- Work assigned to specific person (daniel or reeves)

❌ **DON'T create tasks for:**
- Simple one-off questions
- Work already completed in conversation
- Vague future possibilities

### Task Assignment

- **"reeves"** - AI can handle autonomously (research, drafting, analysis)
- **"daniel"** - Requires human action (phone calls, in-person meetings, decisions)

### Priority Guidelines

- **urgent** - Time-sensitive, blocking other work
- **high** - Important, should be done soon
- **medium** - Normal priority (default)
- **low** - Nice to have, no rush

### Status Management

**CRITICAL:** Only ONE task should be `in_progress` at a time.

```
pending → in_progress → completed
   ↓           ↓
blocked    cancelled/skipped
```

### Adding Notes

Always add context in notes:

```typescript
// ❌ BAD
create_task({
  content: "Call John",
  assignee: "daniel",
  project: "partnership"
})

// ✅ GOOD
create_task({
  content: "Call John Fuqua about AIC Holdings partnership",
  assignee: "daniel",
  project: "aic-holdings-partnership",
  priority: "high",
  tags: ["phone-call", "partnership"],
  notes: "Follow up on email sent 2025-12-06. Discuss Q1 2026 launch timeline and software intel exchange. John's phone: 12819001802"
})
```

## Common Workflows

### 1. Starting a Session

```typescript
// See what needs attention
const active = await whats_next();

// Get specific task details
const task = await get_task(42);

// Start working on it
await update_task({
  id: 42,
  status: "in_progress"
});
```

### 2. Creating Follow-up Tasks

```typescript
// User: "I had lunch with Taylor and the kids"

// Create expense tracking task
await create_task({
  content: "Log lunch expense at Dean's Italian Steakhouse",
  assignee: "daniel",
  project: "personal-finance",
  priority: "low",
  tags: ["expense", "receipt"],
  notes: "Lunch with Taylor, Josh, Wyatt, Colleen. ~$150 estimated. Date: 2025-12-06"
});

// Create gift follow-up
await create_task({
  content: "Get thank you feedback from kids about gifts",
  assignee: "daniel",
  project: "family",
  priority: "low",
  tags: ["follow-up"],
  notes: "Gave cards, candy, Snoopy, and $40 to each kid (Josh, Wyatt, Colleen)"
});
```

### 3. Completing Tasks with Context

```typescript
await complete_task({
  id: 80,
  notes: "Reviewed last 24hrs of texts with John Fuqua. Sent notification about AIC Holdings email to john@johnfuqua.com. Created follow-up tasks #81 and #82 for software intel exchange and partnership exploration. Next: await response and schedule partnership discussion."
});
```

### 4. Handling Blocked Tasks

```typescript
await update_task({
  id: 55,
  status: "blocked",
  notes: "UPDATE: Blocked waiting for attorney response on settlement offer. Sent follow-up email 2025-12-06. Will check again in 3 days."
});
```

## Best Practices

### DO:
- ✅ Add detailed notes with context
- ✅ Use descriptive content ("Fix auth timeout in login" not "Fix bug")
- ✅ Link related tasks via notes and tags
- ✅ Update tasks with progress notes using `update_task`
- ✅ Complete tasks with summary of what was accomplished
- ✅ Create follow-up tasks when new work is discovered

### DON'T:
- ❌ Have multiple tasks `in_progress` at once
- ❌ Create vague tasks without notes
- ❌ Forget to mark tasks complete
- ❌ Use wrong assignee (AI work to daniel, human work to reeves)
- ❌ Create tasks for work already done in conversation

## Data Management

### Contacts (`life-data/contacts.json`)

Keep entries **LEAN** (under 100 lines each):
- Phone numbers and basic info
- Communication preferences (tone, punctuation, formality)
- Recent interactions (last 5-10 ONLY)
- Links to context files

**DON'T include:**
- Full project history → use `/reeves/learning-logs/`
- Detailed timelines → use `/reeves/artifacts/`
- Legal documents → use `/reeves/artifacts/`
- Extensive notes → use context files

### Message Sending - DOUBLE-VERIFY Protocol

**CRITICAL:** Before sending any message, phone number MUST exist in BOTH:
1. Messages database (SMS/iMessage system)
2. Reeves contacts.json

**Verification workflow:**
```
1. Look up in contacts.json → get phone number
2. Call find_contact tool → verify phone exists in Messages DB
3. Compare: both phones must match exactly
4. If match ✓ → Send using phone number (NEVER "contact:N")
5. If no match ✗ → STOP, ask user to update contacts
```

**DO:**
- ✓ Use phone numbers directly (e.g., "12819001802")
- ✓ Verify both sources match
- ✓ Stop if verification fails

**DON'T:**
- ✗ Use "contact:N" indices (unreliable)
- ✗ Send without verification
- ✗ Guess phone numbers

## Error Handling

### Task Not Found
```typescript
const task = await get_task(999);
// Returns: { error: "Task #999 not found" }
```

### Invalid Status
```typescript
await update_task({ id: 42, status: "invalid" });
// Error: Status must be one of: pending, in_progress, completed, cancelled, blocked, skipped
```

### Missing Required Fields
```typescript
await create_task({ content: "Do something" });
// Error: Missing required fields: assignee, project
```

## Examples Library

### Research Task
```typescript
await create_task({
  content: "Research GraphQL vs REST API for new backend",
  activeForm: "Researching GraphQL vs REST",
  assignee: "reeves",
  project: "backend-redesign",
  priority: "high",
  tags: ["research", "technical-decision", "api"],
  notes: "Compare performance, developer experience, tooling, and ecosystem. Focus on real-time data needs and mobile client requirements. Deliverable: recommendation document with pros/cons."
});
```

### Human Action Task
```typescript
await create_task({
  content: "Call Emily Rothrock to arrange CRV pickup",
  activeForm: "Calling Emily about CRV pickup",
  assignee: "daniel",
  project: "honda-crv-recovery",
  priority: "urgent",
  tags: ["phone-call", "legal"],
  notes: "Coordinate pickup Dec 14-15 in Boone. Verify she has keys and title. Confirm meeting location and time. Phone: 4842255030. See /reeves/artifacts/honda-crv-recovery/ for full context."
});
```

### Interview Task
```typescript
await create_task({
  content: "Interview Daniel about home sale project",
  activeForm: "Interviewing Daniel about home sale",
  assignee: "reeves",
  project: "239-eagle-dr-house-sale",
  priority: "high",
  tags: ["interview", "project-setup"],
  notes: "Comprehensive interview to establish project context: timeline, budget, contractors needed, key milestones, decision criteria. Document in /reeves/learning-logs/2025-12-house-sale-context.md"
});
```

## Scaling Considerations

### Current System (JSON)
- Works well up to ~300 tasks
- Simple, debuggable, easy to backup
- No complexity, no dependencies

### Migration Triggers
- Tasks > 300 (performance degradation)
- Multiple AI personas needed (Finn, Mary - concurrency issues)
- Web UI desired (multi-device access)
- Complex queries needed (analytics, reports)

### Future Path
```
Phase 1 (Now):     JSON files
Phase 2 (6-12mo):  SQLite for queries, JSON for storage
Phase 3 (1-2yr):   Database primary, JSON for export
Phase 4 (2-3yr):   Full platform (web, vector search)
```

## Summary

Reeves is designed to be **simple and understandable**. As an AI:

1. **Read tasks naturally** - understand context from notes
2. **Make judgment calls** - you can reason about priority
3. **Keep notes detailed** - help future sessions understand context
4. **One task in_progress** - focus is clarity
5. **Trust plain English** - no rigid schemas needed

The goal is **understanding, not automation**. Build for your own comprehension, not just execution.
