# Learning Logs

Deep context and project history preservation in Reeves.

## What are Learning Logs?

Learning logs are **markdown files** that capture deep context about projects, relationships, and decisions. They're where detailed history lives, separate from the lean task/contact structure.

**Learning logs contain:**
- Project initialization and goals
- Interview transcripts
- Strategic decisions and rationale
- Meeting notes
- Complex relationship histories
- Research findings
- Lessons learned

::: tip Single Source of Truth
Learning logs are the **authoritative source** for project context. Tasks and contacts link to them, but don't duplicate them.
:::

## File Structure

```
/reeves/learning-logs/
├── 2025-12-backend-redesign.md
├── 2025-11-house-sale.md
├── 2025-12-aic-holdings-partnership.md
└── 2025-11-landlord-case.md
```

### Naming Convention

Use: `YYYY-MM-DD-project-slug.md`

**Examples:**
- `2025-12-06-backend-redesign.md`
- `2025-11-15-house-sale-239-eagle.md`
- `2025-12-01-emily-crv-recovery.md`

**Why dates?**
- Chronological ordering
- Easy to find by time
- Multiple logs per project over time

## Learning Log Structure

### Basic Template

```markdown
# [Project Name] - Context

**Date:** YYYY-MM-DD
**Project:** project-slug
**Stakeholders:** List key people

## Context

**What:** Brief description of what this is

**Why:** Why this matters

**Timeline:** Key dates and deadlines

## Background

Detailed background information...

## Key Decisions

### Decision 1: [Title]
- **Date:** YYYY-MM-DD
- **Decision:** What was decided
- **Rationale:** Why
- **Alternatives Considered:** What else we looked at
- **Outcome:** What happened

## Meeting Notes

### Meeting YYYY-MM-DD with [Person]
- **Attendees:**
- **Topics:**
- **Decisions:**
- **Action Items:**

## Next Steps

- [ ] Action item 1
- [ ] Action item 2

## Links

- Related tasks: #123, #456
- Related projects: other-project-name
- External resources: URLs
```

## When to Create Learning Logs

### New Project Starts

```
You: "Starting a new project to redesign the backend. Create a learning log."

Claude: [Creates learning-logs/2025-12-backend-redesign.md]

Structure created:
- Project goals
- Technical requirements
- Success criteria
- Timeline
- Stakeholders
```

### Major Decision Point

```
You: "We just decided to migrate from MongoDB to PostgreSQL. Document this decision."

Claude: [Updates learning log with decision]

Added:
- Decision rationale
- Alternatives considered
- Migration plan
- Timeline
```

### Interview Conducted

```
You: "I interviewed 5 customers today about the product. Create a learning log."

Claude: [Creates learning-logs/2025-12-customer-interviews.md]

Captures:
- Interview questions
- Customer responses
- Patterns identified
- Action items
```

### Complex Situation

```
You: "The landlord dispute has gotten complicated. Start a learning log to track everything."

Claude: [Creates learning-logs/2025-11-landlord-case.md]

Includes:
- Timeline of events
- Evidence inventory
- Legal strategy
- Attorney communications
```

## Linking to Learning Logs

### From Projects

```json
{
  "backend-redesign": {
    "owner": "reeves",
    "status": "active",
    "context_file": "/reeves/learning-logs/2025-12-backend-redesign.md",
    "notes": "See context file for complete history"
  }
}
```

### From Contacts

```json
{
  "sarah_attorney": {
    "primary_phone": "5551234567",
    "relationship": "attorney",
    "context_files": [
      "/reeves/learning-logs/2025-11-landlord-case.md",
      "/reeves/artifacts/landlord-case/attorney-briefing.md"
    ]
  }
}
```

### From Tasks

```json
{
  "content": "Review evidence with attorney",
  "notes": "See learning log at /reeves/learning-logs/2025-11-landlord-case.md for complete case history"
}
```

## Example: Backend Redesign

**File:** `learning-logs/2025-12-backend-redesign.md`

```markdown
# Backend Redesign - Technical Context

**Date:** 2025-12-06
**Project:** backend-redesign
**Owner:** Reeves
**Stakeholders:** Daniel (decision maker), Development team

## Context

**What:** Complete backend architecture redesign from monolith to microservices

**Why:** Current MongoDB-based monolith hitting scalability limits at 10k users. Need to support 100k+ users by Q2 2026.

**Timeline:**
- Phase 1 (Research): Dec 2025
- Phase 2 (Design): Jan 2026
- Phase 3 (Implementation): Feb-Mar 2026
- Phase 4 (Migration): Apr 2026

## Background

### Current Architecture
- Single Node.js server
- MongoDB database
- REST API
- Hosted on single AWS EC2 instance

### Pain Points
- Database queries slow (>2s) at peak load
- No transaction support
- Difficult to scale horizontally
- Deployment takes entire system down

## Key Decisions

### Decision 1: PostgreSQL over MongoDB
- **Date:** 2025-12-06
- **Decision:** Migrate from MongoDB to PostgreSQL
- **Rationale:**
  - Need ACID transactions
  - Better performance for complex queries
  - Team has more PostgreSQL experience
  - Established migration tools available
- **Alternatives Considered:**
  - Stay with MongoDB (rejected - no transactions)
  - MySQL (rejected - licensing concerns)
  - DynamoDB (rejected - too different, learning curve)
- **Outcome:** Proceeding with PostgreSQL migration plan

### Decision 2: Microservices Architecture
- **Date:** 2025-12-07
- **Decision:** Break into 5 core services
- **Services:**
  1. Auth service
  2. User service
  3. Content service
  4. Analytics service
  5. API gateway
- **Rationale:**
  - Independent scaling
  - Team can work in parallel
  - Isolate failures
  - Deploy independently
- **Risks:**
  - Complexity increase
  - Network latency between services
  - Distributed transactions harder

## Research Findings

### Database Options Analysis

**PostgreSQL:**
- ✅ ACID transactions
- ✅ Mature, stable
- ✅ Excellent query performance
- ✅ JSON support for flexibility
- ❌ Slightly more ops overhead

**MongoDB:**
- ✅ Flexible schema
- ✅ Team familiar
- ❌ No transactions (deal-breaker)
- ❌ Query performance at scale

## Migration Plan

### Phase 1: Schema Design (2 weeks)
- [ ] Design PostgreSQL schema
- [ ] Create migration scripts
- [ ] Test with sample data

### Phase 2: Dual-Write (2 weeks)
- [ ] Write to both MongoDB and PostgreSQL
- [ ] Verify data consistency
- [ ] Monitor performance

### Phase 3: Read Cutover (1 week)
- [ ] Switch reads to PostgreSQL
- [ ] Monitor error rates
- [ ] Keep MongoDB as backup

### Phase 4: Decommission (1 week)
- [ ] Stop MongoDB writes
- [ ] Archive MongoDB data
- [ ] Remove MongoDB dependency

## Risks and Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Data loss during migration | High | Low | Dual-write period, backups |
| Performance regression | High | Medium | Load testing, rollback plan |
| Extended downtime | Medium | Low | Phased migration, feature flags |
| Team learning curve | Low | High | Training, documentation |

## Resources

- [PostgreSQL Migration Guide](https://example.com)
- [Microservices Patterns Book](https://example.com)
- [Team Notion](https://example.com)

## Meeting Notes

### Meeting 2025-12-06 with Development Team
- **Attendees:** Daniel, 3 engineers
- **Topics:** Migration approach discussion
- **Decisions:** Agreed on PostgreSQL, 4-phase plan
- **Concerns:** Timeline might be aggressive
- **Action Items:**
  - [ ] Create detailed schema design (assigned: Reeves)
  - [ ] Research migration tools (assigned: Reeves)
  - [ ] Draft timeline with milestones (assigned: Daniel)

## Next Steps

1. Complete database schema design
2. Build proof-of-concept migration
3. Load test PostgreSQL with production data sample
4. Get team sign-off on timeline
5. Begin Phase 1 implementation

## Lessons Learned

*(Will update as project progresses)*

---

**Status:** Active
**Last Updated:** 2025-12-07
**Linked Tasks:** #42, #43, #44, #45
```

## Example: House Sale

**File:** `learning-logs/2025-11-house-sale-239-eagle.md`

```markdown
# 239 Eagle Drive House Sale

**Date:** 2025-11-15
**Project:** house-sale-239-eagle-dr
**Owner:** Daniel
**Timeline:** List by Jan 1, Close by Feb 15

## Property Details

- **Address:** 239 Eagle Drive, Oakland, CA
- **Purchase Date:** 2018-03-15
- **Purchase Price:** $650,000
- **Target List Price:** $825,000
- **Estimated Value:** $800,000-$850,000

## Why Selling

Moving to larger property for family. Kids need more space, better school district.

## Contractors

### Tom - Electrician
- **Phone:** 555-1234567
- **Work:** Electrical inspection, outlet upgrades
- **Cost:** $2,500
- **Status:** Completed 2025-11-20
- **Notes:** Found code violations, fixed before listing

### John - Plumber
- **Phone:** 555-9876543
- **Work:** Kitchen leak, bathroom repairs
- **Cost:** $1,800
- **Status:** Completed 2025-11-18
- **Notes:** Reliable, fast turnaround

### Sarah - Painter
- **Phone:** 555-5551234
- **Work:** Living room, kitchen, all bedrooms
- **Cost:** $4,200
- **Status:** In progress, due 2025-12-01
- **Notes:** Excellent work quality

## Repairs Completed

- ✅ Electrical code violations (Tom - $2,500)
- ✅ Kitchen sink leak (John - $800)
- ✅ Bathroom toilet replacement (John - $1,000)
- ⏳ Interior painting (Sarah - $4,200)
- ⏳ Exterior touch-ups (Sarah - included)

**Total Repairs:** $8,500

## Staging Plan

- Professional stager: $1,500
- Scheduled for: 2025-12-05
- Focus: Living room, kitchen, master bedroom

## Real Estate Agent

- **Name:** Jennifer Martinez
- **Agency:** Bay Area Realty
- **Phone:** 555-3334444
- **Email:** jennifer@bayarearealty.com
- **Commission:** 5% (2.5% us, 2.5% buyer)
- **Marketing Plan:**
  - Professional photos
  - Virtual tour
  - Open house first weekend
  - Social media campaign

## Timeline

- 2025-11-15: Decided to sell
- 2025-11-18: Started repairs
- 2025-11-20: Electrical completed
- 2025-12-01: Painting completed (target)
- 2025-12-05: Staging
- 2025-12-08: Photos taken
- 2025-12-15: List on MLS
- 2025-12-16-17: Open house
- 2026-01-15: Target offer acceptance
- 2026-02-15: Target close date

## Notes

### 2025-11-18
Tom found code violations during inspection. Required immediate fix before listing. Added $800 to budget but necessary for sale.

### 2025-11-20
Showed house to 2 potential buyers before listing. Both interested. Jennifer says this is good sign for quick sale.

### 2025-11-25
Neighbor asked about price. Told them we're listing at $825k. They mentioned recent comparable sales at $810k-$830k. On track.

## Budget

| Category | Estimated | Actual | Difference |
|----------|-----------|--------|------------|
| Repairs | $7,000 | $8,500 | +$1,500 |
| Staging | $1,500 | TBD | - |
| Commission | $41,250 | TBD | - |
| Closing Costs | $5,000 | TBD | - |
| **Total** | **$54,750** | **$8,500** | - |

**Net Proceeds Estimate:** $825,000 - $54,750 - $650,000 (original) = $120,250

---

**Status:** In Progress
**Next Update:** After staging (2025-12-05)
**Linked Tasks:** #15, #16, #17, #18, #19
```

## Best Practices

### DO

- ✅ Create learning logs for important projects
- ✅ Link from tasks/contacts/projects
- ✅ Update as decisions are made
- ✅ Include context and rationale
- ✅ Date all entries
- ✅ Use markdown for formatting
- ✅ Add tables, lists, and structure
- ✅ Reference external resources

### DON'T

- ❌ Duplicate information into contacts.json
- ❌ Create learning logs for trivial projects
- ❌ Forget to link from project metadata
- ❌ Leave decisions undocumented
- ❌ Skip the "why" behind choices
- ❌ Let logs get stale

## Maintenance

### When to Update

- After major decisions
- Following important meetings
- When project status changes
- As new information emerges
- Upon project completion

### Archiving

Learning logs stay forever. Even completed projects preserve context for future reference.

```bash
# Keep all learning logs
# No need to archive or delete
# Disk space is cheap
# Context is valuable
```

## Working with Claude Code

```
You: "Create a learning log for the backend redesign project"
Claude: [Creates learning-logs/2025-12-backend-redesign.md]
[Adds initial structure]
[Links from project]

You: "Update the learning log with the PostgreSQL decision"
Claude: [Adds decision section with rationale]

You: "Show me what we decided about the database"
Claude: [Reads learning log, summarizes decision]
```

## Next Steps

- [Learn about Tasks](/guide/tasks)
- [Learn about Projects](/guide/projects)
- [Learn about Contacts](/guide/contacts)
- [See Real-World Examples](/examples/real-world)

---

**Learning logs preserve the story behind your work.**
