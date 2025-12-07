# Real-World Examples

Real examples of how Reeves manages different aspects of life.

## Example 1: Business Communication Workflow

**Time Saved: ~15 minutes**

This example shows complete business communication management from start to finish.

### Scenario

You sent a research brief to a business contact via email and need to:
1. Review recent text message history
2. Send a text notification about the email
3. Mark the task complete
4. Create follow-up tasks

### Step 1: Create the Task

```
You: "Create a task to follow up with John about the AIC Holdings email I sent"
Claude: [Creates task in Reeves]
```

**Task Created:**
```json
{
  "id": 80,
  "content": "Review texts with John Fuqua and notify him about AIC Holdings email",
  "status": "pending",
  "assignee": "reeves",
  "project": "business-development",
  "priority": "high",
  "tags": ["communication", "follow-up"],
  "notes": "Email sent to john@johnfuqua.com about AIC Holdings research"
}
```

### Step 2: Research Context

```
You: "Review my texts with John Fuqua from the last 24 hours"
Claude: [Uses Messages MCP to retrieve conversation history]

Found 12 messages:
- Discussion about software ventures
- Mentioned AIC Holdings opportunity
- Interest in Q1 2026 partnership timing
```

### Step 3: Check Communication Preferences

```
Claude: [Reads contacts.json]

Contact entry for John:
- Tone: professional
- Punctuation: standard_business
- Formality: polite_professional
```

### Step 4: Draft and Send Message

```
Claude: "I'll send John a professional notification about the email"

Draft message:
"Hi John - I sent you a detailed research briefing about AIC Holdings
to john@johnfuqua.com. Let me know if you have any questions about
the analysis."

[Verifies phone number in both databases]
[Sends message] ✓
```

### Step 5: Complete and Create Follow-ups

```
You: "Mark that task complete and create follow-up tasks"
Claude:
- Completed task #80
- Created task #81: Share software intel with John
- Created task #82: Explore partnership structure
- Created learning log: aic-holdings-partnership.md
```

**Result:**
- ✅ Reviewed message history
- ✅ Applied correct communication tone
- ✅ Sent notification text
- ✅ Completed primary task
- ✅ Created follow-up tasks
- ✅ Documented project context

## Example 2: House Contractor Coordination

**Time Saved: ~20 minutes**

Managing multiple contractors for house sale preparation.

### Scenario

You're selling your house and need to coordinate repairs with three contractors:
- Tom (electrician)
- John (plumber)
- Sarah (painter)

### Managing the Project

```
You: "Create a project for selling my house at 239 Eagle Drive"
Claude: [Creates project: house-sale-239-eagle-dr]

You: "Create tasks:
- Get electrical inspection from Tom
- Fix kitchen plumbing with John
- Paint living room with Sarah"

Claude: [Creates 3 tasks, all linked to project]
```

### Tracking Contacts

```json
{
  "tom_electrician": {
    "primary_phone": "5551234567",
    "relationship": "contractor",
    "projects": ["house-sale-239-eagle-dr"],
    "communication_preferences": {
      "tone": "professional",
      "formality": "polite_professional"
    },
    "notes": "Licensed electrician. Responds quickly to texts."
  }
}
```

### Coordination Workflow

```
You: "Send Tom a text asking for availability next week"
Claude:
[Checks tone preferences: professional]
[Drafts and verifies]

"Hi Tom, I need the electrical inspection for the house sale.
Are you available any day next week? Thanks."

[Sends] ✓
[Logs interaction in contact]
```

### Following Up

```
Tom (via text): "I can do Tuesday at 2pm"

You: "Great, add that to his task and create a reminder"
Claude:
- Updated task: "Get electrical inspection from Tom"
  Note: "Scheduled for Tuesday 2pm"
- Created task: "Be home for Tom's inspection Tuesday 2pm"
  Assignee: daniel
  Priority: urgent
```

**Result:**
- ✅ Coordinated 3 contractors
- ✅ Tracked all communications
- ✅ Created calendar reminders
- ✅ Linked everything to house sale project
- ✅ Never lost context between conversations

## Example 3: Legal Case Management

**Time Saved: ~30 minutes**

Managing a landlord dispute case with attorney coordination.

### Scenario

You're in a dispute with your previous landlord over security deposit. You need to:
- Track court dates
- Coordinate with attorney
- Gather evidence
- Prepare witness statements

### Setting Up the Project

```
You: "Create a project for my landlord dispute case"
Claude: [Creates project: landlord-dispute]

You: "Add Sarah Chen as my attorney contact"
Claude: [Creates contact with formal communication preferences]

You: "Create tasks for gathering evidence and preparing for court"
Claude:
- Created task: Collect photos of apartment condition
- Created task: Gather receipts and documentation
- Created task: Write timeline of events
- Created task: Prepare witness statements
- Created task: Review evidence with attorney
```

### Managing Evidence

```
You: "I'm uploading photos to artifacts/landlord-case/"
Claude:
[Creates learning log: landlord-case.md]
[Links evidence to project]

Learning log structure:
- Timeline of events
- Evidence inventory
- Attorney meeting notes
- Court preparation checklist
```

### Attorney Communication

```
You: "Draft an email to Sarah Chen about the court date"
Claude:
[Checks communication preferences: formal, legal_formal]

Draft:
"Dear Ms. Chen,

I wanted to confirm our court appearance scheduled for December 20th
at 9:00 AM. I have gathered the requested documentation and prepared
the timeline of events as discussed.

Please let me know if you need any additional materials before the hearing.

Thank you for your assistance.

Best regards,
Daniel"

Should I send this?
```

### Tracking Progress

```
You: "What's the status of my legal case tasks?"
Claude:
- ✅ Collect photos (completed)
- ✅ Gather receipts (completed)
- ✅ Write timeline (completed)
- ⏳ Prepare witness statements (in progress)
- ⏳ Review evidence with attorney (pending)
```

**Result:**
- ✅ Organized all evidence systematically
- ✅ Maintained formal attorney communication
- ✅ Tracked court deadlines
- ✅ Never forgot a required document
- ✅ Complete case history preserved

## Example 4: Family Event Planning

**Time Saved: ~10 minutes**

Planning your daughter's birthday party.

### Scenario

Your daughter Emily's birthday is coming up. You need to:
- Choose a date
- Invite friends
- Book a venue
- Order cake
- Plan activities

### Project Setup

```
You: "Create a project for Emily's 10th birthday party"
Claude: [Creates project: emily-birthday-2025]

You: "Create tasks for everything I need to do"
Claude:
- Pick date (check with Emily's mom)
- Get list of friends to invite
- Research party venues
- Order birthday cake
- Plan party activities
- Send invitations
- Buy decorations
- Wrap presents
```

### Coordination With Co-Parent

```json
{
  "emily_mom": {
    "primary_phone": "5559876543",
    "relationship": "family",
    "projects": ["emily-birthday-2025", "emily-school", "co-parenting"],
    "communication_preferences": {
      "tone": "friendly",
      "formality": "casual"
    },
    "recent_interactions": [
      {
        "date": "2025-12-06",
        "type": "text",
        "topic": "Birthday party date options"
      }
    ]
  }
}
```

### Managing Invitations

```
You: "I have the list of 15 kids to invite. Create tasks to track RSVPs"
Claude:
- Created task: Send invitations to all 15 kids
- Created task: Track RSVPs
- Created task: Follow up with non-responders
- Added contact entries for parents (for coordination)
```

**Result:**
- ✅ Nothing forgotten
- ✅ All coordination in one place
- ✅ Easy co-parent communication
- ✅ RSVP tracking automatic
- ✅ Emily has great party

## Example 5: Side Business Launch

**Time Saved: ~25 minutes**

Validating a startup idea with a potential co-founder.

### Scenario

You're exploring a startup idea with Alex. You need to:
- Interview potential customers
- Research competitors
- Build MVP
- Validate market fit
- Decide go/no-go

### Project Structure

```
You: "Create a project for validating my startup idea with Alex"
Claude: [Creates project: startup-idea-validation]

You: "Add Alex as a business partner contact"
Claude: [Creates contact]

{
  "alex_partner": {
    "primary_phone": "5551112222",
    "email": "alex@email.com",
    "relationship": "business_partner",
    "projects": ["startup-idea-validation"],
    "communication_preferences": {
      "tone": "friendly",
      "formality": "polite_professional"
    }
  }
}
```

### Customer Interviews

```
You: "Create tasks for interviewing 10 potential customers"
Claude:
- Created task: Recruit 10 interview candidates
- Created task: Conduct customer interviews (1-10)
- Created task: Analyze interview findings
- Created task: Document market fit assessment
```

### Tracking Progress

```
You: "I just finished 3 customer interviews. Update the project."
Claude:
[Updates learning log: startup-validation.md]

## Customer Interview Findings

**Interview 1:** Strong interest, would pay $50/month
**Interview 2:** Interested but price-sensitive
**Interview 3:** Not a fit, needs different features

[Marks interview tasks as completed]
[Adds findings to project notes]
```

### Partnership Decisions

```
You: "Draft a message to Alex about what I learned from the interviews"
Claude:
[Checks tone: friendly but professional]

"Hey Alex,

Just wrapped up the first 3 customer interviews. Some really promising
signals - 2 out of 3 would pay $50/month, and the feedback on features
lines up with our thinking.

Let's sync up this week to discuss next steps. Are you free Tuesday evening?

-D"

Should I send this?
```

**Result:**
- ✅ Systematic customer validation
- ✅ All findings documented
- ✅ Clear go/no-go decision criteria
- ✅ Partner communication managed
- ✅ Complete audit trail for future reference

## Common Patterns

### Pattern 1: Message Review → Task Creation

```
You: "Review my texts from the last 24 hours and create tasks for anything I need to follow up on"

Claude:
[Scans messages]
[Identifies 5 action items]
[Creates 5 tasks]
[Links to relevant contacts and projects]
```

**Time Saved: 15 minutes daily**

### Pattern 2: Contact → Verify → Draft → Send

```
You: "Send [contact] a message about [topic]"

Claude:
1. Look up communication preferences
2. Verify phone number (double-check)
3. Draft message with correct tone
4. Show draft for approval
5. Send message
6. Log interaction
```

**Time Saved: 10 minutes per message**

### Pattern 3: Project → Tasks → Follow-ups

```
You: "I'm starting [new project]"

Claude:
1. Create project
2. Ask about goals and timeline
3. Break down into tasks
4. Assign to daniel/reeves
5. Set priorities
6. Create learning log
7. Link to relevant contacts
```

**Time Saved: 20 minutes per project**

### Pattern 4: Research → Document → Tasks

```
You: "Research [topic] and create tasks for next steps"

Claude:
1. Conduct research
2. Summarize findings
3. Create learning log
4. Identify action items
5. Create tasks for each
6. Link everything together
```

**Time Saved: 30 minutes per research session**

## Key Takeaways

### What Reeves Does Best

- **Remembers everything** - Nothing gets lost
- **Manages communication** - Correct tone for each person
- **Tracks follow-ups** - Never forget to reply
- **Organizes projects** - All related work together
- **Preserves context** - Full history available

### What You Do Best

- **Strategic decisions** - Choose direction
- **Relationship building** - Have the conversations
- **Execution** - Actually do the work
- **Quality control** - Verify important messages
- **Judgment calls** - Prioritize what matters

### Together You Achieve

- ⏱️ **6+ hours saved per week**
- 🧠 **Zero context loss** between sessions
- 📋 **Complete task tracking** across all life areas
- 💬 **Professional communication** with everyone
- 📁 **Organized life management** in one system

## More Examples

See also:
- [Task Management Examples](/guide/tasks#examples)
- [Project Examples](/guide/projects#examples)
- [Contact Examples](/guide/contacts#examples)
- [Message Sending Examples](/guide/contacts#message-sending-protocol)

---

**These are real workflows from actual Reeves usage.** Your use cases will be unique to your life, but the patterns remain the same.
