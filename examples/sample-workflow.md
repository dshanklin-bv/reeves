# Sample Reeves Workflow

This document shows a typical day using Reeves for task management.

## Morning: Check What's Next

```
You: "Reeves, what's next?"

Claude: [Calls whats_next tool]
```

**Output:**
- 3 urgent tasks (house sale follow-ups)
- 5 high priority tasks (project work)
- 12 medium priority tasks
- Suggestion: Start with urgent tasks

## Start Working on a Task

```
You: "Start task 42"

Claude: [Updates task 42 to in_progress]
```

**Task becomes:**
```json
{
  "id": 42,
  "status": "in_progress",
  "notes": "Started 2025-12-06 10:00"
}
```

## Complete a Task

```
You: "Complete task 42. Found that PostgreSQL works better for our use case."

Claude: [Calls complete_task with notes]
```

**Result:**
```json
{
  "id": 42,
  "status": "completed",
  "completed": "2025-12-06T11:30:00Z",
  "notes": "Completed. Found that PostgreSQL works better for our use case."
}
```

## Create Follow-up Tasks

```
You: "Create a task to set up PostgreSQL development environment"

Claude: [Creates new task]
```

**New task:**
```json
{
  "id": 43,
  "content": "Set up PostgreSQL development environment",
  "activeForm": "Setting up PostgreSQL development environment",
  "status": "pending",
  "assignee": "reeves",
  "project": "backend-redesign",
  "priority": "high",
  "tags": ["database", "devops"],
  "notes": "Follow-up from database research (task #42)"
}
```

## Check Project Status

```
You: "Show me all tasks for backend-redesign project"

Claude: [Calls list_tasks with project filter]
```

**Output:**
- Task 42 (completed) - Database research
- Task 43 (pending) - PostgreSQL setup
- Task 44 (in_progress) - API endpoint design
- Task 45 (blocked) - Waiting on database decision

## Handle Blocked Tasks

```
You: "Unblock task 45 since we chose PostgreSQL"

Claude: [Updates task 45 status to pending]
```

## Evening: Review Progress

```
You: "Show me today's stats"

Claude: [Calls get_stats]
```

**Output:**
- 3 tasks completed today
- 2 tasks still in progress
- 1 task unblocked
- Total: 67 active tasks across 8 projects

## Weekly Review

```
You: "Show me all completed tasks from last week"

Claude: [Calls list_tasks with status=completed, date filter]
```

Use this to:
- Track velocity
- Review accomplishments
- Plan next week's priorities
