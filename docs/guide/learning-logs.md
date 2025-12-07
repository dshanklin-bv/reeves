# Learning Logs

Deep project context in markdown files.

## What They Are

Markdown files capturing project history, decisions, and strategic thinking. This is where detailed context lives—tasks and contacts link here but don't duplicate it.

**Contains:**
- Project goals and background
- Strategic decisions and rationale
- Meeting notes and interview transcripts
- Relationship histories
- Research findings and lessons learned

::: tip Single Source of Truth
Learning logs are authoritative. Tasks/contacts reference them, don't duplicate them.
:::

## File Structure

```
/reeves/learning-logs/
├── 2025-12-backend-redesign.md
├── 2025-11-house-sale.md
└── 2025-12-aic-partnership.md
```

**Naming:** `YYYY-MM-DD-project-slug.md`

Why dates? Chronological ordering, easy time-based lookup, multiple logs per project over time.

## Template

```markdown
# [Project Name] - Context

**Date:** YYYY-MM-DD
**Project:** project-slug
**Stakeholders:** Key people

## Context

What this is, why it matters, key deadlines.

## Background

Detailed background information...

## Key Decisions

### Decision: [Title] (YYYY-MM-DD)
- **What:** Decision made
- **Why:** Rationale
- **Alternatives:** What else was considered
- **Outcome:** What happened

## Meeting Notes

### YYYY-MM-DD with [Person]
- Topics, decisions, action items

## Next Steps

- [ ] Action item 1
- [ ] Action item 2

## Links

Related tasks, projects, external resources
```

## When to Create

**Create when:**
- New project with >5 tasks
- Complex context that doesn't fit in task notes
- Multiple stakeholders or long timeline
- Strategic decisions need documenting
- Interview or meeting transcripts to preserve

**Don't create for:**
- Simple one-off tasks
- Projects with self-explanatory context
- Information that fits cleanly in task notes

## Using Learning Logs

```
You: "Start learning log for backend-redesign project"
Claude: [Creates 2025-12-backend-redesign.md with template]

You: "Add meeting notes from today's architecture discussion"
Claude: [Appends to learning log with structured notes]

You: "What was the decision on PostgreSQL vs MongoDB?"
Claude: [Reads learning log, extracts decision with rationale]
```

## Linking from Tasks/Contacts

**Tasks:**
```json
{
  "notes": "See learning log for full context: /reeves/learning-logs/2025-12-backend-redesign.md"
}
```

**Projects:**
```json
{
  "context_file": "/reeves/learning-logs/2025-12-backend-redesign.md"
}
```

**Contacts:**
```json
{
  "context_files": ["/reeves/learning-logs/2025-11-house-sale.md"]
}
```

## Best Practices

1. **Create early** - Start when project gets complex
2. **Link liberally** - Tasks/contacts point here for context
3. **Update continuously** - Add decisions as they happen
4. **Structure for skimming** - Headers, bullets, dates
5. **Keep forever** - Learning logs never get deleted, only archived

## Why Markdown?

- **Human readable** - Open in any editor
- **Version control** - Git tracks changes
- **AI parseable** - Claude can read and update
- **Portable** - Works everywhere
- **Future-proof** - Plain text lasts forever

Learning logs stay markdown even if you migrate to databases. Context needs human editability.

## Migration Note

When you move tasks to SQLite/Postgres, **learning logs stay markdown**. Databases are for structured queries. Context is for human comprehension.
