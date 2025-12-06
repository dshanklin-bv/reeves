/**
 * Reeves MCP Tools
 * Task and project management
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { TaskManager } from './task-manager.js';
import { QueueManager } from './queue-manager.js';

const REEVES_HOWTO = `# Reeves Task Management System - AI Assistant Guide

## Overview
Reeves is a persistent task management system that maintains state across Claude Code sessions. All tasks and projects are stored in \`reeves/tasks.json\` in a human-readable format.

## Core Concepts

### Task Lifecycle
1. **pending** - Task created, not yet started
2. **in_progress** - Currently being worked on (only 1 task should be in_progress at a time)
3. **completed** - Task finished successfully
4. **blocked** - Task cannot proceed (waiting on something)
5. **cancelled** - Task no longer relevant
6. **skipped** - Intentionally skipped with documented reasoning

### Task Fields
- **id**: Auto-incremented unique identifier
- **content**: Short description (imperative: "Do X")
- **activeForm**: Present continuous form (gerund: "Doing X")
- **assignee**: "daniel" (human) or "reeves" (AI)
- **project**: Project name (lowercase-with-dashes)
- **priority**: "urgent", "high", "medium", "low"
- **tags**: Array of keywords for filtering
- **notes**: Detailed context, updates, completion notes
- **created**: ISO timestamp
- **completed**: ISO timestamp (when status=completed)

### Projects
Projects group related tasks and provide context. Each project has:
- **owner**: "daniel" or "reeves"
- **status**: "active" or "completed"
- **context_file**: Optional path to learning-log with detailed context
- **notes**: Brief project description

## Best Practices

### When Creating Tasks
1. **Always provide notes** - Context helps in future sessions
2. **Use descriptive content** - Clear what needs to be done
3. **Assign to correct owner** - "reeves" for AI tasks, "daniel" for human tasks
4. **Choose appropriate priority** - Be realistic about urgency
5. **Add relevant tags** - Makes filtering easier

### Task Patterns

#### Interview Tasks
When starting a new project, create an interview task for context gathering:
\`\`\`json
{
  "content": "Interview Daniel about X project",
  "assignee": "reeves",
  "project": "project-name",
  "priority": "high",
  "notes": "Comprehensive interview to establish project context..."
}
\`\`\`

#### Research Tasks
For investigation work:
\`\`\`json
{
  "content": "Research Y technology options",
  "assignee": "reeves",
  "tags": ["research", "technical-decision"]
}
\`\`\`

#### Human Action Tasks
For tasks requiring human action:
\`\`\`json
{
  "content": "Call X to discuss Y",
  "assignee": "daniel",
  "tags": ["phone-call", "urgent"],
  "priority": "urgent"
}
\`\`\`

### Working with Tasks

#### Starting a Task
1. Find the task: \`list_active_tasks\` or \`list_tasks\` with filters
2. Update to in_progress: \`update_task\` with status="in_progress"
3. Only ONE task should be in_progress at a time

#### Completing a Task
Use \`complete_task\` with completion notes:
\`\`\`
complete_task(id=42, notes="Completed X. Found Y. Next: Z.")
\`\`\`

#### Updating a Task
Use \`update_task\` to modify status, priority, add notes, change tags:
\`\`\`
update_task(id=42, notes="UPDATE: Made progress on X, encountered issue Y")
\`\`\`

### Project Workflow

1. **Create project entry** in tasks.json projects section
2. **Create interview task** to gather context (if human-involved project)
3. **Create context file** in \`reeves/learning-logs/\` with interview findings
4. **Link context file** in project metadata
5. **Create actionable tasks** based on interview/research
6. **Track progress** by updating task statuses

### Filtering Tasks

Use \`list_tasks\` with filters:
- By project: \`list_tasks(project="honda-crv-recovery")\`
- By status: \`list_tasks(status="pending")\`
- By priority: \`list_tasks(priority="urgent")\`
- By assignee: \`list_tasks(assignee="daniel")\`
- By tag: \`list_tasks(tag="phone-call")\`

Or use \`list_active_tasks\` to see only pending/in_progress/blocked tasks.

### Statistics
Use \`get_stats\` to see:
- Total task count
- Counts by status (pending, completed, etc.)
- Counts by priority
- Counts by project

## Common Mistakes to Avoid

1. **Multiple in_progress tasks** - Confuses focus, only 1 should be active
2. **Missing notes** - Future sessions need context
3. **Vague content** - "Fix bug" vs "Fix authentication timeout in login endpoint"
4. **Wrong assignee** - AI tasks to "daniel", human tasks to "reeves"
5. **Not updating last_updated** - TaskManager handles this automatically
6. **Forgetting activeForm** - Defaults to content, but better to specify
7. **Not linking context files** - Projects should reference their learning-logs

## Queue System
The queue system (separate from tasks) handles ad-hoc notes and progress reports:
- \`get_queue\` - See unprocessed queue items
- \`add_queue_item\` - Add note programmatically
- \`process_queue_item\` - Mark as processed

Queue items are JSON files in \`reeves/queue/\`, moved to \`reeves/queue/processed/\` when done.

## Example Session Flow

1. \`list_active_tasks\` - See what needs attention
2. \`get_task(id=X)\` - Get details on specific task
3. \`update_task(id=X, status="in_progress")\` - Start working
4. [Do the work]
5. \`update_task(id=X, notes="Progress update...")\` - Document progress
6. \`complete_task(id=X, notes="Completed. Details: ...")\` - Mark done
7. \`create_task(...)\` - Add follow-up tasks if needed

## Philosophy

Reeves is designed for **AI reasoning, not rigid automation**. You can:
- Read all tasks and understand dependencies naturally
- Make judgment calls about task priority
- Skip overly complex dependency systems
- Trust plain English notes over strict schemas

Build for understanding, not just execution.

## Data Management Rules

**CRITICAL:** Follow the architecture guidelines in \`/reeves/ARCHITECTURE.md\` for data organization.

### Contact Data (\`/life-data/contacts.json\`)

**Purpose:** Quick reference for drafting messages with correct tone

**Keep entries LEAN (under 100 lines each):**
- Phone numbers and basic info
- Communication preferences (tone, punctuation, formality)
- Recent interactions (last 5-10 ONLY)
- Links to context files

**DO NOT include in contacts:**
- Full project history → use \`/reeves/learning-logs/\`
- Detailed timelines → use \`/reeves/artifacts/\`
- Legal documents → use \`/reeves/artifacts/\`
- Extensive notes → use context files

**Pattern:**
\`\`\`json
{
  "person_name": {
    "primary_phone": "...",
    "relationship": "...",
    "context": "Brief 1-2 sentence summary",
    "communication_preferences": { ... },
    "recent_interactions": [ /* last 5-10 only */ ],
    "context_files": [
      "/reeves/learning-logs/...",
      "/reeves/artifacts/..."
    ]
  }
}
\`\`\`

### When to Create What

- **Contact entry** → Communication preferences, recent interactions
- **Learning log** → Project history, interviews, strategic context
- **Artifact** → Evidence, documents, timelines, generated content
- **Task** → Active work item with assignee and status

### Data Duplication Rule

**Single source of truth:** Detailed context lives in learning-logs or artifacts, NOT in contacts.json. Use \`context_files\` array to link, don't duplicate.

See \`/reeves/ARCHITECTURE.md\` for complete rules, examples, and scaling triggers.
`;

export function registerTools(): Tool[] {
  return [
    {
      name: 'how_to',
      description: 'Get comprehensive guide for AI assistants on how to use the Reeves task management system. ALWAYS call this first if you\'re unfamiliar with Reeves.',
      inputSchema: {
        type: 'object',
        properties: {}
      }
    },
    {
      name: 'list_tasks',
      description: 'Get all tasks, optionally filtered by status, project, priority, assignee, or tag',
      inputSchema: {
        type: 'object',
        properties: {
          status: { type: 'string', description: 'Filter by status: pending, in_progress, completed, cancelled, blocked, skipped' },
          project: { type: 'string', description: 'Filter by project name (partial match)' },
          priority: { type: 'string', description: 'Filter by priority: urgent, high, medium, low' },
          assignee: { type: 'string', description: 'Filter by assignee: daniel, reeves' },
          tag: { type: 'string', description: 'Filter by tag (partial match)' }
        }
      }
    },
    {
      name: 'list_active_tasks',
      description: 'Get only active tasks (pending, in_progress, blocked). Quick way to see what needs attention.',
      inputSchema: {
        type: 'object',
        properties: {}
      }
    },
    {
      name: 'whats_next',
      description: 'Get active tasks with prioritization guidance. Returns tasks plus instructions on how to think about priority. Does NOT make decisions - provides data and context for AI reasoning.',
      inputSchema: {
        type: 'object',
        properties: {
          assignee: { type: 'string', description: 'Optional: Filter by assignee (daniel, reeves)' }
        }
      }
    },
    {
      name: 'get_task',
      description: 'Get a specific task by ID with all details',
      inputSchema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'Task ID' }
        },
        required: ['id']
      }
    },
    {
      name: 'create_task',
      description: 'Create a new task. ALWAYS provide content, assignee, and project at minimum.',
      inputSchema: {
        type: 'object',
        properties: {
          content: { type: 'string', description: 'Task description (imperative: "Do X")' },
          activeForm: { type: 'string', description: 'Present continuous form (gerund: "Doing X"). Defaults to content if not provided.' },
          project: { type: 'string', description: 'Project name (lowercase-with-dashes)' },
          assignee: { type: 'string', description: 'Task assignee: "daniel" (human) or "reeves" (AI)' },
          priority: { type: 'string', description: 'Priority: urgent, high, medium, low (default: medium)' },
          tags: { type: 'array', items: { type: 'string' }, description: 'Task tags for filtering' },
          notes: { type: 'string', description: 'Additional context, details, or instructions' }
        },
        required: ['content', 'project', 'assignee']
      }
    },
    {
      name: 'update_task',
      description: 'Update an existing task. Can modify status, priority, notes, tags, or other fields.',
      inputSchema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'Task ID' },
          status: { type: 'string', description: 'New status: pending, in_progress, completed, cancelled, blocked, skipped' },
          priority: { type: 'string', description: 'New priority: urgent, high, medium, low' },
          notes: { type: 'string', description: 'Additional notes (appended to existing notes)' },
          tags: { type: 'array', items: { type: 'string' }, description: 'Updated tags (replaces existing)' },
          content: { type: 'string', description: 'Updated content' },
          activeForm: { type: 'string', description: 'Updated active form' },
          project: { type: 'string', description: 'Move to different project' },
          assignee: { type: 'string', description: 'Reassign task' }
        },
        required: ['id']
      }
    },
    {
      name: 'complete_task',
      description: 'Mark a task as completed with optional completion notes',
      inputSchema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'Task ID' },
          notes: { type: 'string', description: 'Completion notes (what was done, outcomes, follow-ups)' }
        },
        required: ['id']
      }
    },
    {
      name: 'delete_task',
      description: 'Delete a task by ID. Use sparingly - prefer cancel/skip with notes.',
      inputSchema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'Task ID to delete' }
        },
        required: ['id']
      }
    },
    {
      name: 'list_projects',
      description: 'Get all projects with their metadata (owner, status, context files)',
      inputSchema: {
        type: 'object',
        properties: {}
      }
    },
    {
      name: 'get_stats',
      description: 'Get statistics about tasks: total count, counts by status/priority/project',
      inputSchema: {
        type: 'object',
        properties: {}
      }
    },
    {
      name: 'get_queue',
      description: 'Get all unprocessed queue items',
      inputSchema: {
        type: 'object',
        properties: {}
      }
    },
    {
      name: 'process_queue_item',
      description: 'Mark a queue item as processed and move to processed folder',
      inputSchema: {
        type: 'object',
        properties: {
          filename: { type: 'string', description: 'Queue item filename (e.g., "1733001234567.json")' }
        },
        required: ['filename']
      }
    },
    {
      name: 'add_queue_item',
      description: 'Add a new item to the queue',
      inputSchema: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['general-note', 'project-note', 'task-note', 'progress-report'],
            description: 'Type of queue item'
          },
          task_id: { type: 'number', description: 'Task ID (for task-note type)' },
          project: { type: 'string', description: 'Project name (for project-note type)' },
          content: { type: 'string', description: 'Content of the note' }
        },
        required: ['type', 'content']
      }
    }
  ];
}

export async function handleToolCall(
  request: any,
  taskManager: TaskManager,
  queueManager: QueueManager
): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  const { name, arguments: args } = request.params;

  try {
    let result: any;

    switch (name) {
      case 'how_to':
        result = { guide: REEVES_HOWTO };
        break;

      case 'list_tasks':
        result = await taskManager.listTasks(args);
        break;

      case 'list_active_tasks':
        result = await taskManager.listActiveTasks();
        break;

      case 'whats_next':
        result = await taskManager.whatsNext(args.assignee);
        break;

      case 'get_task':
        result = await taskManager.getTask(args.id);
        if (!result) {
          throw new Error(`Task #${args.id} not found`);
        }
        break;

      case 'create_task':
        result = await taskManager.createTask(args);
        break;

      case 'update_task':
        result = await taskManager.updateTask(args.id, args);
        break;

      case 'complete_task':
        result = await taskManager.completeTask(args.id, args.notes);
        break;

      case 'delete_task':
        await taskManager.deleteTask(args.id);
        result = { success: true, deleted: args.id };
        break;

      case 'list_projects':
        result = await taskManager.listProjects();
        break;

      case 'get_stats':
        result = await taskManager.getStats();
        break;

      case 'get_queue':
        result = await queueManager.getQueue();
        break;

      case 'process_queue_item':
        await queueManager.processItem(args.filename);
        result = { success: true, filename: args.filename };
        break;

      case 'add_queue_item':
        result = await queueManager.addQueueItem(args);
        break;

      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ error: errorMessage }, null, 2)
        }
      ],
      isError: true
    };
  }
}
