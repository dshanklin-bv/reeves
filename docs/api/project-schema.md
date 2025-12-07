# Project Schema Reference

Complete reference for project data structure in Reeves.

## Project Interface

```typescript
interface Project {
  slug: string;
  owner: "daniel" | "reeves";
  status: ProjectStatus;
  context_file?: string;
  notes: string;
  created: string;
  updated: string;
}

type ProjectStatus = "active" | "on-hold" | "completed" | "cancelled" | "archived";
```

## Storage Format

Projects are stored as a JSON object with slugs as keys:

```json
{
  "backend-redesign": {
    "owner": "reeves",
    "status": "active",
    "context_file": "/reeves/learning-logs/2025-12-backend-redesign.md",
    "notes": "Redesigning backend architecture for scale"
  },
  "house-sale": {
    "owner": "daniel",
    "status": "active",
    "context_file": "/reeves/learning-logs/2025-11-house-sale.md",
    "notes": "Selling 239 Eagle Drive house"
  }
}
```

## Field Definitions

### slug

**Type:** `string`
**Required:** Yes (project key)
**Unique:** Yes
**Format:** lowercase-with-dashes

Project identifier used throughout Reeves.

**Examples:**
```
"backend-redesign"
"house-sale-239-eagle"
"legal-case-settlement"
"emily-birthday-party"
```

**Naming Rules:**
- Lowercase only
- Use hyphens (not underscores or spaces)
- Descriptive (2-4 words ideal)
- Stable (avoid renaming)
- Unique across all projects

---

### owner

**Type:** `"daniel" | "reeves"`
**Required:** Yes

Who is responsible for the project.

```typescript
type Owner =
  | "daniel"   // Human leads (meetings, calls, decisions)
  | "reeves";  // AI leads (research, documentation, analysis)
```

**When to use "daniel":**
- Projects requiring human presence
- Phone calls and meetings
- Physical work (house repairs)
- Legal matters
- Family coordination

**When to use "reeves":**
- Research projects
- Documentation
- Technical analysis
- Code development

**Examples:**
```json
{ "owner": "daniel" }  // house-sale
{ "owner": "reeves" }  // backend-redesign
```

---

### status

**Type:** `ProjectStatus`
**Required:** Yes (defaults to "active")

Current state of the project.

```typescript
type ProjectStatus =
  | "active"      // Currently working on
  | "on-hold"     // Paused temporarily
  | "completed"   // Finished successfully
  | "cancelled"   // No longer pursuing
  | "archived";   // Keeping for reference
```

**Status Flow:**
```
active → on-hold → active
active → completed → archived
active → cancelled → archived
```

**Examples:**
```json
{ "status": "active" }      // Working now
{ "status": "on-hold" }     // Paused, will resume
{ "status": "completed" }   // Done
{ "status": "archived" }    // Reference only
```

---

### context_file

**Type:** `string`
**Required:** No (recommended for important projects)
**Format:** Absolute path to markdown file

Path to learning log with detailed project context.

**Examples:**
```json
{
  "context_file": "/Users/daniel/private/reeves/learning-logs/2025-12-backend-redesign.md"
}
{
  "context_file": "/reeves/learning-logs/2025-11-house-sale.md"
}
```

**What belongs in context file:**
- Project goals and objectives
- Key decisions and rationale
- Research findings
- Meeting notes
- Strategic thinking
- Lessons learned

**See:** [Learning Logs Guide](/guide/learning-logs)

---

### notes

**Type:** `string`
**Required:** No

Short summary of project status and key points.

**Examples:**
```json
{
  "notes": "Redesigning backend for scale. Migrating from MongoDB to PostgreSQL. Phase 1 (research) complete, starting Phase 2 (design)."
}
{
  "notes": "Selling Oakland house. Repairs complete, staging scheduled for Dec 5. Listing on MLS Dec 15."
}
```

**Best Practices:**
- Keep under 200 characters
- Focus on current status
- Highlight key constraints
- Use notes for quick reference
- Use context_file for details

---

### created

**Type:** `string`
**Required:** Yes (auto-generated)
**Format:** ISO 8601 timestamp

When the project was created.

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

When the project was last modified.

```json
{
  "updated": "2025-12-06T15:30:00Z"
}
```

---

## Complete Examples

### Software Project

```json
{
  "backend-redesign": {
    "owner": "reeves",
    "status": "active",
    "context_file": "/reeves/learning-logs/2025-12-backend-redesign.md",
    "notes": "Full backend redesign. Migrating to microservices architecture. PostgreSQL over MongoDB. Target: Q2 2026 launch.",
    "created": "2025-12-05T10:00:00Z",
    "updated": "2025-12-06T16:45:00Z"
  }
}
```

**Related Tasks:**
- Research database options
- Design database schema
- Implement migration scripts
- Update API endpoints

---

### House Project

```json
{
  "house-sale-239-eagle": {
    "owner": "daniel",
    "status": "active",
    "context_file": "/reeves/learning-logs/2025-11-house-sale.md",
    "notes": "Selling 239 Eagle Dr. Repairs: $8,500 complete. Staging Dec 5. List Dec 15. Target: Close by Feb 15.",
    "created": "2025-11-15T10:00:00Z",
    "updated": "2025-12-06T08:00:00Z"
  }
}
```

**Related Tasks:**
- Coordinate electrician Tom
- Schedule painter Sarah
- Get professional staging
- List on MLS

---

### Legal Project

```json
{
  "landlord-dispute": {
    "owner": "daniel",
    "status": "active",
    "context_file": "/reeves/learning-logs/2025-11-landlord-case.md",
    "notes": "Dispute over $2,500 security deposit. Attorney: Sarah Chen. Court date: Dec 20. Evidence collected, timeline prepared.",
    "created": "2025-11-01T10:00:00Z",
    "updated": "2025-12-06T14:00:00Z"
  }
}
```

**Related Tasks:**
- Collect evidence photos
- Write timeline of events
- Prepare witness statements
- Review with attorney

---

### Family Project

```json
{
  "emily-birthday-2025": {
    "owner": "daniel",
    "status": "active",
    "context_file": "/reeves/learning-logs/2025-12-emily-birthday.md",
    "notes": "Emily's 10th birthday party. Date: Jan 15. Venue: Fun Zone. 15 kids invited. Cake ordered from Sweet Bakery.",
    "created": "2025-12-01T10:00:00Z",
    "updated": "2025-12-06T19:00:00Z"
  }
}
```

**Related Tasks:**
- Send invitations
- Track RSVPs
- Buy decorations
- Wrap presents

---

### Completed Project

```json
{
  "api-v1-launch": {
    "owner": "reeves",
    "status": "completed",
    "context_file": "/reeves/learning-logs/2025-09-api-v1.md",
    "notes": "API v1 successfully launched Sept 2025. No major issues. 1,000+ users onboarded first month. Migrating to v2 in 2026.",
    "created": "2025-06-01T10:00:00Z",
    "updated": "2025-09-30T18:00:00Z"
  }
}
```

---

### Archived Project

```json
{
  "old-website-redesign": {
    "owner": "reeves",
    "status": "archived",
    "context_file": "/reeves/learning-logs/2025-03-website.md",
    "notes": "ARCHIVED: Website redesign completed March 2025. Launched successfully, no ongoing work. Keeping for reference.",
    "created": "2025-01-15T10:00:00Z",
    "updated": "2025-03-30T15:00:00Z"
  }
}
```

---

## Validation Rules

### Required Fields

```typescript
// Minimum valid project
{
  slug: string,     // Required (as object key)
  owner: "daniel" | "reeves",  // Required
  status: ProjectStatus         // Required
}
```

### Field Constraints

```typescript
// slug: lowercase-with-dashes
slug: string (match: /^[a-z0-9-]+$/)

// owner: Must be valid enum value
owner: "daniel" | "reeves"

// status: Must be valid enum value
status: "active" | "on-hold" | "completed" | "cancelled" | "archived"

// context_file: Absolute path if provided
context_file?: string (absolute path)

// notes: String (can be empty)
notes: string

// Timestamps: ISO 8601 format
created: string (ISO 8601)
updated: string (ISO 8601)
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "patternProperties": {
    "^[a-z0-9-]+$": {
      "type": "object",
      "required": ["owner", "status", "created", "updated"],
      "properties": {
        "owner": {
          "type": "string",
          "enum": ["daniel", "reeves"]
        },
        "status": {
          "type": "string",
          "enum": ["active", "on-hold", "completed", "cancelled", "archived"]
        },
        "context_file": {
          "type": "string"
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
        }
      }
    }
  }
}
```

## Relationship to Tasks

Tasks link to projects via the `project` field:

```json
// Task
{
  "id": 42,
  "content": "Research database options",
  "project": "backend-redesign"  // Links to project slug
}

// Project
{
  "backend-redesign": {
    "owner": "reeves",
    "status": "active"
  }
}
```

**Query tasks by project:**
```typescript
list_tasks({ project: "backend-redesign" })
```

## Best Practices

### DO

- ✅ Use descriptive project names
- ✅ Create context files for important projects
- ✅ Keep notes updated with current status
- ✅ Set appropriate ownership
- ✅ Update status as project evolves
- ✅ Link related tasks to project
- ✅ Document completion outcomes

### DON'T

- ❌ Create projects for single tasks
- ❌ Use vague names ("project1", "stuff")
- ❌ Leave projects in limbo status
- ❌ Forget to link context files
- ❌ Put entire project history in notes
- ❌ Create projects unnecessarily

## Next Steps

- [Task Schema Reference](/api/task-schema)
- [Contact Schema Reference](/api/contact-schema)
- [Project Management Guide](/guide/projects)
- [MCP Tools Reference](/api/tools)

---

**Complete project data structure for Reeves.**
