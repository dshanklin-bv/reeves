# Project Management

Complete guide to organizing work with projects in Reeves.

## What is a Project?

A project in Reeves is a collection of related tasks and context. Projects help you:

- **Group related work** - All tasks for one goal in one place
- **Preserve context** - Link to learning logs and documentation
- **Track ownership** - Know who's responsible
- **Manage lifecycle** - Know what's active vs archived

## Project Structure

```json
{
  "backend-redesign": {
    "owner": "reeves",
    "status": "active",
    "context_file": "/path/to/reeves/learning-logs/2025-12-backend-redesign.md",
    "notes": "Redesigning backend architecture for scale. Need to migrate from MongoDB to PostgreSQL."
  },
  "house-sale": {
    "owner": "daniel",
    "status": "active",
    "context_file": "/path/to/reeves/learning-logs/2025-11-house-sale.md",
    "notes": "Selling the Oakland house. Coordinating repairs, staging, and listing."
  }
}
```

## Project Naming

### Naming Convention

Use **lowercase-with-dashes** format:

✅ Good:
- `backend-redesign`
- `house-sale`
- `emily-birthday-planning`
- `side-business-launch`

❌ Bad:
- `Backend Redesign` (spaces, capitals)
- `house_sale` (underscores)
- `Project1` (not descriptive)

### Name Selection

Make names:
- **Descriptive** - Immediately clear what it is
- **Unique** - No confusion with other projects
- **Stable** - Won't need renaming later
- **Concise** - 2-4 words ideal

## Creating Projects

Projects are typically created implicitly when you create the first task:

```
You: "Create a task to research database options for the backend-redesign project"
Claude: [Creates project backend-redesign if it doesn't exist, then creates task]
```

Or explicitly through context:

```
You: "I'm starting a new project to redesign our backend architecture. Create a project called backend-redesign."
Claude: [Creates project with basic metadata]
```

## Project Status

### Status Types

- **active** - Currently working on this
- **on-hold** - Paused temporarily
- **completed** - Finished successfully
- **cancelled** - No longer pursuing
- **archived** - Keeping for reference but not active

### Status Transitions

```
active → on-hold → active
active → completed
active → cancelled
completed → archived
cancelled → archived
```

## Project Organization

### Context Files

Every project should link to a learning log that provides context:

```json
{
  "backend-redesign": {
    "context_file": "/Users/daniel/private/reeves/learning-logs/2025-12-backend-redesign.md"
  }
}
```

**Context files contain:**
- Project goals and objectives
- Key decisions made
- Research findings
- Meeting notes
- Strategic thinking
- Lessons learned

See [Learning Logs Guide](/guide/learning-logs) for details.

### Project Notes

Short notes capture current state and high-level context:

```json
{
  "notes": "Redesigning backend for scale. Migrating from MongoDB to PostgreSQL. Need to complete schema design before implementing."
}
```

**Use notes for:**
- Current status summary
- Key constraints
- Important reminders
- High-level goals

**Don't use notes for:**
- Detailed meeting transcripts (use learning logs)
- Long research findings (use learning logs)
- Complete history (use learning logs)

## Project Ownership

### Owner Assignment

- **daniel** - Human (you) is responsible
- **reeves** - AI is handling this

```json
{
  "backend-redesign": {
    "owner": "reeves"
  },
  "house-sale": {
    "owner": "daniel"
  }
}
```

### When to Assign to Daniel

Projects where you (the human) are:
- Making phone calls
- Having in-person meetings
- Doing physical work
- Making final decisions

**Examples:**
- `house-sale` - You're meeting contractors
- `family-coordination` - You're calling relatives
- `legal-case` - You're talking to attorneys

### When to Assign to Reeves

Projects where AI is:
- Doing research
- Drafting documents
- Analyzing data
- Managing follow-ups

**Examples:**
- `backend-redesign` - AI researching technical options
- `documentation-updates` - AI writing docs
- `code-refactoring` - AI handling code changes

## Project Types

### Software Projects

```json
{
  "backend-redesign": {
    "owner": "reeves",
    "status": "active",
    "context_file": "/reeves/learning-logs/2025-12-backend-redesign.md",
    "notes": "Full backend redesign. Migrating to microservices architecture."
  }
}
```

**Common software projects:**
- `frontend-rebuild`
- `api-redesign`
- `database-migration`
- `performance-optimization`
- `security-audit`

### Life Projects

```json
{
  "house-sale": {
    "owner": "daniel",
    "status": "active",
    "context_file": "/reeves/learning-logs/2025-11-house-sale.md",
    "notes": "Selling Oakland house. Getting appraisal next week. Need to coordinate staging."
  }
}
```

**Common life projects:**
- `house-repairs`
- `legal-case-settlement`
- `family-vacation-planning`
- `side-business-launch`
- `health-tracking`

### Partnership Projects

```json
{
  "carter-partnership": {
    "owner": "daniel",
    "status": "active",
    "context_file": "/reeves/learning-logs/2025-12-carter-partnership.md",
    "notes": "New business partnership with Carter. Discussing equity split and roles."
  }
}
```

**Common partnership projects:**
- `[name]-collaboration`
- `[name]-partnership`
- `joint-venture-[name]`

## Working With Projects

### Viewing Projects

```
You: "List all projects"
Claude: [Shows all projects with status]

You: "Show active projects"
Claude: [Filters to active only]
```

### Viewing Project Tasks

```
You: "Show tasks for backend-redesign"
Claude: [Lists all tasks in that project]

You: "What's pending in house-sale?"
Claude: [Shows pending tasks for house-sale]
```

### Creating Tasks in Projects

```
You: "Create a task in backend-redesign to implement the new API endpoints"
Claude: [Creates task linked to project]
```

### Updating Project Status

```
You: "Mark backend-redesign as on-hold"
Claude: [Updates project status]

You: "Complete the house-sale project"
Claude: [Marks complete, preserves all tasks and context]
```

### Adding Project Notes

```
You: "Add a note to backend-redesign: Database migration completed successfully. Ready for API implementation."
Claude: [Appends to project notes]
```

## Project Lifecycle

### Starting a Project

1. **Create project** (implicitly or explicitly)
2. **Add context file** with goals and background
3. **Create initial tasks** to break down the work
4. **Set ownership** (daniel or reeves)
5. **Mark as active**

```
You: "Starting a new project to sell my house. Create it as house-sale."
Claude: [Creates project]

You: "Create tasks: get appraisal, stage house, list on MLS"
Claude: [Creates tasks in house-sale project]
```

### Working on a Project

1. **Review tasks** in the project
2. **Prioritize** what's next
3. **Update status** as work progresses
4. **Document decisions** in learning logs
5. **Add follow-up tasks** as needed

```
You: "What's next for backend-redesign?"
Claude: [Shows prioritized tasks]

You: "Start the database schema design task"
Claude: [Marks in_progress]
```

### Completing a Project

1. **Finish all critical tasks**
2. **Document outcomes** in learning log
3. **Update project notes** with final status
4. **Mark project complete**
5. **Archive eventually**

```
You: "All house-sale tasks are done. Mark the project complete with notes about final sale price and what worked well."
Claude: [Completes project, preserves history]
```

## Advanced Patterns

### Multi-Phase Projects

Break large projects into phases using task organization:

```
backend-redesign/
├── Phase 1: Research
│   ├── Research database options
│   ├── Evaluate architecture patterns
│   └── Document findings
├── Phase 2: Design
│   ├── Design database schema
│   ├── Design API structure
│   └── Create architecture diagrams
└── Phase 3: Implementation
    ├── Implement database layer
    ├── Implement API endpoints
    └── Write tests
```

### Dependencies Between Projects

Document in notes or learning logs:

```json
{
  "frontend-redesign": {
    "notes": "Blocked until backend-redesign completes. Need new API endpoints before implementing new UI."
  }
}
```

### Recurring Projects

Use the same project name for ongoing work:

```json
{
  "house-maintenance": {
    "owner": "daniel",
    "status": "active",
    "notes": "Ongoing house repairs and maintenance. Create tasks as issues arise."
  }
}
```

### Sub-Projects

Use hierarchical naming:

```
backend-redesign
backend-redesign-testing
backend-redesign-deployment
```

## Best Practices

### DO

- ✅ Use descriptive project names
- ✅ Create context files for important projects
- ✅ Keep project notes updated
- ✅ Group related tasks in projects
- ✅ Set appropriate ownership
- ✅ Update status as projects evolve
- ✅ Document decisions in learning logs
- ✅ Complete projects when truly done

### DON'T

- ❌ Create projects for single tasks
- ❌ Use vague project names ("project1", "stuff")
- ❌ Leave projects in limbo (mark on-hold or cancelled)
- ❌ Put unrelated tasks in same project
- ❌ Forget to link context files
- ❌ Skip documenting outcomes
- ❌ Create too many active projects

## Examples

### Software Development Project

```json
{
  "api-v2-migration": {
    "owner": "reeves",
    "status": "active",
    "context_file": "/reeves/learning-logs/2025-12-api-v2.md",
    "notes": "Migrating from REST to GraphQL. Need to maintain backward compatibility during transition. Target completion: Q1 2026."
  }
}
```

**Tasks:**
- Research GraphQL schema design
- Design migration strategy
- Implement GraphQL resolvers
- Update client libraries
- Deploy to staging
- Monitor production rollout

### House Project

```json
{
  "kitchen-renovation": {
    "owner": "daniel",
    "status": "active",
    "context_file": "/reeves/learning-logs/2025-12-kitchen-reno.md",
    "notes": "Full kitchen renovation. Budget: $50k. Contractor: Tom (555-0123). Start date: Jan 15."
  }
}
```

**Tasks:**
- Get design consultation
- Finalize cabinet choices
- Order appliances
- Schedule contractor
- Daily check-ins during work
- Final walkthrough

### Legal Project

```json
{
  "landlord-dispute": {
    "owner": "daniel",
    "status": "active",
    "context_file": "/reeves/learning-logs/2025-11-landlord-case.md",
    "notes": "Dispute with previous landlord over security deposit. Attorney: Sarah Chen. Court date: Dec 20."
  }
}
```

**Tasks:**
- Gather evidence (photos, receipts)
- Draft timeline of events
- Prepare witness statements
- Review with attorney
- Prepare for court
- Follow up after hearing

### Partnership Project

```json
{
  "startup-idea-validation": {
    "owner": "daniel",
    "status": "active",
    "context_file": "/reeves/learning-logs/2025-12-startup-validation.md",
    "notes": "Validating startup idea with potential co-founder Alex. Need to assess market fit before committing."
  }
}
```

**Tasks:**
- Interview potential customers
- Research competitors
- Draft business model
- Build MVP prototype
- Get feedback from 10 users
- Decide go/no-go

## Project Statistics

Track project health:

```
You: "How many projects do I have active?"
Claude: [Shows count and list]

You: "What projects have the most tasks?"
Claude: [Shows project task counts]

You: "What projects haven't been updated recently?"
Claude: [Shows stale projects]
```

## Archiving and Cleanup

### When to Archive

Archive projects that are:
- Completed long ago (6+ months)
- Reference-only
- Not actively reviewed

### How to Archive

Manually edit `projects.json`:

```json
{
  "old-website-redesign": {
    "owner": "reeves",
    "status": "archived",
    "context_file": "/reeves/learning-logs/2025-06-website.md",
    "notes": "Archived: Completed in June 2025. Redesign successful, site launched without issues."
  }
}
```

### Keeping Context

Even archived projects preserve:
- All task history
- Learning logs
- Context files
- Notes and decisions

You can always reference them later.

## Troubleshooting

### Project Not Found

**Problem:** Can't find a project you know exists

**Solutions:**
1. List all projects: `"Show me all projects"`
2. Check spelling in tasks.json
3. Verify project name matches exactly

### Tasks Not Showing in Project

**Problem:** Created task but it's not in the project

**Solutions:**
1. Check task's project field matches project name exactly
2. Verify project exists: `"List all projects"`
3. List tasks without filter: `"Show all tasks"`

### Too Many Projects

**Problem:** Project list is overwhelming

**Solutions:**
1. Archive completed projects
2. Cancel abandoned projects
3. Merge similar projects
4. Focus on active status only: `"Show active projects"`

## Next Steps

- [Learn about Tasks](/guide/tasks)
- [Using Learning Logs](/guide/learning-logs)
- [Managing Contacts](/guide/contacts)
- [Project Schema Reference](/api/project-schema)
- [Real-World Examples](/examples/real-world)

---

**Projects are how you organize your life in Reeves.**
