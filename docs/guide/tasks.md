# Task Management

Complete guide to managing tasks with Reeves.

## What is a Task?

A task in Reeves represents a single actionable item with:
- **Content**: What needs to be done (imperative form: "Do X")
- **Active Form**: How it appears when in progress ("Doing X")
- **Assignee**: Who's responsible ("daniel" or "reeves")
- **Project**: Which project it belongs to
- **Status**: Current state in the lifecycle
- **Priority**: Urgency level
- **Notes**: Context, details, and instructions

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
  "notes": "Need to compare PostgreSQL vs MongoDB for new backend. Consider scalability and query patterns.",
  "created": "2025-12-06T10:00:00Z",
  "updated": "2025-12-06T10:00:00Z",
  "completed": null
}
```

## Task Lifecycle

```
pending → in_progress → completed
   ↓           ↓
blocked    cancelled/skipped
```

### Status Definitions

- **pending** - Task is ready to start but not yet begun
- **in_progress** - Currently being worked on (ONLY ONE at a time)
- **completed** - Successfully finished with notes about outcome
- **blocked** - Cannot proceed until dependency is resolved
- **cancelled** - No longer needed or relevant
- **skipped** - Intentionally not doing this task

### Status Best Practices

::: tip ONE Task In Progress
Only ONE task should be `in_progress` at a time. This prevents context switching and ensures focused work.
:::

::: warning Don't Leave Tasks Hanging
If you can't complete a task right now, set it to `blocked` with notes explaining why, or back to `pending` if you're switching focus.
:::

## Creating Tasks

### Basic Task Creation

```
You: "Create a task to fix the login bug"
Claude: [Creates task with Reeves]

Task created:
- Content: "Fix login bug"
- Assignee: "reeves"
- Project: "backend-fixes"
- Status: "pending"
```

### With Full Details

```
You: "Create a task to research database options. Assign it to me, high priority, add a note about scalability requirements."
Claude: [Creates detailed task]

Task created:
- Content: "Research database options"
- Assignee: "daniel"
- Project: "backend-redesign"
- Priority: "high"
- Notes: "Need to evaluate PostgreSQL vs MongoDB. Focus on scalability, query performance, and transaction support."
```

### Task Creation Rules

**ALWAYS Provide:**
- ✅ Content (what to do)
- ✅ Assignee (who does it)
- ✅ Project (where it belongs)

**OPTIONAL But Recommended:**
- 📝 Notes (context and details)
- 🏷️ Tags (for filtering)
- ⚡ Priority (if time-sensitive)
- 📅 Active form (if content doesn't convert well)

## Viewing Tasks

### List All Tasks

```
You: "List all tasks"
Claude: [Shows all tasks with filters]
```

### List Active Tasks

```
You: "What's active?"
Claude: [Shows pending + in_progress + blocked tasks]
```

### Filter By Status

```
You: "Show me completed tasks"
You: "List blocked tasks"
You: "What's pending?"
```

### Filter By Project

```
You: "Show tasks for backend-redesign"
You: "List all website tasks"
```

### Filter By Priority

```
You: "Show urgent tasks"
You: "List high priority items"
```

### Filter By Assignee

```
You: "Show my tasks"
You: "What's assigned to Reeves?"
```

### Filter By Tag

```
You: "Show tasks tagged with 'research'"
You: "List bug fix tasks"
```

## Updating Tasks

### Change Status

```
You: "Mark task 42 as in progress"
You: "Complete task 15 with notes about what I found"
You: "Block task 8 because we're waiting on API documentation"
```

### Update Priority

```
You: "Make task 23 urgent"
You: "Lower priority of task 18 to low"
```

### Add Notes

```
You: "Add a note to task 12: Discovered we need to update the schema first"
Claude: [Appends note with timestamp]
```

### Change Assignee

```
You: "Reassign task 7 to me"
You: "Give task 19 to Reeves"
```

### Add Tags

```
You: "Tag task 5 with 'bug' and 'frontend'"
Claude: [Updates tags]
```

### Move to Different Project

```
You: "Move task 14 to the frontend-redesign project"
Claude: [Updates project assignment]
```

## Completing Tasks

### Basic Completion

```
You: "Complete task 42"
Claude: [Marks complete with timestamp]
```

### Completion With Notes

```
You: "Complete task 42 with notes: Chose PostgreSQL. Better transaction support and our team has more experience."
Claude: [Marks complete, saves notes]
```

::: tip Always Add Completion Notes
Completion notes preserve context for future reference. What did you find? What did you decide? Why?
:::

## Task Priority

### Priority Levels

- **urgent** - Do immediately, drop everything
- **high** - Do soon, top of queue
- **medium** - Normal priority (default)
- **low** - Nice to have, do when time permits

### When to Set Priority

```
You: "Create urgent task to fix production login issue"
You: "Create low priority task to update documentation"
```

::: warning Don't Overuse Urgent
If everything is urgent, nothing is urgent. Reserve for actual emergencies.
:::

## Task Organization

### Using Tags

Tags help categorize and filter tasks:

```json
{
  "tags": ["bug", "frontend", "user-facing"]
}
```

**Common Tag Patterns:**
- **Type**: bug, feature, research, refactor
- **Area**: frontend, backend, database, api
- **Impact**: user-facing, internal, technical-debt
- **Effort**: quick-win, deep-dive, exploratory

### Using Projects

Every task belongs to a project. Projects group related work:

```
backend-redesign/
├── Research database options
├── Design new schema
├── Implement migration
└── Update API endpoints

house-sale/
├── Get appraisal
├── Stage house
├── List on MLS
└── Review offers
```

See [Project Management](/guide/projects) for details.

### Using Notes

Notes preserve context across sessions:

```json
{
  "notes": "Original implementation used MongoDB but we're hitting scalability issues. Need to evaluate PostgreSQL for better transaction support. Consider migration path from existing data."
}
```

**Good Notes Include:**
- Why this task exists
- What problem it solves
- What constraints exist
- What's already been tried
- Links to resources

## Advanced Patterns

### Breaking Down Large Tasks

**Bad:**
```
Task: "Redesign backend"
```

**Good:**
```
Task: "Research database options"
Task: "Design new schema"
Task: "Implement user service"
Task: "Write migration scripts"
Task: "Update API endpoints"
```

### Handling Blocked Tasks

```
You: "Block task 12 with note: Waiting on legal review of terms of service"
Claude: [Sets status to blocked, adds note]

Later...

You: "Unblock task 12, legal approved"
Claude: [Sets back to pending]
```

### Tracking Dependencies

Use notes to document dependencies:

```json
{
  "content": "Deploy new API endpoints",
  "notes": "Depends on Task #42 (database migration). Must complete schema changes before deploying API updates."
}
```

### Quick Wins vs Deep Dives

Use tags to identify task effort:

```
You: "Create task to fix typo in homepage. Tag it quick-win."
You: "Create task to redesign authentication system. Tag it deep-dive."
```

## Working With Claude Code

### Narrating Your Work

```
You: "I just finished the research task. Found that PostgreSQL is better for our use case. Mark it complete."

Claude: [Completes task, saves your findings]

You: "Now create a task to design the new database schema. Make it high priority, assign to me."

Claude: [Creates follow-up task with context]
```

### Reviewing What's Next

```
You: "What should I work on next?"

Claude: [Uses whats_next tool]
- Shows active tasks
- Provides priority guidance
- Considers dependencies
```

### Daily Check-In

```
You: "What's on my plate today?"

Claude: [Shows your pending/in_progress tasks]

You: "Start task 23"

Claude: [Sets task 23 to in_progress]
```

## Best Practices

### DO

- ✅ Only ONE task in_progress at a time
- ✅ Add detailed notes with context
- ✅ Use descriptive content ("Fix login bug" not "Fix thing")
- ✅ Set appropriate priority
- ✅ Add completion notes when finishing
- ✅ Use tags for organization
- ✅ Break large tasks into smaller pieces
- ✅ Document dependencies in notes

### DON'T

- ❌ Create vague tasks without context
- ❌ Leave tasks stuck in_progress
- ❌ Use wrong assignee (daniel vs reeves)
- ❌ Skip completion notes
- ❌ Make everything urgent
- ❌ Create tasks without projects
- ❌ Forget to update status as you work

## Examples

### Research Task

```json
{
  "content": "Research CSS framework options",
  "activeForm": "Researching CSS frameworks",
  "assignee": "daniel",
  "project": "frontend-redesign",
  "priority": "high",
  "tags": ["research", "frontend", "css"],
  "notes": "Evaluate Tailwind vs Bootstrap vs styled-components. Consider bundle size, learning curve, and team experience."
}
```

### Bug Fix Task

```json
{
  "content": "Fix login redirect loop",
  "activeForm": "Fixing login redirect loop",
  "assignee": "reeves",
  "project": "backend-bugs",
  "priority": "urgent",
  "tags": ["bug", "auth", "user-facing"],
  "notes": "Users report getting stuck in redirect loop after password reset. Check auth middleware and session handling."
}
```

### Life Management Task

```json
{
  "content": "Call contractor about kitchen leak",
  "activeForm": "Calling contractor",
  "assignee": "daniel",
  "project": "house-repairs",
  "priority": "high",
  "tags": ["phone-call", "urgent"],
  "notes": "Leak started yesterday under sink. Contractor (Tom) said to call if it gets worse. His number: 555-0123."
}
```

### Follow-Up Task

```json
{
  "content": "Follow up with Sarah about lunch plans",
  "activeForm": "Following up with Sarah",
  "assignee": "reeves",
  "project": "social",
  "priority": "medium",
  "tags": ["follow-up", "social"],
  "notes": "Sarah mentioned wanting to grab lunch this week. Last talked on Monday. She prefers Tuesday/Wednesday."
}
```

## Troubleshooting

### Task Not Saving

**Problem:** Task disappears after creating it

**Solutions:**
1. Verify `tasks.json` exists and is writable
2. Check MCP server is running
3. Validate JSON syntax in tasks.json

See [Troubleshooting Guide](/guide/troubleshooting) for details.

### Can't Find Task

**Problem:** Task exists but can't find it

**Solutions:**
1. List all tasks: `"Show me all tasks"`
2. Filter by project: `"Show tasks in X project"`
3. Check if completed: `"Show completed tasks"`
4. Search by content: `"Find tasks about database"`

### Too Many Tasks

**Problem:** Task list is overwhelming

**Solutions:**
1. Archive old completed tasks (manually edit tasks.json)
2. Use filters to focus: `"Show high priority tasks"`
3. Break into projects: `"Show tasks for current project"`
4. Focus on what's active: `"What's in progress?"`

## Next Steps

- [Learn about Projects](/guide/projects)
- [Managing Contacts](/guide/contacts)
- [Using Learning Logs](/guide/learning-logs)
- [Task Schema Reference](/api/task-schema)
- [Real-World Examples](/examples/real-world)

---

**Master task management to make Reeves work for you.**
