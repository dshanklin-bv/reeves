# Contacts

How to remember how to talk to people.

## What Contacts Store

- **Communication style** - Tone, formality, punctuation preferences
- **Contact info** - Phone, email
- **Recent interactions** - Last few messages only
- **Context links** - Where full relationship history lives

::: warning Keep It Lean
Contacts are for quick reference when drafting messages. Deep relationship history goes in [learning logs](/guide/learning-logs).
:::

## Structure

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
    "notes": "Reliable, responds within 24hrs"
  }
}
```

## Communication Preferences

**Tone:** casual, professional, formal, friendly

**Punctuation:** minimal, standard, standard_business, precise

**Formality:** casual, polite_professional, formal_professional, legal_formal

## Adding Contacts

```
You: "Add John Doe as a contact. He's my plumber, phone 555-1234567"
Claude: [Creates contact with professional defaults]

You: "Add Sarah Chen, attorney, 555-9876543. Use formal professional tone"
Claude: [Creates contact with legal_formal style]
```

## Using Contacts

```
You: "Draft a text to John about the bathroom estimate"
Claude: [Reads john_doe contact, uses professional tone with standard business punctuation]

You: "Send email to Sarah about the case update"
Claude: [Uses formal tone with legal_formal style]
```

AI reads contact preferences automatically when drafting messages.

## Updating Contacts

```
You: "John responded well to casual tone, update his preferences"
Claude: [Updates tone to casual]

You: "Log that I texted Sarah yesterday about the settlement"
Claude: [Adds to recent_interactions]
```

## When to Create Contacts

- **Regular communication** - People you message frequently
- **Specific tone required** - Attorney, contractor, family with preferences
- **Context tracking** - Need to remember last conversation topic
- **Project-specific** - Key people involved in complex projects

## When NOT to Create Contacts

- **One-off interactions** - Random support chat, one-time transaction
- **Generic relationships** - "Customer service" doesn't need a contact
- **Fully documented elsewhere** - If learning log has everything, contact is optional

## Context Files

Contacts link to learning logs for deep history:

```json
"context_files": [
  "/reeves/learning-logs/2025-12-house-sale-contractors.md"
]
```

This keeps contacts lean while preserving full context in structured documents.

## Best Practices

1. **Start minimal** - Name, phone, relationship only
2. **Add preferences as you learn** - Update after seeing their communication style
3. **Keep recent interactions short** - Last 5-10 only, older stuff goes to learning logs
4. **Link to context** - Point to learning logs for detailed history
5. **Update after conversations** - Note last topic, outcome, next steps

## Schema Reference

See [Contact Schema](/api/contact-schema) for complete field definitions.
