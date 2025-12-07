# Tasks

Single actionable items tracked through completion.

## Structure

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
  "notes": "Compare PostgreSQL vs MongoDB for scalability.",
  "created": "2025-12-06T10:00:00Z",
  "updated": "2025-12-06T10:00:00Z",
  "completed": null
}
```

**Required:** content, assignee, project
**Optional:** activeForm, priority, tags, notes

## Lifecycle

```
pending → in_progress → completed
   ↓           ↓
blocked    cancelled/skipped
```

**pending** - Ready to start
**in_progress** - Currently working (ONE at a time only)
**completed** - Finished with outcome notes
**blocked** - Waiting on dependency
**cancelled** - No longer needed
**skipped** - Intentionally not doing

::: tip ONE Task In Progress
Only ONE task should be `in_progress` at a time. Prevents context switching.
:::

## Creating Tasks

```
You: "Create task to fix login bug"
Claude: [Creates task, assigns to reeves, backend-fixes project]

You: "Create task for me to research databases, high priority"
Claude: [Creates task assigned to daniel, adds priority and context]
```

**AI infers:**
- Project from context
- Priority from urgency words
- Assignee from complexity (research → reeves, simple → you)

## Assignee: The Magic

**assignee: "daniel"** - Human does it, AI assists

**assignee: "reeves"** - AI does it, human reviews

This enables:
```
You: "Reeves, research solar contractors and create comparison doc"
Claude: [Creates task assigned to reeves, completes research, generates doc,
         marks task done, creates review task for you]
```

AI manages both you and itself.

## Priority Levels

**urgent** - Drop everything
**high** - Today/this week
**medium** - Soon (default)
**low** - When there's time

Don't over-prioritize. Most tasks are medium.

## Working with Tasks

```
You: "What's next?"
Claude: [Shows prioritized tasks, considering urgency, blockers, assignee]

You: "Start task 42"
Claude: [Sets status to in_progress]

You: "I found MongoDB scales better for our use case"
Claude: [Adds note to task, updates learning log with decision]

You: "Mark it done"
Claude: [Sets status to completed, adds timestamp, creates follow-up tasks]
```

## Task Notes

Notes capture:
- **Context** - Why this matters
- **Progress** - What's been tried
- **Decisions** - What was chosen and why
- **Blockers** - What's preventing completion
- **Outcomes** - What happened when completed

```json
"notes": "Researched PostgreSQL and MongoDB. MongoDB wins for our use case
          due to flexible schema and better horizontal scaling. Decision
          documented in learning log. Next: prototype with MongoDB."
```

## Tags

Use for filtering, not organization:

**Good tags:** `research`, `bug`, `urgent`, `waiting-on-response`
**Bad tags:** `backend`, `database` (too generic, use project instead)

Tags are optional. Projects do most organization.

## Common Patterns

**Research task for AI:**
```
You: "Reeves, research best practices for database indexing"
Claude: [Creates reeves-assigned task, completes research, summarizes findings]
```

**Blocked task:**
```
You: "Can't finish the deployment, waiting on server access"
Claude: [Sets status to blocked, notes: "Waiting on DevOps for server credentials"]
```

**Task with dependency:**
```
You: "Need to test the API after backend redesign is done"
Claude: [Creates task, notes: "Blocked on task #42 - database migration"]
```

## Completing Tasks

```
You: "Task 42 is done, MongoDB migration successful"
Claude: [Marks completed, adds outcome note, updates learning log,
         unblocks dependent tasks, creates follow-up if needed]
```

**Always capture outcomes** - future you needs to know what happened.

## Best Practices

1. **ONE in progress** - Focus on one thing at a time
2. **Capture outcomes** - Note what happened when completing
3. **Use notes liberally** - Context saves time later
4. **Assign to Reeves** - Let AI handle research and analysis
5. **Don't over-organize** - Projects and tags are optional, not required

## Schema Reference

See [Task Schema](/api/task-schema) for complete field definitions.
