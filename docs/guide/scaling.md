# Scaling Reeves

Migration path when JSON files outgrow your needs.

## When to Scale

Reeves uses JSON files intentionally for simplicity. But eventually you may need to migrate to a database.

### Current Limits

**JSON works well until:**
- **Tasks:** ~200-300 total (performance starts degrading)
- **Contacts:** ~50-100 (file size manageable)
- **Interactions per contact:** 5-10 recent (older ones archived)

### Migration Triggers

Consider migrating when:

1. **Task count > 300**
   - JSON parsing becomes slow
   - Task list takes >2 seconds to load
   - File size > 500KB

2. **Multiple users**
   - You want to share with family/team
   - Concurrency issues arise
   - Need access control

3. **Web UI needed**
   - Want to access from phone/tablet
   - Need multi-device sync
   - Real-time updates required

4. **Analytics desired**
   - Complex queries
   - Reporting and dashboards
   - Trend analysis

## Migration Phases

### Phase 1: JSON Files (Now)

**Current State:**
```
/reeves/
├── tasks.json          # Flat JSON array
├── projects.json       # Flat JSON object
└── learning-logs/      # Markdown files
```

**Characteristics:**
- ✅ Simple, debuggable
- ✅ Easy to backup (copy files)
- ✅ Fast for < 300 tasks
- ❌ Slows down at scale
- ❌ No concurrency
- ❌ Manual queries only

**Best for:**
- Single user
- < 300 tasks
- Personal use
- No web UI

### Phase 2: SQLite for Queries (6-12 months)

**Hybrid Approach:**
```
/reeves/
├── reeves.db           # SQLite database
├── tasks.json          # Export/backup
├── projects.json       # Export/backup
└── learning-logs/      # Markdown files
```

**What Changes:**
- MCP server reads/writes to SQLite
- JSON files become export format
- Learning logs stay as markdown
- Tasks/projects in database tables

**Benefits:**
- ✅ Fast queries even at 1000+ tasks
- ✅ SQL for complex filtering
- ✅ Still single-file portability
- ✅ Easy migration (minimal code changes)
- ❌ Still no web UI
- ❌ Still single user

**Best for:**
- 300-1000 tasks
- Need complex queries
- Still personal use
- Want speed but keep simplicity

### Phase 3: PostgreSQL (1-2 years)

**Full Database:**
```
Database: reeves_db
Tables:
├── tasks
├── projects
├── contacts
├── interactions
├── queue_items
└── learning_logs (metadata)
```

**What Changes:**
- Hosted PostgreSQL instance
- Multi-user support
- Web API available
- Learning logs metadata in DB, content on disk

**Benefits:**
- ✅ Unlimited scale
- ✅ Multiple users
- ✅ Real-time sync
- ✅ Advanced queries
- ✅ Backup/restore automated
- ❌ More complexity
- ❌ Hosting costs

**Best for:**
- 1000+ tasks
- Multiple users/family
- Web/mobile app
- Team collaboration

### Phase 4: Full Platform (2-3 years)

**Complete System:**
```
Infrastructure:
├── PostgreSQL (structured data)
├── Vector DB (AI embeddings)
├── Redis (caching)
├── S3 (artifacts)
├── Web app
└── Mobile apps
```

**Benefits:**
- ✅ AI-powered search
- ✅ Semantic understanding
- ✅ Real-time collaboration
- ✅ Mobile-first
- ✅ Analytics dashboard
- ❌ Significant complexity
- ❌ Ongoing maintenance

**Best for:**
- Product/SaaS
- Large teams
- Advanced features
- AI-first workflows

## SQLite Migration Guide

When you hit ~300 tasks, migrate to SQLite:

### Step 1: Design Schema

```sql
-- tasks table
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  active_form TEXT,
  status TEXT NOT NULL CHECK(status IN ('pending', 'in_progress', 'completed', 'blocked', 'cancelled', 'skipped')),
  assignee TEXT NOT NULL CHECK(assignee IN ('daniel', 'reeves')),
  project TEXT NOT NULL,
  priority TEXT CHECK(priority IN ('urgent', 'high', 'medium', 'low')),
  tags TEXT, -- JSON array
  notes TEXT,
  created TEXT NOT NULL,
  updated TEXT NOT NULL,
  completed TEXT
);

-- projects table
CREATE TABLE projects (
  slug TEXT PRIMARY KEY,
  owner TEXT NOT NULL CHECK(owner IN ('daniel', 'reeves')),
  status TEXT NOT NULL CHECK(status IN ('active', 'on-hold', 'completed', 'cancelled', 'archived')),
  context_file TEXT,
  notes TEXT,
  created TEXT NOT NULL,
  updated TEXT NOT NULL
);

-- indexes for performance
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_project ON tasks(project);
CREATE INDEX idx_tasks_assignee ON tasks(assignee);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_projects_status ON projects(status);
```

### Step 2: Migration Script

```javascript
// migrate-to-sqlite.js
import { Database } from 'better-sqlite3';
import fs from 'fs';

const db = new Database('reeves.db');

// Create tables
db.exec(fs.readFileSync('schema.sql', 'utf8'));

// Migrate tasks
const tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf8'));
const insertTask = db.prepare(`
  INSERT INTO tasks (id, content, active_form, status, assignee, project, priority, tags, notes, created, updated, completed)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const task of tasks) {
  insertTask.run(
    task.id,
    task.content,
    task.activeForm,
    task.status,
    task.assignee,
    task.project,
    task.priority,
    JSON.stringify(task.tags || []),
    task.notes,
    task.created,
    task.updated,
    task.completed || null
  );
}

// Migrate projects
const projects = JSON.parse(fs.readFileSync('projects.json', 'utf8'));
const insertProject = db.prepare(`
  INSERT INTO projects (slug, owner, status, context_file, notes, created, updated)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

for (const [slug, project] of Object.entries(projects)) {
  insertProject.run(
    slug,
    project.owner,
    project.status,
    project.context_file,
    project.notes,
    new Date().toISOString(), // created
    new Date().toISOString()  // updated
  );
}

console.log('Migration complete!');
```

### Step 3: Update MCP Server

```typescript
// Replace JSON file operations with SQLite queries
import Database from 'better-sqlite3';

const db = new Database(process.env.REEVES_DB_PATH || 'reeves.db');

// Example: list_tasks tool
function listTasks(filters: TaskFilters) {
  let query = 'SELECT * FROM tasks WHERE 1=1';
  const params: any[] = [];

  if (filters.status) {
    query += ' AND status = ?';
    params.push(filters.status);
  }

  if (filters.project) {
    query += ' AND project = ?';
    params.push(filters.project);
  }

  if (filters.assignee) {
    query += ' AND assignee = ?';
    params.push(filters.assignee);
  }

  query += ' ORDER BY updated DESC';

  return db.prepare(query).all(...params);
}
```

### Step 4: Test Migration

```bash
# Backup JSON files
cp tasks.json tasks.json.backup
cp projects.json projects.json.backup

# Run migration
node migrate-to-sqlite.js

# Verify data
sqlite3 reeves.db "SELECT COUNT(*) FROM tasks"
sqlite3 reeves.db "SELECT COUNT(*) FROM projects"

# Test MCP server
npm run build
# Restart Claude Code
# Test with: "List all tasks"
```

### Step 5: Keep JSON Exports

```javascript
// export-to-json.js
// Run weekly to maintain JSON backups
import Database from 'better-sqlite3';
import fs from 'fs';

const db = new Database('reeves.db');

const tasks = db.prepare('SELECT * FROM tasks').all();
fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));

const projects = db.prepare('SELECT * FROM projects').all();
const projectsObj = {};
for (const project of projects) {
  projectsObj[project.slug] = project;
}
fs.writeFileSync('projects.json', JSON.stringify(projectsObj, null, 2));

console.log('Export complete!');
```

## PostgreSQL Migration Guide

When you need multi-user or 1000+ tasks:

### Step 1: Set Up Database

```bash
# Option 1: Local PostgreSQL
brew install postgresql
createdb reeves

# Option 2: Supabase (recommended)
# Sign up at supabase.com
# Create new project
# Get connection string
```

### Step 2: Schema Design

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- tasks table
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
  content TEXT NOT NULL,
  active_form TEXT,
  status TEXT NOT NULL CHECK(status IN ('pending', 'in_progress', 'completed', 'blocked', 'cancelled', 'skipped')),
  assignee TEXT NOT NULL,
  project TEXT NOT NULL,
  priority TEXT CHECK(priority IN ('urgent', 'high', 'medium', 'low')),
  tags JSONB DEFAULT '[]',
  notes TEXT,
  created TIMESTAMP NOT NULL DEFAULT NOW(),
  updated TIMESTAMP NOT NULL DEFAULT NOW(),
  completed TIMESTAMP,
  FOREIGN KEY (project) REFERENCES projects(slug) ON DELETE CASCADE
);

-- projects table
CREATE TABLE projects (
  slug TEXT PRIMARY KEY,
  owner TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('active', 'on-hold', 'completed', 'cancelled', 'archived')),
  context_file TEXT,
  notes TEXT,
  created TIMESTAMP NOT NULL DEFAULT NOW(),
  updated TIMESTAMP NOT NULL DEFAULT NOW()
);

-- contacts table
CREATE TABLE contacts (
  slug TEXT PRIMARY KEY,
  primary_phone TEXT,
  email TEXT,
  relationship TEXT,
  context TEXT,
  projects JSONB DEFAULT '[]',
  communication_preferences JSONB,
  notes TEXT,
  created TIMESTAMP NOT NULL DEFAULT NOW(),
  updated TIMESTAMP NOT NULL DEFAULT NOW()
);

-- interactions table
CREATE TABLE interactions (
  id SERIAL PRIMARY KEY,
  contact_slug TEXT NOT NULL REFERENCES contacts(slug) ON DELETE CASCADE,
  date DATE NOT NULL,
  type TEXT NOT NULL,
  topic TEXT,
  task_id INTEGER REFERENCES tasks(id) ON DELETE SET NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_project ON tasks(project);
CREATE INDEX idx_tasks_assignee ON tasks(assignee);
CREATE INDEX idx_tasks_created ON tasks(created DESC);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_contacts_relationship ON contacts(relationship);
CREATE INDEX idx_interactions_contact ON interactions(contact_slug);
CREATE INDEX idx_interactions_date ON interactions(date DESC);

-- Full-text search
CREATE INDEX idx_tasks_content_search ON tasks USING gin(to_tsvector('english', content || ' ' || COALESCE(notes, '')));
```

### Step 3: Migration

Use same approach as SQLite, but with PostgreSQL client:

```bash
npm install pg
node migrate-to-postgres.js
```

### Step 4: Update Environment

```bash
# .env
DATABASE_URL=postgresql://user:password@localhost:5432/reeves

# Or for Supabase
DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
```

## Performance Optimization

### Indexes

```sql
-- Add indexes for common queries
CREATE INDEX idx_tasks_updated ON tasks(updated DESC);
CREATE INDEX idx_tasks_priority_status ON tasks(priority, status);
```

### Archiving Old Data

```sql
-- Move old completed tasks to archive table
CREATE TABLE tasks_archive AS SELECT * FROM tasks WHERE 1=0;

INSERT INTO tasks_archive
SELECT * FROM tasks
WHERE status = 'completed'
  AND completed < NOW() - INTERVAL '6 months';

DELETE FROM tasks
WHERE status = 'completed'
  AND completed < NOW() - INTERVAL '6 months';
```

### Query Optimization

```sql
-- Use EXPLAIN to analyze queries
EXPLAIN ANALYZE
SELECT * FROM tasks
WHERE status = 'pending'
  AND project = 'backend-redesign'
ORDER BY priority DESC;
```

## Backup Strategy

### JSON Phase

```bash
# Simple file copy
cp tasks.json tasks-backup-$(date +%Y%m%d).json

# Git for version control
git add tasks.json projects.json
git commit -m "Backup $(date +%Y-%m-%d)"
```

### SQLite Phase

```bash
# SQLite backup
sqlite3 reeves.db ".backup reeves-backup-$(date +%Y%m%d).db"

# Export to JSON
node export-to-json.js
```

### PostgreSQL Phase

```bash
# Dump database
pg_dump reeves > reeves-backup-$(date +%Y%m%d).sql

# Supabase automatic backups
# Daily backups included on paid plans
```

## Rollback Plan

Always maintain ability to go back:

1. **Keep JSON exports** - Even after SQLite/Postgres migration
2. **Test migrations** - On copy of data first
3. **Maintain old MCP server** - Keep JSON version working
4. **Gradual cutover** - Run both systems in parallel initially

## Cost Considerations

### JSON Files
- **Storage:** Free (local disk)
- **Hosting:** Free (local only)
- **Maintenance:** Free (DIY)
- **Total:** $0/month

### SQLite
- **Storage:** Free (local disk)
- **Hosting:** Free (local only)
- **Maintenance:** Free (DIY)
- **Total:** $0/month

### PostgreSQL (Supabase)
- **Free Tier:** 500MB, 2GB bandwidth
- **Pro Plan:** $25/month (8GB, 50GB bandwidth)
- **Maintenance:** Managed
- **Total:** $0-25/month

### Full Platform
- **Database:** $25-100/month
- **Hosting:** $10-50/month
- **CDN:** $5-20/month
- **Total:** $40-170/month

## When NOT to Scale

Keep JSON files if:
- ✅ You have < 200 tasks
- ✅ You're the only user
- ✅ Performance is fine
- ✅ You like the simplicity
- ✅ Backups are easy (file copy)

**Remember:** Premature optimization is the root of all evil. Scale when it hurts, not when you think it might.

## Next Steps

- [Learn about Tasks](/guide/tasks)
- [Learn about Projects](/guide/projects)
- [Troubleshooting Guide](/guide/troubleshooting)
- [Architecture Documentation](https://github.com/dshanklin-bv/reeves/blob/main/ARCHITECTURE.md)

---

**Start simple. Scale when needed. JSON works longer than you think.**
