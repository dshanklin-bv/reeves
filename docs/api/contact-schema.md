# Contact Schema Reference

Complete reference for contact data structure in Reeves.

## Contact Interface

```typescript
interface Contact {
  primary_phone: string;
  email?: string;
  work_phone?: string;
  mobile?: string;
  relationship: string;
  context: string;
  projects: string[];
  communication_preferences: CommunicationPreferences;
  recent_interactions: Interaction[];
  context_files: string[];
  notes: string;
}

interface CommunicationPreferences {
  tone: "casual" | "friendly" | "professional" | "formal";
  punctuation: "minimal" | "standard" | "standard_business" | "precise";
  formality: "casual" | "polite_professional" | "formal_professional" | "legal_formal";
}

interface Interaction {
  date: string;
  type: "text" | "call" | "email" | "meeting";
  topic: string;
  reeves_task_id?: number;
}
```

## Storage Format

Contacts are stored as a JSON object with contact slugs as keys:

```json
{
  "john_doe": {
    "primary_phone": "5551234567",
    "email": "john@example.com",
    "relationship": "contractor",
    "context": "Plumber for house repairs",
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
        "topic": "Quote for bathroom repair"
      }
    ],
    "context_files": [
      "/reeves/learning-logs/2025-12-house-contractors.md"
    ],
    "notes": "Reliable, responds within 24 hours"
  }
}
```

## Field Definitions

### Contact Slug (Key)

**Type:** `string`
**Required:** Yes (object key)
**Unique:** Yes
**Format:** lowercase_with_underscores

Contact identifier used throughout Reeves.

**Examples:**
```
"john_doe"
"sarah_attorney"
"mom"
"alex_partner"
```

**Naming Rules:**
- Lowercase only
- Use underscores (not hyphens or spaces)
- Descriptive (first_last or role)
- Unique across all contacts

---

### primary_phone

**Type:** `string`
**Required:** Yes
**Format:** Digits only (no formatting)

Primary phone number for contact.

**Examples:**
```json
{ "primary_phone": "5551234567" }
{ "primary_phone": "12819001802" }
```

**Format Rules:**
- ✅ Digits only: `"5551234567"`
- ❌ Not formatted: `"(555) 123-4567"`
- ❌ Not with +: `"+1-555-123-4567"`

**Why digits only:** Enables direct API calls to messaging systems.

---

### email

**Type:** `string`
**Required:** No

Email address for contact.

```json
{
  "email": "john@example.com"
}
```

---

### work_phone / mobile

**Type:** `string`
**Required:** No
**Format:** Digits only

Additional phone numbers.

```json
{
  "primary_phone": "5551234567",
  "work_phone": "5559876543",
  "mobile": "5551112222"
}
```

---

### relationship

**Type:** `string`
**Required:** Yes

Type of relationship with this person.

**Common Values:**
- `"family"` - Parents, siblings, relatives
- `"friend"` - Personal friends
- `"contractor"` - Service providers
- `"attorney"` - Legal counsel
- `"business_partner"` - Business relationships
- `"client"` - Customers or clients
- `"colleague"` - Coworkers
- `"professional"` - Professional contacts

**Examples:**
```json
{ "relationship": "contractor" }
{ "relationship": "attorney" }
{ "relationship": "family" }
```

---

### context

**Type:** `string`
**Required:** Yes

Brief (1-2 sentence) description of who they are and why they're important.

**Examples:**
```json
{ "context": "Plumber for house sale repairs" }
{ "context": "Attorney for landlord dispute case" }
{ "context": "Mother, lives in Oakland" }
{ "context": "Co-founder of startup idea validation" }
```

**Best Practices:**
- Keep under 100 characters
- Focus on role/relevance
- Include key identifying info
- Put details in context_files

---

### projects

**Type:** `string[]`
**Required:** No (defaults to empty array)

Projects this contact is involved in.

**Examples:**
```json
{
  "projects": ["house-sale", "house-repairs"]
}
{
  "projects": ["legal-case-settlement"]
}
{
  "projects": ["startup-validation", "software-partnership"]
}
```

**Links to:** Project slugs in projects.json

---

### communication_preferences

**Type:** `CommunicationPreferences`
**Required:** Yes

How to communicate with this person.

```typescript
interface CommunicationPreferences {
  tone: "casual" | "friendly" | "professional" | "formal";
  punctuation: "minimal" | "standard" | "standard_business" | "precise";
  formality: "casual" | "polite_professional" | "formal_professional" | "legal_formal";
}
```

#### tone

How to sound when messaging them.

- **casual**: "Hey! How's it going?"
- **friendly**: "Hi there! Hope you're well."
- **professional**: "Hi, hope you're doing well."
- **formal**: "Dear Mr. Smith,"

#### punctuation

How much punctuation to use.

- **minimal**: Very few marks, casual
- **standard**: Normal punctuation
- **standard_business**: Professional punctuation
- **precise**: Careful, detailed punctuation

#### formality

Level of formality.

- **casual**: First names, relaxed
- **polite_professional**: Respectful but friendly
- **formal_professional**: Mr./Ms., very polite
- **legal_formal**: Attorney-client communication

**Examples:**
```json
{
  "communication_preferences": {
    "tone": "casual",
    "punctuation": "minimal",
    "formality": "casual"
  }
}
```

```json
{
  "communication_preferences": {
    "tone": "formal",
    "punctuation": "standard_business",
    "formality": "legal_formal"
  }
}
```

---

### recent_interactions

**Type:** `Interaction[]`
**Required:** No (defaults to empty array)
**Limit:** Keep last 5-10 only

Recent communication history.

```typescript
interface Interaction {
  date: string;            // YYYY-MM-DD format
  type: "text" | "call" | "email" | "meeting";
  topic: string;
  reeves_task_id?: number; // Optional link to task
}
```

**Examples:**
```json
{
  "recent_interactions": [
    {
      "date": "2025-12-06",
      "type": "text",
      "topic": "Quote for bathroom repair",
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

**Best Practices:**
- ✅ Keep last 5-10 interactions only
- ✅ Update after each communication
- ✅ Link to related tasks when relevant
- ❌ Don't keep hundreds of old interactions
- ❌ Don't duplicate full message content

**Older interactions:** Belong in learning logs, not contacts.

---

### context_files

**Type:** `string[]`
**Required:** No (recommended for important contacts)

Links to learning logs with detailed context.

**Examples:**
```json
{
  "context_files": [
    "/reeves/learning-logs/2025-12-house-contractors.md",
    "/reeves/artifacts/house-sale/contractor-quotes.md"
  ]
}
```

**What belongs in context files:**
- Full relationship history
- Project collaboration details
- Interview transcripts
- Strategic context
- Complex details

**See:** [Learning Logs Guide](/guide/learning-logs)

---

### notes

**Type:** `string`
**Required:** No

Short notes about this person.

**Examples:**
```json
{
  "notes": "Reliable, responds within 24 hours. See context file for project history."
}
{
  "notes": "Prefers video calls over phone. Available weekday evenings."
}
```

---

## Complete Examples

### Contractor Contact

```json
{
  "tom_electrician": {
    "primary_phone": "5551234567",
    "relationship": "contractor",
    "context": "Licensed electrician for house projects",
    "projects": ["house-sale", "house-repairs"],
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
    "notes": "Fast, reliable. Licensed #12345. See context file for project history."
  }
}
```

---

### Attorney Contact

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

---

### Family Contact

```json
{
  "mom": {
    "primary_phone": "5551234567",
    "relationship": "family",
    "context": "Mother, lives in Oakland",
    "projects": ["family-coordination"],
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
    "context_files": [],
    "notes": "Call every Sunday. Loves updates about kids."
  }
}
```

---

### Business Partner Contact

```json
{
  "alex_partner": {
    "primary_phone": "5559876543",
    "email": "alex@startup.com",
    "relationship": "business_partner",
    "context": "Co-founder of startup idea validation",
    "projects": ["startup-validation"],
    "communication_preferences": {
      "tone": "friendly",
      "punctuation": "standard",
      "formality": "polite_professional"
    },
    "recent_interactions": [
      {
        "date": "2025-12-05",
        "type": "meeting",
        "topic": "Discussed MVP features",
        "reeves_task_id": 82
      }
    ],
    "context_files": [
      "/reeves/learning-logs/2025-12-startup-validation.md"
    ],
    "notes": "Prefers video calls over phone. Available weekday evenings."
  }
}
```

---

## Validation Rules

### Required Fields

```typescript
// Minimum valid contact
{
  primary_phone: string,               // Required
  relationship: string,                // Required
  context: string,                     // Required
  communication_preferences: {         // Required
    tone: string,
    punctuation: string,
    formality: string
  }
}
```

### Field Constraints

```typescript
// primary_phone: Digits only, 10-15 characters
primary_phone: string (match: /^\d{10,15}$/)

// relationship: Non-empty string
relationship: string (length >= 1)

// context: Non-empty string, under 200 chars
context: string (length >= 1, <= 200)

// projects: Array of project slugs
projects: string[]

// communication_preferences: Valid enum values
communication_preferences: {
  tone: "casual" | "friendly" | "professional" | "formal",
  punctuation: "minimal" | "standard" | "standard_business" | "precise",
  formality: "casual" | "polite_professional" | "formal_professional" | "legal_formal"
}

// recent_interactions: Array, max 10 items
recent_interactions: Interaction[] (length <= 10)

// context_files: Array of absolute paths
context_files: string[]

// notes: String (can be empty)
notes: string
```

## Message Sending Protocol

::: danger CRITICAL: Double-Verify Before Send
Before sending any message, verify phone number exists in BOTH:
1. Reeves contacts.json
2. Messages database (from SMS/iMessage system)

If phone numbers don't match → **DO NOT SEND**
:::

**See:** [Contact Management Guide](/guide/contacts#message-sending-protocol)

## Best Practices

### DO

- ✅ Keep contacts lean (under 100 lines)
- ✅ Link to learning logs for details
- ✅ Only store last 5-10 interactions
- ✅ Set communication preferences
- ✅ Verify phone numbers before sending
- ✅ Update after each interaction
- ✅ Use descriptive relationship types

### DON'T

- ❌ Store full relationship history in contacts
- ❌ Duplicate data from learning logs
- ❌ Keep hundreds of old interactions
- ❌ Send messages without verification
- ❌ Format phone numbers (digits only)
- ❌ Skip communication preferences

## Next Steps

- [Task Schema Reference](/api/task-schema)
- [Project Schema Reference](/api/project-schema)
- [Contact Management Guide](/guide/contacts)
- [MCP Tools Reference](/api/tools)

---

**Complete contact data structure for Reeves.**
