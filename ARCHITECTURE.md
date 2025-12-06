# Reeves Architecture & Data Management

**Last Updated:** 2025-12-06
**Status:** Living document - update as patterns evolve

---

## Core Philosophy

1. **Pain-Driven Development** - Build when it hurts, not when it might
2. **AI Reasoning First** - Design for AI understanding, not rigid automation
3. **Simple = Debuggable** - Prefer flat files until they break
4. **Single Source of Truth** - Avoid data duplication

---

## File Structure

```
/reeves/
├── tasks.json              # Active work items (flat, will outgrow ~300 tasks)
├── projects.json           # Project metadata with context file links
├── learning-logs/          # Deep context, interviews, project history
├── artifacts/              # Evidence, documents, timelines, generated content
├── queue/                  # Unprocessed items (notes, ideas, inputs)
└── ARCHITECTURE.md         # This file

/life-data/
├── contacts.json           # Lightweight contact info + communication prefs
├── people.md               # Relationship context (older format, may deprecate)
└── preferences.md          # User preferences and patterns
```

---

## Data Storage Rules

### Contacts (`/life-data/contacts.json`)

**Purpose:** Quick reference for drafting messages with correct tone

**MUST Include:**
- Phone number(s)
- Relationship type
- Brief context (1-2 sentences)
- Communication preferences (tone, punctuation, formality)
- Recent interactions (last 5-10 max)
- Links to detailed context files

**MUST NOT Include:**
- Full project history (use learning-logs)
- Detailed timelines (use artifacts)
- Legal documents (use artifacts)
- Extensive notes (use context files)

**Example (GOOD):**
```json
{
  "john_doe": {
    "primary_phone": "5551234567",
    "relationship": "contractor",
    "context": "Plumber for house sale repairs",
    "projects": ["239-eagle-dr-house-sale"],
    "communication_preferences": {
      "tone": "professional",
      "punctuation": "standard_business",
      "formality": "polite_professional"
    },
    "recent_interactions": [
      {
        "date": "2025-12-06",
        "type": "text",
        "topic": "Quote for basement bathroom",
        "reeves_task_id": 123
      }
    ],
    "context_files": [
      "/reeves/learning-logs/2025-12-house-sale-contractors.md"
    ],
    "notes": "Reliable, responds within 24hrs. See context file for full history."
  }
}
```

**Example (BAD - Too Much Detail):**
```json
{
  "john_doe": {
    "primary_phone": "5551234567",
    "full_history": "Met John in 2020 when he fixed the kitchen sink...",
    "all_interactions": [...50 messages...],
    "contract_details": {...lengthy contract...},
    "invoice_history": [...years of invoices...]
  }
}
```

---

### Learning Logs (`/reeves/learning-logs/`)

**Purpose:** Deep context, project history, strategic thinking

**Use for:**
- Interview transcripts
- Project initialization and context
- Strategic decisions and rationale
- Complex relationship histories
- Multi-step planning and analysis

**Format:** Markdown with clear sections

**Naming:** `YYYY-MM-DD-project-slug.md`

**When to create:**
- New project starts
- Major decision point
- Interview conducted
- Complex situation needs documentation

---

### Artifacts (`/reeves/artifacts/`)

**Purpose:** Evidence, generated content, documents

**Use for:**
- Timelines and chronologies
- Attorney briefing packages
- Call notes and tearsheets
- Evidence collections
- Generated reports
- Reference documents

**Structure:** Organize by project
```
/reeves/artifacts/
├── project-name/
│   ├── README.md           # What's in this folder
│   ├── timeline.md         # Chronological events
│   ├── evidence-*.md       # Supporting documentation
│   └── generated-*.pdf     # Output documents
```

---

## When Files Get Too Big

### Current Limits (JSON is fine until...):
- **Tasks:** ~200-300 total (performance degrades)
- **Contacts:** ~50-100 (file size manageable)
- **Interactions per contact:** 5-10 recent (older ones archived)

### Migration Triggers:
1. Tasks > 300 (consider SQLite)
2. Multiple personas launching (Finn, Mary - concurrency issues)
3. Web UI needed (multi-device access)
4. Analytics desired (complex queries)

### Future Path:
```
Phase 1 (Now):     JSON files
Phase 2 (6-12mo):  SQLite for queries, JSON for storage
Phase 3 (1-2yr):   Database primary, JSON for export
Phase 4 (2-3yr):   Full platform (web, vector search, etc)
```

---

## Contact Management Workflow

### When adding new contact:

1. **Start lean** - Just communication preferences
2. **Link context files** - Don't duplicate
3. **Keep interactions recent** - Last 5-10 only
4. **Update after messaging** - Add interaction record

### When contact gets complex:

1. **Create learning log** - Deep context goes here
2. **Create artifacts folder** - Evidence/documents go here
3. **Link from contact** - Use `context_files` array
4. **Keep contact minimal** - Just enough for messaging

### When updating interactions:

```javascript
// GOOD: Add new, keep last 10
"recent_interactions": [
  { "date": "2025-12-06", ... },  // newest
  { "date": "2025-12-05", ... },
  // ... keep ~10 total
]

// BAD: Keep everything
"recent_interactions": [
  // ... 500 interactions dating back years
]
```

---

## Automation & Validation

### Pre-commit Checks (Future):
- Contact entries don't exceed 100 lines
- All `context_files` paths are valid
- Recent interactions limited to 10
- Required fields present

### MCP Server Integration:
- MCP tools enforce lean contact structure
- Auto-link to learning logs when available
- Warn when duplication detected

---

## Decision Making

**Use this checklist when unsure where data belongs:**

- [ ] Is this for drafting messages? → `contacts.json`
- [ ] Is this a project story/history? → `learning-logs/`
- [ ] Is this evidence/documents? → `artifacts/`
- [ ] Is this active work? → `tasks.json`
- [ ] Is this metadata about projects? → `projects.json`

**If data fits multiple categories:**
- Primary location = where it's most detailed
- Other locations = link to primary with `context_files`

---

## Examples

### Good Pattern: Emily Rothrock

**Contact entry:**
- Basic info, communication prefs
- Last 2 interactions
- Links to 3 context files

**Learning log:**
- Full Honda CRV recovery story
- Timeline, strategic context
- Legal situation details

**Artifacts:**
- Message timeline (195 messages)
- Attorney briefing package
- Witness statement

**Result:** Single source of truth (learning log), quick reference (contact), evidence (artifacts)

---

### Bad Pattern: Everything in Contacts

```json
// DON'T DO THIS
{
  "person": {
    "full_life_story": "...",
    "every_message_ever": [...],
    "all_documents": {...},
    "relationship_analysis": "..."
  }
}
```

**Why it's bad:**
- Duplicates data from learning logs
- Makes contacts.json huge and slow
- Hard to maintain consistency
- Will break when scaling

---

## Message Sending Protocol

**CRITICAL: Double-Verify Before Send**

### Two-Source Verification Required

Before sending any message, the recipient's phone number MUST exist in BOTH:

1. **Messages database** (from SMS/iMessage system)
2. **Reeves contacts.json** (your contact data)

**If phone numbers don't match → DO NOT SEND**

### Verification Workflow

```
Step 1: Look up contact in contacts.json
  ├─ Found? → Use phone number from contacts.json
  └─ Not found? → STOP, ask user to add contact first

Step 2: Verify phone exists in Messages database
  ├─ Use find_contact tool
  ├─ Match found? → Continue
  └─ No match? → STOP, phone numbers don't align

Step 3: Confirm both match
  ├─ contacts.json phone: "12819001802"
  ├─ Messages DB phone: "12819001802"
  └─ Match? ✓ Proceed to send

Step 4: Send using verified phone number
  └─ NEVER use "contact:N" indices
```

### Why This Matters

- **Wrong recipient = serious consequences** (business, legal, personal)
- **No undo** - Messages cannot be recalled
- **Contact:N is unreliable** - Index changes between calls
- **Prevents accidental sends** - Two databases must agree

### Implementation Rules

**DO:**
- ✓ Use phone numbers directly (e.g., "12819001802")
- ✓ Verify against both contacts.json AND Messages DB
- ✓ Stop if phone numbers don't match
- ✓ Ask user to update contacts.json if missing
- ✓ Log all sent messages to recent_interactions

**DON'T:**
- ✗ Use "contact:N" indices (they're unstable)
- ✗ Send without verification
- ✗ Guess phone numbers
- ✗ Assume contact mapping is correct

### Example: Safe Send

```json
// contacts.json entry
{
  "john_fuqua": {
    "primary_phone": "12819001802",
    "email": "john@johnfuqua.com"
  }
}

// Verification steps:
1. Read contacts.json → phone: "12819001802"
2. Call find_contact("John Fuqua") → phone: "12819001802"
3. Compare: "12819001802" === "12819001802" ✓
4. Send to "12819001802" (not "contact:1")
```

### If Verification Fails

```
Reeves: "Cannot send message - verification failed:

  contacts.json shows: '12819001802'
  Messages DB shows: '12819001803' (different!)

  Please update contacts.json or verify correct number."
```

---

## Maintenance

**Weekly:**
- Trim old interactions from contacts (keep last 10)
- Verify contact phone numbers still valid

**Monthly:**
- Archive completed project artifacts
- Update project metadata
- Cross-check contacts.json against Messages DB

**Quarterly:**
- Review for data duplication
- Check contact entry sizes
- Validate context_files links
- Audit message sending logs for errors

---

## Questions?

When in doubt:
1. Check this document
2. Look at existing patterns (Emily, Heather, Joe examples)
3. Prefer linking over duplicating
4. Keep contacts lean, context rich

---

**Remember:** This structure will evolve. JSON works until ~300 tasks, then we migrate to SQLite. The patterns established now (separation of concerns, linking, lean contacts) will translate directly to database schema.
