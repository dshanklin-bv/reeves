# Real-World Example: Business Communication Workflow

This example shows how Reeves manages a complete business communication workflow from start to finish.

## Scenario: Following Up on Business Email

**Context:** You sent a research brief to a business contact via email. You need to:
1. Review recent text message history with the contact
2. Send a text notification about the email
3. Mark the task complete
4. Create follow-up tasks for next steps

## Step 1: Create the Task

```
You: "Create a task to follow up with John about the AIC Holdings email I sent"

Reeves: [Creates task]
```

**Task Created:**
```json
{
  "id": 80,
  "content": "Review texts with John Fuqua and notify him about AIC Holdings email",
  "activeForm": "Following up with John about AIC Holdings email",
  "status": "pending",
  "assignee": "reeves",
  "project": "business-development",
  "priority": "high",
  "tags": ["communication", "follow-up", "aic-holdings"],
  "notes": "Email sent to john@johnfuqua.com about AIC Holdings research"
}
```

## Step 2: Research Context (Messages Review)

```
You: "Review my texts with John Fuqua from the last 24 hours"

Reeves: [Uses Messages MCP to retrieve conversation history]
```

**What Reeves Does:**
1. Searches Messages database for "John Fuqua"
2. Filters last 24 hours of messages
3. Analyzes conversation context
4. Identifies relevant discussion points

**Context Found:**
- Previous discussion about software ventures
- Mentioned AIC Holdings opportunity
- Interest in Q1 2026 partnership timing

## Step 3: Check Contact Communication Preferences

```
Reeves: [Reads /life-data/contacts.json]
```

**Contact Entry:**
```json
{
  "john_fuqua": {
    "primary_phone": "...",
    "relationship": "professional",
    "communication_preferences": {
      "tone": "professional",
      "punctuation": "standard_business",
      "formality": "polite_professional"
    }
  }
}
```

## Step 4: Draft and Send Message

```
Reeves: "I'll send John a professional notification about the email"
```

**Message Drafted:**
```
Hi John - I sent you a detailed research briefing about AIC Holdings
to john@johnfuqua.com. Let me know if you have any questions about
the analysis.
```

**Message Sent:** ✓

## Step 5: Update Task Progress

```
Reeves: [Updates task with interaction record]
```

**Task Updated:**
```json
{
  "id": 80,
  "status": "in_progress",
  "notes": "Email sent to john@johnfuqua.com about AIC Holdings research\n\nUPDATE: Reviewed last 24hrs of texts. Sent notification message about email. Awaiting response."
}
```

## Step 6: Complete Task

```
You: "Mark that task complete"

Reeves: [Calls complete_task]
```

**Task Completed:**
```json
{
  "id": 80,
  "status": "completed",
  "completed": "2025-12-06T18:30:00Z",
  "notes": "COMPLETED: Reviewed texts, sent notification about AIC Holdings email to John Fuqua. Next: await response and schedule partnership discussion."
}
```

## Step 7: Create Follow-up Tasks

```
You: "Create follow-up tasks for AIC Holdings partnership discussion"

Reeves: [Creates multiple related tasks]
```

**Follow-up Tasks Created:**

**Task #81:**
```json
{
  "content": "Share software intel with John Fuqua",
  "assignee": "daniel",
  "project": "aic-holdings-partnership",
  "priority": "medium",
  "notes": "Exchange technology insights and capabilities"
}
```

**Task #82:**
```json
{
  "content": "Explore partnership structure with John for AIC Holdings",
  "assignee": "reeves",
  "project": "aic-holdings-partnership",
  "priority": "medium",
  "notes": "Research partnership models, draft proposal options for Q1 2026 launch"
}
```

## Step 8: Project Context Capture

```
Reeves: [Creates learning log]
```

**Learning Log Created:** `/reeves/learning-logs/2025-12-aic-holdings-partnership.md`

```markdown
# AIC Holdings Partnership - Context

**Date:** 2025-12-06
**Project:** aic-holdings-partnership
**Stakeholders:** Daniel Shanklin, John Fuqua, AIC Holdings

## Context

**What:** Potential software partnership with John Fuqua's venture involving AIC Holdings

**Why:** Mutual technology expertise and business development opportunity

**Timeline:** Target Q1 2026 launch

## Communication History

- 2025-12-06: Sent research brief to john@johnfuqua.com
- 2025-12-06: Text notification sent about email
- Previous 24hrs: Discussion about software ventures

## Next Steps

- Share software intel between parties
- Explore partnership structure options
- Define Q1 2026 launch plan
```

## Result: Complete Workflow

**What Reeves Accomplished:**

1. ✅ Reviewed 24 hours of text messages
2. ✅ Applied correct communication tone (professional)
3. ✅ Sent notification text message
4. ✅ Marked primary task complete
5. ✅ Created follow-up tasks
6. ✅ Documented project context
7. ✅ Linked all tasks to project

**Time Saved:** ~15 minutes of manual work

**Context Preserved:** Everything documented for future reference

## Key Takeaways

### Reeves Handles:
- **Research** - Messages history review
- **Communication** - Tone-aware message drafting
- **Task Management** - Create, update, complete
- **Context Preservation** - Learning logs and notes
- **Project Organization** - Link related work

### Human Handles:
- **Strategy** - Partnership structure decisions
- **Relationship** - Direct conversations with John
- **Execution** - Following through on tasks

### Together:
- **Efficient Workflows** - AI handles busy work
- **Complete Documentation** - Never lose context
- **Clear Next Steps** - Always know what's next

---

This is a real example of how Reeves manages business development workflows from initial communication through project planning and execution.
