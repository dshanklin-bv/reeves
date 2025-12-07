# Real-World Examples

How people actually use Reeves.

## Business Communication Workflow

**The flow:**
1. Create task to follow up with contact
2. Review message history via Messages MCP
3. Check contact's communication preferences
4. Draft and send message in their preferred tone
5. Complete task and create follow-ups

**What Reeves handles:**
```
You: "Create task to follow up with John about the AIC email I sent"
Claude: [Creates task, assigns to reeves, priority high]

You: "Review my texts with John from yesterday"
Claude: [Uses Messages MCP, shows 12 messages about software ventures]

You: "Send him a professional notification about the email"
Claude: [Reads contact preferences, drafts business-appropriate tone, sends]

You: "Mark it done and create follow-ups"
Claude: [Completes task #80, creates tasks #81-82, starts learning log]
```

**Time saved:** 15 min (no context switching, automatic tone matching)

## House Sale Contractor Coordination

**The scenario:** Coordinating plumber, electrician, and home inspector for house repairs.

**What Reeves tracks:**
```
Project: house-sale
Tasks:
- Get plumber quote for bathroom (pending)
- Schedule electrician for outlet repairs (in_progress)
- Follow up on home inspector report (completed)

Contacts:
- john_plumber (professional tone, responds in 24hrs)
- sarah_electrician (casual tone, prefers text over email)
- mike_inspector (formal, requires written documentation)

Learning log: 2025-11-house-sale.md
- Full contractor history
- Repair decisions and rationale
- Cost tracking
- Timeline and deadlines
```

**The workflow:**
```
You: "I talked to the plumber, he can do it for $800"
Claude: [Updates task notes, logs to learning log, creates decision entry]

You: "Draft a text to Sarah about the electrical work"
Claude: [Reads sarah_electrician contact, uses casual tone:
        "Hey Sarah! Ready to schedule that outlet work?"]

You: "What's left to do on house-sale?"
Claude: [Shows active tasks, checks learning log for blockers, surfaces priorities]
```

**Time saved:** 20 min/week (no hunting for context, automatic tone switching)

## Legal Case Management

**The challenge:** Tracking complex legal case with multiple parties, documents, and deadlines.

**Reeves structure:**
```
Project: emily-crv-case (owner: daniel)
Learning log: 2025-12-emily-crv-recovery.md
  - Full case chronology
  - Witness statements
  - Evidence inventory
  - Legal strategy decisions

Tasks assigned to reeves:
- Extract Emily's message history → 195 messages to PDF
- Research witness credibility patterns
- Draft attorney briefing package

Tasks assigned to daniel:
- Review attorney's settlement offer
- Sign declaration under penalty of perjury
- Follow up with insurance adjuster
```

**The AI-driven work:**
```
You: "Reeves, extract all Emily's messages about the accident and create a PDF"
Claude: [Creates task assigned to reeves, uses Messages MCP, generates 47-page PDF,
         adds to learning log, marks task complete, creates review task for you]

You: "What's next on the case?"
Claude: [Shows your pending tasks, notes Reeves completed the extraction,
         surfaces attorney deadline in 3 days]
```

**Time saved:** 6+ hours (AI handles document extraction, maintains chronology)

## Family Event Coordination

**The scenario:** Planning daughter's birthday party with multiple parents, venue, activities.

```
Project: emily-birthday-2026
Contacts:
- emily_mom (casual, emoji-friendly)
- party_venue (formal business)
- activity_coordinator (professional)

Tasks for daniel:
- Confirm guest count with Emily's mom
- Book venue by Dec 15
- Order cake

Tasks for reeves:
- Research age-appropriate activities
- Draft invitation text
- Create day-of timeline

Learning log tracks:
- Budget decisions
- Vendor comparisons
- Guest list evolution
```

**The workflow:**
```
You: "Draft a casual text to Emily's mom about final guest count"
Claude: [Checks contact, uses casual + emoji: "Hey! 🎉 Need final headcount
         for Emily's party. How many kiddos confirmed?"]

You: "Reeves, research party activities for 8-year-olds and compare costs"
Claude: [Creates reeves-assigned task, researches options, creates comparison
         doc in learning log, surfaces recommendation with rationale]
```

**Time saved:** 10+ hours (AI handles research, maintains vendor context)

## Side Project Validation

**The idea:** Validating business idea through customer interviews.

```
Project: startup-validation (owner: reeves)

Reeves-assigned tasks:
- Draft interview script
- Research competitor pricing
- Analyze interview transcripts for patterns
- Create validation summary

Daniel-assigned tasks:
- Conduct interviews
- Review Reeves' analysis
- Make go/no-go decision

Learning log:
- Full interview transcripts
- Pattern analysis
- Competitor research
- Decision framework
```

**The magic:**
```
You: "Reeves, draft an interview script for validating the pricing model"
Claude: [Creates task, drafts script based on project context, asks for review]

You: "I finished 5 interviews, here are the recordings"
Claude: [Transcribes, logs to learning log, creates analysis task for Reeves]

[Next day]
Claude: [Completes analysis task, surfaces 3 key patterns, recommends pricing tier]

You: "What does the data say about pricing?"
Claude: [Reads learning log, shows pattern evidence, presents recommendation]
```

**Time saved:** 20+ hours (AI handles transcription, pattern detection, synthesis)

## Key Patterns

**Across all examples:**

1. **Narrate, don't organize** - Talk naturally, AI structures
2. **Assign to Reeves** - Complex research/analysis goes to AI
3. **Learning logs preserve context** - Never lose project history
4. **Contacts enable tone switching** - Right voice for each person
5. **Tasks track both human and AI work** - Full accountability

**The shift:** From "manage my tasks" to "manage both of us working together."
