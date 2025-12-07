# Projects

Groups of related tasks with shared context.

## What Projects Are

Collections of tasks organized around a goal:
- **Group work** - All tasks for one objective
- **Preserve context** - Link to learning logs
- **Track ownership** - Human or AI responsibility
- **Manage lifecycle** - Active, paused, completed, archived

## Structure

```json
{
  "backend-redesign": {
    "owner": "reeves",
    "status": "active",
    "context_file": "/reeves/learning-logs/2025-12-backend-redesign.md",
    "notes": "Redesigning backend for scale. Migrating MongoDB → PostgreSQL."
  },
  "house-sale": {
    "owner": "daniel",
    "status": "active",
    "context_file": "/reeves/learning-logs/2025-11-house-sale.md",
    "notes": "Coordinating repairs, staging, listing."
  }
}
```

## Naming Convention

**Use lowercase-with-dashes:**

✅ `backend-redesign`, `house-sale`, `emily-birthday-planning`

❌ `Backend Redesign`, `house_sale`, `Project1`

Make names descriptive, unique, stable, and concise (2-4 words).

## Creating Projects

Usually created implicitly with first task:

```
You: "Create a task to research database options for backend-redesign"
Claude: [Creates project + task]
```

Or explicitly:

```
You: "Start a new project called backend-redesign for architecture work"
Claude: [Creates project with metadata]
```

## Project Status

**active** - Currently working
**on-hold** - Paused temporarily
**completed** - Finished successfully
**cancelled** - No longer pursuing
**archived** - Reference only

## Ownership

**owner: "daniel"** - Human responsibility, AI assists

**owner: "reeves"** - AI-driven project, human reviews

This enables the "magic trick" - assigning complex work to Reeves itself.

## Context Files

Projects link to [learning logs](/guide/learning-logs) for deep context:

```json
"context_file": "/reeves/learning-logs/2025-12-backend-redesign.md"
```

Keeps project metadata lean while preserving full history.

## Using Projects

```
You: "What's next on backend-redesign?"
Claude: [Shows prioritized tasks from that project]

You: "Create task for house-sale: get plumber quote"
Claude: [Adds to house-sale project]

You: "Archive the startup-validation project"
Claude: [Sets status to archived]
```

## When to Create Projects

- **Multiple related tasks** - More than 3-5 tasks for one goal
- **Shared context needed** - Tasks need to understand overall objective
- **Long-term tracking** - Will span weeks or months
- **Complex coordination** - Multiple people, dependencies, stages

## When NOT to Create Projects

- **One-off tasks** - Single task doesn't need project wrapper
- **Generic categories** - "Personal" or "Work" too broad
- **Forced organization** - If it feels arbitrary, skip it

AI can infer project from task context most of the time.

## Best Practices

1. **Start with tasks** - Let projects emerge naturally
2. **Link to context** - Every project should have a learning log
3. **Use ownership** - Assign to "reeves" for AI-driven work
4. **Update status** - Keep lifecycle current (active/paused/done)
5. **Archive when done** - Preserve history but reduce clutter

## Schema Reference

See [Project Schema](/api/project-schema) for complete field definitions.
