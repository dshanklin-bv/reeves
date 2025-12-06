import fs from 'fs/promises';
import path from 'path';

export interface Task {
  id: number;
  created: string;
  content: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'blocked' | 'skipped';
  completed?: string;
  activeForm: string;
  assignee: string;
  project: string;
  tags?: string[];
  priority?: string;
  notes?: string;
}

export interface Project {
  owner: string;
  status: string;
  created: string;
  context_file?: string;
  notes?: string;
}

interface TasksData {
  version: string;
  last_updated: string;
  projects: Record<string, Project>;
  tasks: Task[];
}

interface TaskFilter {
  status?: string;
  project?: string;
  priority?: string;
  assignee?: string;
  tag?: string;
}

export class TaskManager {
  private tasksFile: string;

  constructor(private reevesRoot: string) {
    this.tasksFile = path.join(reevesRoot, 'tasks.json');
  }

  private async loadData(): Promise<TasksData> {
    try {
      const content = await fs.readFile(this.tasksFile, 'utf-8');
      return JSON.parse(content) as TasksData;
    } catch {
      return {
        version: '1.2.0',
        last_updated: new Date().toISOString(),
        projects: {},
        tasks: [],
      };
    }
  }

  private async saveData(data: TasksData): Promise<void> {
    data.last_updated = new Date().toISOString();
    await fs.writeFile(this.tasksFile, JSON.stringify(data, null, 2));
  }

  async listTasks(filter?: TaskFilter): Promise<Task[]> {
    const data = await this.loadData();
    let filtered = data.tasks;

    if (filter?.status) {
      filtered = filtered.filter(t => t.status === filter.status);
    }
    if (filter?.project) {
      filtered = filtered.filter(t => t.project?.toLowerCase().includes(filter.project!.toLowerCase()));
    }
    if (filter?.priority) {
      filtered = filtered.filter(t => t.priority === filter.priority);
    }
    if (filter?.assignee) {
      filtered = filtered.filter(t => t.assignee?.toLowerCase() === filter.assignee!.toLowerCase());
    }
    if (filter?.tag) {
      filtered = filtered.filter(t => t.tags?.some(tag => tag.toLowerCase().includes(filter.tag!.toLowerCase())));
    }

    return filtered.sort((a, b) => a.id - b.id);
  }

  async listActiveTasks(): Promise<Task[]> {
    const data = await this.loadData();
    const activeStatuses = ['pending', 'in_progress', 'blocked'];
    return data.tasks
      .filter(t => activeStatuses.includes(t.status))
      .sort((a, b) => a.id - b.id);
  }

  async whatsNext(assignee?: string): Promise<any> {
    const data = await this.loadData();
    const activeStatuses = ['pending', 'in_progress', 'blocked'];
    let activeTasks = data.tasks
      .filter(t => activeStatuses.includes(t.status))
      .sort((a, b) => a.id - b.id);

    if (assignee) {
      activeTasks = activeTasks.filter(t => t.assignee?.toLowerCase() === assignee.toLowerCase());
    }

    return {
      active_tasks: activeTasks,
      task_count: activeTasks.length,
      prioritization_guide: {
        philosophy: "Reeves is designed for AI reasoning, not rigid automation. These guidelines help you make intelligent decisions.",
        priority_levels: {
          urgent: "Critical blockers, time-sensitive actions, waiting on external responses",
          high: "Important work that moves projects forward, follow-ups needed",
          medium: "Standard tasks, routine work",
          low: "Nice-to-haves, background research, low-urgency items"
        },
        decision_factors: [
          "Status: in_progress tasks should be minimal (1-2 max) - finish before starting new work",
          "Blocked tasks: May need unblocking before other work can proceed",
          "External dependencies: Tasks awaiting responses (phone calls, messages) take priority when ready",
          "Context switching: Batch similar work together (all follow-ups, all research, etc.)",
          "Daniel's preferences: Proactive follow-ups, minimal interruptions, finish what you start"
        ],
        status_meanings: {
          pending: "Not yet started, ready to begin",
          in_progress: "Currently being worked on (should be 1-2 tasks max across all work)",
          blocked: "Cannot proceed - waiting on something (external response, dependency, information)"
        },
        ai_reasoning_approach: [
          "Read all active tasks and understand their context from notes",
          "Identify external blockers (waiting on Em, Heather, etc.) vs internal work",
          "Look for tasks that enable other work (unblocking dependencies)",
          "Consider what Daniel can act on RIGHT NOW vs what's waiting",
          "Make judgment calls based on plain English context, not rigid rules"
        ]
      }
    };
  }

  async getTask(id: number): Promise<Task | null> {
    const data = await this.loadData();
    return data.tasks.find(t => t.id === id) || null;
  }

  async createTask(taskData: Partial<Task>): Promise<Task> {
    const data = await this.loadData();

    const nextId = data.tasks.length > 0 ? Math.max(...data.tasks.map(t => t.id)) + 1 : 1;

    const task: Task = {
      id: nextId,
      created: new Date().toISOString(),
      content: taskData.content!,
      status: 'pending',
      activeForm: taskData.activeForm || taskData.content!,
      assignee: taskData.assignee!,
      project: taskData.project!,
      tags: taskData.tags || [],
      priority: taskData.priority || 'medium',
      notes: taskData.notes || '',
    };

    data.tasks.push(task);
    await this.saveData(data);
    return task;
  }

  async updateTask(id: number, updates: Partial<Task>): Promise<Task> {
    const data = await this.loadData();
    const task = data.tasks.find(t => t.id === id);

    if (!task) {
      throw new Error(`Task #${id} not found`);
    }

    if (updates.status) task.status = updates.status;
    if (updates.priority) task.priority = updates.priority;
    if (updates.content) task.content = updates.content;
    if (updates.activeForm) task.activeForm = updates.activeForm;
    if (updates.project) task.project = updates.project;
    if (updates.assignee) task.assignee = updates.assignee;
    if (updates.tags) task.tags = updates.tags;
    if (updates.notes !== undefined) {
      task.notes = task.notes ? `${task.notes}\n${updates.notes}` : updates.notes;
    }

    await this.saveData(data);
    return task;
  }

  async completeTask(id: number, notes?: string): Promise<Task> {
    const data = await this.loadData();
    const task = data.tasks.find(t => t.id === id);

    if (!task) {
      throw new Error(`Task #${id} not found`);
    }

    task.status = 'completed';
    task.completed = new Date().toISOString();
    if (notes) {
      task.notes = task.notes ? `${task.notes}\nCOMPLETED: ${notes}` : `COMPLETED: ${notes}`;
    }

    await this.saveData(data);
    return task;
  }

  async deleteTask(id: number): Promise<void> {
    const data = await this.loadData();
    const index = data.tasks.findIndex(t => t.id === id);

    if (index === -1) {
      throw new Error(`Task #${id} not found`);
    }

    data.tasks.splice(index, 1);
    await this.saveData(data);
  }

  async listProjects(): Promise<Record<string, Project>> {
    const data = await this.loadData();
    return data.projects || {};
  }

  async getStats(): Promise<any> {
    const data = await this.loadData();
    const tasks = data.tasks;

    const statusCounts: Record<string, number> = {};
    const priorityCounts: Record<string, number> = {};
    const projectCounts: Record<string, number> = {};

    for (const task of tasks) {
      const status = task.status || 'pending';
      const priority = task.priority || 'medium';
      const project = task.project || 'general';

      statusCounts[status] = (statusCounts[status] || 0) + 1;
      priorityCounts[priority] = (priorityCounts[priority] || 0) + 1;
      projectCounts[project] = (projectCounts[project] || 0) + 1;
    }

    return {
      total: tasks.length,
      byStatus: statusCounts,
      byPriority: priorityCounts,
      byProject: projectCounts,
    };
  }
}
