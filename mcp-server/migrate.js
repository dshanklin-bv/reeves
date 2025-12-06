#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REEVES_ROOT = path.resolve(__dirname, '..');

async function migrate() {
  console.log('🔄 Migrating tasks.json to individual task files...\n');

  // Read tasks.json
  const tasksJsonPath = path.join(REEVES_ROOT, 'tasks.json');
  const content = await fs.readFile(tasksJsonPath, 'utf-8');
  const data = JSON.parse(content);

  // Create tasks directory
  const tasksDir = path.join(REEVES_ROOT, 'tasks');
  await fs.mkdir(tasksDir, { recursive: true });

  // Write each task to individual file
  console.log(`📝 Creating ${data.tasks.length} task files...`);
  for (const task of data.tasks) {
    const taskPath = path.join(tasksDir, `${task.id}.json`);
    await fs.writeFile(taskPath, JSON.stringify(task, null, 2));
    console.log(`  ✓ Task #${task.id}: ${task.content.substring(0, 50)}...`);
  }

  // Create projects.json
  const projectsPath = path.join(REEVES_ROOT, 'projects.json');
  const projects = {
    version: data.version,
    last_updated: data.last_updated,
    projects: data.projects,
  };
  await fs.writeFile(projectsPath, JSON.stringify(projects, null, 2));
  console.log(`\n✓ Created projects.json with ${Object.keys(data.projects).length} projects`);

  // Backup original tasks.json
  const backupPath = path.join(REEVES_ROOT, 'tasks.json.backup');
  await fs.copyFile(tasksJsonPath, backupPath);
  console.log(`✓ Backed up original tasks.json to tasks.json.backup`);

  console.log('\n✅ Migration complete!');
  console.log(`\nNext steps:`);
  console.log(`1. Add MCP server to Claude Code config`);
  console.log(`2. Test with: mcp__reeves__list_tasks`);
  console.log(`3. If working, delete tasks.json.backup`);
}

migrate().catch((error) => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
