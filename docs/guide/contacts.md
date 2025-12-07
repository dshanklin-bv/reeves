# Contact Management

Complete guide to managing contacts and communication preferences in Reeves.

## What is a Contact?

A contact in Reeves is a **lean reference** for communicating with people. Contacts store:

- **Communication preferences** - Tone, formality, punctuation style
- **Contact information** - Phone numbers, email addresses
- **Recent interactions** - Last 5-10 messages/calls only
- **Links to context** - Where detailed history lives

::: warning Keep Contacts Lean
Contacts are for **quick reference when drafting messages**, not for storing entire relationship histories. Deep context belongs in [learning logs](/guide/learning-logs).
:::

## Contact Structure

```json
{
  "john_doe": {
    "primary_phone": "5551234567",
    "email": "john@example.com",
    "relationship": "contractor",
    "context": "Plumber for house sale repairs",
    "projects": ["house-sale"],
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

## Communication Preferences

### Tone Options

- **casual** - Friendly, relaxed ("Hey! How's it going?")
- **professional** - Polite business tone ("Hi, hope you're well.")
- **formal** - Very professional ("Dear Mr. Smith,")
- **friendly** - Warm but professional ("Hi there!")

### Punctuation Styles

- **minimal** - Very few punctuation marks, casual
- **standard** - Normal punctuation
- **standard_business** - Professional punctuation
- **precise** - Careful, detailed punctuation

### Formality Levels

- **casual** - First names, relaxed
- **polite_professional** - Respectful but friendly
- **formal_professional** - Mr./Ms., very polite
- **legal_formal** - Attorney-client communication

## Adding Contacts

### Basic Contact

```
You: "Add John Doe as a contact. He's my plumber, phone is 555-1234567"
Claude: [Creates contact entry]

Contact added:
- Name: john_doe
- Phone: 5551234567
- Relationship: contractor
- Communication: professional tone
```

### With Communication Preferences

```
You: "Add Sarah Chen as a contact. She's my attorney. Phone 555-9876543. Use formal professional tone with her."
Claude: [Creates contact with preferences]

Contact added:
- Name: sarah_chen
- Phone: 5559876543
- Relationship: attorney
- Tone: formal
- Formality: legal_formal
```

### With Project Links

```
You: "Add Tom the contractor to contacts. He's working on the kitchen-renovation project. Phone 555-1112222."
Claude: [Creates contact linked to project]

Contact added:
- Name: tom_contractor
- Phone: 5551112222
- Projects: ["kitchen-renovation"]
- Communication: professional
```

## Contact Information Types

### Phone Numbers

Store without formatting (digits only):

✅ Good: `"5551234567"` or `"12819001802"`
❌ Bad: `"(555) 123-4567"` or `"+1-281-900-1802"`

**Why:** Enables direct API calls to messaging systems.

### Email Addresses

```json
{
  "email": "john@example.com",
  "work_email": "john@company.com"
}
```

### Multiple Phone Numbers

```json
{
  "primary_phone": "5551234567",
  "work_phone": "5559876543",
  "mobile": "5551112222"
}
```

## Recent Interactions

### What to Track

```json
{
  "recent_interactions": [
    {
      "date": "2025-12-06",
      "type": "text",
      "topic": "Quote for basement bathroom",
      "reeves_task_id": 123
    },
    {
      "date": "2025-12-05",
      "type": "call",
      "topic": "Discussed timeline for repairs"
    }
  ]
}
```

### Interaction Types

- **text** - SMS or iMessage
- **call** - Phone call
- **email** - Email exchange
- **meeting** - In-person or video call

### Keep It Recent

::: tip Only Last 5-10 Interactions
Older interactions belong in [learning logs](/guide/learning-logs), not contacts. Keep contacts lightweight for fast AI reasoning.
:::

## Context Files

### Linking to Learning Logs

```json
{
  "context_files": [
    "/reeves/learning-logs/2025-12-house-sale-contractors.md",
    "/reeves/learning-logs/2025-11-plumbing-history.md"
  ]
}
```

**Context files contain:**
- Full relationship history
- Project stories
- Strategic decisions
- Interview transcripts
- Complex details

**Contacts reference them but don't duplicate them.**

## Message Sending Protocol

::: danger CRITICAL: Double-Verify Before Send
Before sending any message, verify the recipient's phone number exists in BOTH:
1. **Reeves contacts.json**
2. **Messages database** (from SMS/iMessage system)

If phone numbers don't match → **DO NOT SEND**
:::

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
Claude: "Cannot send message - verification failed:

  contacts.json shows: '12819001802'
  Messages DB shows: '12819001803' (different!)

  Please update contacts.json or verify correct number."
```

## Drafting Messages

### Using Communication Preferences

```
You: "Draft a text to John Doe asking about the repair quote"
Claude: [Uses professional tone from contact preferences]

Draft message:
"Hi John, hope you're doing well. I wanted to follow up on the quote for the basement bathroom repair. Do you have an estimate ready? Thanks."
```

### Tone-Aware Drafting

```
You: "Draft a text to Sarah Chen (attorney) about court date"
Claude: [Uses formal professional tone]

Draft message:
"Dear Ms. Chen, I wanted to confirm our court appearance scheduled for December 20th. Please let me know if you need any additional documentation. Thank you."
```

## Contact Organization

### By Relationship Type

Common relationship types:
- **family** - Parents, siblings, relatives
- **friend** - Personal friends
- **contractor** - Service providers
- **attorney** - Legal counsel
- **business_partner** - Business relationships
- **client** - Customers or clients
- **colleague** - Coworkers

### By Project

Link contacts to relevant projects:

```json
{
  "tom_contractor": {
    "projects": ["kitchen-renovation", "house-repairs"]
  },
  "sarah_attorney": {
    "projects": ["landlord-dispute", "legal-general"]
  }
}
```

## Updating Contacts

### Add New Interaction

```
You: "I just called John about the repair. Add that to his recent interactions."
Claude: [Adds interaction with today's date]

Interaction added:
- Date: 2025-12-06
- Type: call
- Topic: Discussed repair timeline
```

### Update Phone Number

```
You: "Update John's phone number to 555-9998888"
Claude: [Updates primary_phone]
```

### Change Communication Preferences

```
You: "John prefers casual tone now, we've become friends"
Claude: [Updates tone to 'casual']
```

### Link to New Project

```
You: "Add John to the garage-door-repair project"
Claude: [Adds project to John's projects array]
```

## Best Practices

### DO

- ✅ Keep contacts lean (under 100 lines each)
- ✅ Link to learning logs for detailed history
- ✅ Only store last 5-10 interactions
- ✅ Set communication preferences for each person
- ✅ Verify phone numbers before sending messages
- ✅ Update interactions after messaging
- ✅ Use descriptive relationship types

### DON'T

- ❌ Store full relationship history in contacts
- ❌ Duplicate data from learning logs
- ❌ Keep hundreds of old interactions
- ❌ Send messages without verification
- ❌ Use "contact:N" indices for sending
- ❌ Format phone numbers (use digits only)
- ❌ Skip communication preferences

## Examples

### Family Contact

```json
{
  "mom": {
    "primary_phone": "5551234567",
    "relationship": "family",
    "context": "Mother, lives in Oakland",
    "communication_preferences": {
      "tone": "casual",
      "punctuation": "minimal",
      "formality": "casual"
    },
    "recent_interactions": [
      {
        "date": "2025-12-06",
        "type": "call",
        "topic": "Christmas plans"
      }
    ],
    "notes": "Call every Sunday. Loves updates about kids."
  }
}
```

### Business Contact

```json
{
  "alex_partner": {
    "primary_phone": "5559876543",
    "email": "alex@startup.com",
    "relationship": "business_partner",
    "context": "Co-founder of startup idea",
    "projects": ["startup-idea-validation"],
    "communication_preferences": {
      "tone": "friendly",
      "punctuation": "standard",
      "formality": "polite_professional"
    },
    "recent_interactions": [
      {
        "date": "2025-12-05",
        "type": "meeting",
        "topic": "Discussed MVP features"
      }
    ],
    "context_files": [
      "/reeves/learning-logs/2025-12-startup-validation.md"
    ],
    "notes": "Prefers video calls over phone. Available weekday evenings."
  }
}
```

### Legal Contact

```json
{
  "sarah_chen": {
    "primary_phone": "5551119999",
    "work_phone": "5552228888",
    "email": "schen@legalfirm.com",
    "relationship": "attorney",
    "context": "Legal counsel for landlord dispute",
    "projects": ["landlord-dispute"],
    "communication_preferences": {
      "tone": "formal",
      "punctuation": "standard_business",
      "formality": "legal_formal"
    },
    "recent_interactions": [
      {
        "date": "2025-12-06",
        "type": "email",
        "topic": "Court date confirmation"
      }
    ],
    "context_files": [
      "/reeves/learning-logs/2025-11-landlord-case.md",
      "/reeves/artifacts/landlord-case/attorney-briefing.md"
    ],
    "notes": "Responds to email within 24 hours. Prefers written communication for legal matters."
  }
}
```

### Contractor Contact

```json
{
  "tom_electrician": {
    "primary_phone": "5553334444",
    "relationship": "contractor",
    "context": "Electrician for house projects",
    "projects": ["kitchen-renovation", "garage-wiring"],
    "communication_preferences": {
      "tone": "professional",
      "punctuation": "standard",
      "formality": "polite_professional"
    },
    "recent_interactions": [
      {
        "date": "2025-12-06",
        "type": "text",
        "topic": "Quote for garage wiring"
      },
      {
        "date": "2025-12-03",
        "type": "call",
        "topic": "Kitchen lighting installation"
      }
    ],
    "context_files": [
      "/reeves/learning-logs/2025-12-house-contractors.md"
    ],
    "notes": "Licensed electrician. Fast, reliable. See context file for project history."
  }
}
```

## Contact Maintenance

### Weekly Tasks

- Trim old interactions (keep last 10 max)
- Verify phone numbers still valid
- Update recent interaction topics

### Monthly Tasks

- Review contact sizes (should be under 100 lines)
- Cross-check against Messages database
- Update communication preferences if needed
- Archive old contacts not actively used

### Quarterly Tasks

- Validate all context_files links
- Check for data duplication
- Review relationship types
- Audit message sending for any verification failures

## Working With Messages MCP

### Check Messages

```
You: "Show me recent messages from John"
Claude: [Uses Messages MCP to fetch messages]
```

### Find Contact in Messages

```
You: "Find John Doe in Messages database"
Claude: [Uses find_contact tool]

Found: John Doe
Phone: 5551234567
Last message: 2 days ago
```

### Send Message

```
You: "Draft and send a text to John asking about the repair quote"
Claude:
1. [Looks up John in contacts.json → phone: 5551234567]
2. [Verifies with find_contact → phone: 5551234567]
3. [Drafts message using professional tone]
4. [Shows draft for approval]

Draft:
"Hi John, hope you're doing well. I wanted to follow up on the quote for the basement bathroom repair. Do you have an estimate ready? Thanks."

Should I send this?
```

## Troubleshooting

### Contact Not Found

**Problem:** Can't find a contact you know exists

**Solutions:**
1. Check spelling: `"john_doe"` vs `"johndoe"`
2. List all contacts to verify
3. Check if contact is in Messages DB but not contacts.json

### Phone Number Mismatch

**Problem:** Verification fails when sending message

**Solutions:**
1. Update contacts.json with correct phone number
2. Verify number in Messages app
3. Remove formatting from phone number (digits only)

### Message Sent to Wrong Person

**Problem:** Message went to wrong recipient

**Solutions:**
1. ALWAYS verify before sending
2. Never use "contact:N" indices
3. Double-check phone number matches both databases
4. Consider adding confirmation step

See [Troubleshooting Guide](/guide/troubleshooting) for more help.

## Next Steps

- [Learn about Tasks](/guide/tasks)
- [Learn about Projects](/guide/projects)
- [Using Learning Logs](/guide/learning-logs)
- [Contact Schema Reference](/api/contact-schema)
- [Real-World Examples](/examples/real-world)

---

**Contacts help you communicate correctly with everyone in your life.**
