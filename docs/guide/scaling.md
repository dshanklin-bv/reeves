# Scaling

Migration path when JSON files outgrow your needs.

## When to Scale

**JSON works well until:**
- Tasks > 300 (performance degrades)
- Need multi-user access
- Want web UI
- Need complex analytics

**Migration triggers:**
1. Task list takes > 2 seconds to load
2. File size > 500KB
3. Multiple people need access
4. You want mobile app

## Phase 1: JSON Files (Current)

```
/reeves/
├── tasks.json
├── projects.json
└── learning-logs/
```

**Best for:**
- Single user
- < 300 tasks
- Personal use
- Command-line interaction

✅ Simple, debuggable, fast backups
❌ No concurrency, manual queries

## Phase 2: SQLite (When Needed)

```
/reeves/
├── reeves.db           # SQLite database
├── tasks.json          # Export/backup
└── learning-logs/      # Still markdown
```

**Changes:**
- MCP server uses SQLite
- JSON becomes export format
- Learning logs stay markdown
- Fast queries at 1000+ tasks

✅ SQL queries, 10x faster, still portable
❌ Still single-user, no web UI

**Migration:**
```bash
cd ~/repos/reeves/mcp-server
npm run migrate-to-sqlite
# Reads tasks.json, creates reeves.db
# Keeps JSON as backup
```

**Best for:**
- 300-1000 tasks
- Need filtering/reporting
- Still personal CLI use

## Phase 3: Postgres + API (If Needed)

Full client-server architecture:
- Postgres database
- REST API server
- Web/mobile clients
- Multi-user support

Only needed if:
- Multiple users
- Real-time sync
- Web interface required
- 1000+ tasks

**This is a major project** - don't do it unless you've truly outgrown SQLite.

## Learning Logs Stay Markdown

**Always:** Learning logs remain markdown files, regardless of database choice.

**Why:** Context needs human editability, version control, and portability. Databases are for structured queries, not deep narrative context.

## Migration Strategy

1. **Start with JSON** - Use it until it hurts
2. **Measure pain** - Is it actually slow? Or just feels like it should scale?
3. **Try SQLite first** - Easiest upgrade, massive improvement
4. **Only then Postgres** - If you're building multi-user product

Most people never migrate. JSON + 300 tasks is enough for complex lives.

## What NOT to Do

- ❌ Migrate before you feel pain
- ❌ Build web UI "because it would be cool"
- ❌ Move learning logs to database
- ❌ Add complexity for hypothetical scale

**Start simple. Migrate when forced.**
