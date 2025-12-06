import fs from 'fs/promises';
import path from 'path';

export interface QueueItem {
  timestamp: string;
  type: 'general-note' | 'project-note' | 'task-note' | 'progress-report';
  task_id: number | null;
  project: string | null;
  content: string;
  filename: string;
}

export class QueueManager {
  private queueDir: string;
  private processedDir: string;

  constructor(private reevesRoot: string) {
    this.queueDir = path.join(reevesRoot, 'queue');
    this.processedDir = path.join(reevesRoot, 'queue', 'processed');
  }

  async getQueue(): Promise<QueueItem[]> {
    await this.ensureQueueDir();

    const files = await fs.readdir(this.queueDir);
    const queueFiles = files.filter(f => f.endsWith('.json'));

    const items: QueueItem[] = [];
    for (const file of queueFiles) {
      const content = await fs.readFile(path.join(this.queueDir, file), 'utf-8');
      const item = JSON.parse(content);
      items.push({
        ...item,
        filename: file,
      });
    }

    // Sort by timestamp (oldest first)
    return items.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  }

  async processItem(filename: string): Promise<void> {
    const sourcePath = path.join(this.queueDir, filename);
    const destPath = path.join(this.processedDir, filename);

    await this.ensureProcessedDir();
    await fs.rename(sourcePath, destPath);
  }

  async addQueueItem(data: Omit<QueueItem, 'timestamp' | 'filename'>): Promise<QueueItem> {
    await this.ensureQueueDir();

    const timestamp = new Date().toISOString();
    const filename = `${Date.now()}.json`;

    const item: QueueItem = {
      timestamp,
      ...data,
      filename,
    };

    await fs.writeFile(
      path.join(this.queueDir, filename),
      JSON.stringify(item, null, 2)
    );

    return item;
  }

  private async ensureQueueDir(): Promise<void> {
    try {
      await fs.mkdir(this.queueDir, { recursive: true });
    } catch {
      // Directory already exists
    }
  }

  private async ensureProcessedDir(): Promise<void> {
    try {
      await fs.mkdir(this.processedDir, { recursive: true });
    } catch {
      // Directory already exists
    }
  }
}
