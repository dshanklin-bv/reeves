# Troubleshooting

Common issues and solutions for Reeves.

## Installation Issues

### MCP Server Not Loading

**Symptoms:**
- Claude Code doesn't recognize Reeves tools
- `how_to` command not found
- No Reeves tools available

**Solutions:**

1. **Verify Paths Are Absolute**
   ```bash
   # ❌ Wrong
   "args": ["~/repos/reeves/mcp-server/dist/index.js"]

   # ✅ Right
   "args": ["/Users/yourusername/repos/reeves/mcp-server/dist/index.js"]
   ```

2. **Check MCP Server is Built**
   ```bash
   cd ~/repos/reeves/mcp-server
   npm run build
   ls dist/index.js  # Should exist
   ```

3. **Verify Node.js Version**
   ```bash
   node --version  # Should be 18.0.0 or higher
   ```

4. **Check REEVES_ROOT Exists**
   ```bash
   # In your MCP config
   echo $REEVES_ROOT
   ls $REEVES_ROOT/tasks.json  # Should exist
   ```

5. **Validate MCP Config Syntax**
   ```bash
   cat ~/.config/claude-code/mcp.json | python -m json.tool
   # Should show no JSON errors
   ```

6. **Restart Claude Code**
   ```bash
   # Completely quit Claude Code
   # Then restart it
   ```

### Module Not Found Errors

**Symptoms:**
- `Cannot find module '@modelcontextprotocol/sdk'`
- Import errors when starting MCP server

**Solutions:**

```bash
# Clean install
cd ~/repos/reeves/mcp-server
rm -rf node_modules package-lock.json
npm install
npm run build

# Verify dependencies installed
ls node_modules/@modelcontextprotocol/sdk  # Should exist
```

### Permission Denied

**Symptoms:**
- `EACCES: permission denied`
- Cannot write to files

**Solutions:**

```bash
# Make directory writable
chmod 755 ~/private/reeves

# Make files writable
chmod 644 ~/private/reeves/tasks.json
chmod 644 ~/private/reeves/projects.json
chmod 644 ~/private/life-data/contacts.json

# If still failing, check ownership
ls -la ~/private/reeves/
# Files should be owned by you, not root
```

### Wrong Node Version

**Symptoms:**
- MCP server crashes on start
- Syntax errors in modern JavaScript

**Solutions:**

```bash
# Check version
node --version

# If < 18.0.0, upgrade Node.js
# macOS (using Homebrew)
brew update
brew upgrade node

# Linux (using nvm)
nvm install 18
nvm use 18
```

## Data Persistence Issues

### Tasks Not Persisting

**Symptoms:**
- Create task, restart Claude Code, task is gone
- Tasks.json doesn't update

**Solutions:**

1. **Verify tasks.json Exists**
   ```bash
   ls -la ~/private/reeves/tasks.json
   ```

2. **Check File Permissions**
   ```bash
   # Should be writable (644 or 666)
   chmod 644 ~/private/reeves/tasks.json
   ```

3. **Validate JSON Syntax**
   ```bash
   cat ~/private/reeves/tasks.json | python -m json.tool
   # Should show no JSON errors
   ```

4. **Verify REEVES_ROOT Path**
   ```bash
   # Check MCP config
   cat ~/.config/claude-code/mcp.json
   # REEVES_ROOT should match where tasks.json is
   ```

5. **Check for Write Errors**
   ```
   You: "Create a test task"
   Claude: [If error occurs, should see error message]

   # If no error but still not persisting:
   # - Restart Claude Code
   # - Verify MCP server is running
   ```

### Contacts Not Saving

**Symptoms:**
- Add contact, restart, contact missing
- contacts.json unchanged

**Solutions:**

Same as tasks.json above, but check:
```bash
ls -la ~/private/life-data/contacts.json
chmod 644 ~/private/life-data/contacts.json
cat ~/private/life-data/contacts.json | python -m json.tool
```

### Projects Disappearing

**Symptoms:**
- Create project, it doesn't persist
- projects.json not updating

**Solutions:**

Same as tasks.json above, but check:
```bash
ls -la ~/private/reeves/projects.json
chmod 644 ~/private/reeves/projects.json
cat ~/private/reeves/projects.json | python -m json.tool
```

## Task Management Issues

### Can't Find Task

**Symptoms:**
- Know task exists but can't find it
- Task doesn't appear in lists

**Solutions:**

```
# List all tasks
You: "Show me all tasks"

# Filter by project
You: "Show tasks in [project-name]"

# Check if completed
You: "Show completed tasks"

# Check if cancelled
You: "Show cancelled tasks"

# Search by content
You: "Find tasks about [keyword]"
```

### Too Many Tasks

**Symptoms:**
- Task list is overwhelming
- Hard to find relevant tasks
- Reeves feels slow

**Solutions:**

1. **Use Filters**
   ```
   You: "Show high priority tasks"
   You: "Show my pending tasks"
   You: "Show active tasks only"
   ```

2. **Complete Old Tasks**
   ```
   You: "Complete task [id] with notes: [outcome]"
   ```

3. **Archive Completed Tasks**
   ```bash
   # Manually edit tasks.json
   # Move completed tasks to separate archive file
   ```

4. **Consider Migration**
   - If > 300 tasks, consider SQLite migration
   - See [Scaling Guide](/guide/scaling) for details

### Task Status Confusion

**Symptoms:**
- Multiple tasks `in_progress`
- Tasks stuck in wrong status

**Solutions:**

```
# Check what's in progress
You: "What tasks are in progress?"

# Fix stuck tasks
You: "Mark task [id] as pending"
You: "Block task [id] with note: [reason]"
You: "Complete task [id]"

# Best Practice: Only ONE task in_progress at a time
```

## Message Sending Issues

### Message Went to Wrong Person

**Symptoms:**
- Message sent to incorrect recipient
- Verification didn't catch it

**Prevention:**

::: danger Critical Protocol
ALWAYS verify recipient against both:
1. Reeves contacts.json
2. Messages database

Never use "contact:N" indices. Always use phone numbers directly.
:::

**If It Happened:**

1. Immediately send clarification to wrong recipient
2. Send intended message to correct recipient
3. Update contacts.json with verified phone numbers
4. Review and fix contact entry
5. Document what went wrong

### Verification Failing

**Symptoms:**
- Cannot send message due to verification failure
- Phone numbers don't match

**Solutions:**

```
# Check contacts.json
cat ~/private/life-data/contacts.json | grep -A5 "contact_name"

# Verify in Messages
You: "Find [contact name] in Messages database"

# Update contacts.json if needed
You: "Update [contact name] phone number to [correct number]"

# Try sending again
```

### Messages MCP Not Working

**Symptoms:**
- Can't read messages
- Can't send messages
- Messages tools not available

**Solutions:**

1. **Check iTerm2 Full Disk Access**
   - macOS Ventura+ blocks Messages database access
   - See [Messages MCP Documentation](https://github.com/yourusername/messages-mcp)

2. **Verify Messages Database Exists**
   ```bash
   ls ~/Library/Messages/chat.db
   ```

3. **Check MCP Server Running**
   ```bash
   # Verify in Claude Code MCP config
   cat ~/.config/claude-code/mcp.json | grep messages
   ```

## Project Issues

### Project Not Found

**Symptoms:**
- Create tasks for project but project doesn't exist
- Project not in list

**Solutions:**

```
# List all projects
You: "Show me all projects"

# Create project explicitly
You: "Create a project called [project-name]"

# Verify task has correct project
You: "Show task [id]"
# Check project field matches exactly
```

### Can't See Project Tasks

**Symptoms:**
- Project exists but no tasks show up
- Tasks show up elsewhere

**Solutions:**

```
# Check project name spelling
You: "List all projects"

# Check task project field
You: "Show all tasks"
# Verify project field matches project name exactly

# Filter by project
You: "Show tasks for [exact-project-name]"
```

## Contact Issues

### Contact Not in Messages Database

**Symptoms:**
- Contact exists in contacts.json
- Can't find in Messages app
- Verification fails

**Solutions:**

1. **Add to iPhone/Messages First**
   - Open Messages app
   - Start new conversation
   - Add contact to address book

2. **Verify Contact Exists**
   ```
   You: "Find [contact name] in Messages"
   # Should return contact info
   ```

3. **Update contacts.json**
   ```
   You: "Update [contact name] phone to match Messages"
   ```

### Phone Number Mismatch

**Symptoms:**
- Different phone numbers in different places
- Verification fails

**Solutions:**

1. **Check Both Sources**
   ```bash
   # Check contacts.json
   cat ~/private/life-data/contacts.json | grep -A3 "contact_name"

   # Check Messages
   You: "Find [contact name] in Messages"
   ```

2. **Choose Authoritative Source**
   - Usually Messages database is correct
   - Update contacts.json to match

3. **Verify and Update**
   ```
   You: "Update [contact] phone to [correct number]"
   You: "Verify I can send to [contact]"
   ```

## Performance Issues

### Reeves is Slow

**Symptoms:**
- Long delays when listing tasks
- Slow to create/update tasks
- Claude Code lags

**Solutions:**

1. **Check Task Count**
   ```
   You: "How many tasks do I have?"
   # If > 200, consider cleanup
   # If > 300, consider SQLite migration
   ```

2. **Archive Completed Tasks**
   ```bash
   # Manually edit tasks.json
   # Move old completed tasks to archive file
   ```

3. **Check File Sizes**
   ```bash
   ls -lh ~/private/reeves/tasks.json
   ls -lh ~/private/life-data/contacts.json
   # If > 500KB, time to optimize
   ```

4. **Consider Migration**
   - See [Scaling Guide](/guide/scaling)
   - SQLite for 300+ tasks
   - Postgres for 1000+ tasks

### JSON Parsing Errors

**Symptoms:**
- `SyntaxError: Unexpected token`
- `JSON.parse error`
- MCP server crashes

**Solutions:**

1. **Validate JSON Files**
   ```bash
   python -m json.tool ~/private/reeves/tasks.json
   python -m json.tool ~/private/reeves/projects.json
   python -m json.tool ~/private/life-data/contacts.json
   ```

2. **Fix JSON Errors**
   ```bash
   # Common issues:
   # - Missing comma between objects
   # - Trailing comma after last item
   # - Unescaped quotes in strings
   # - Missing closing bracket/brace
   ```

3. **Restore from Backup**
   ```bash
   # If you have git backup
   cd ~/private/reeves
   git restore tasks.json
   ```

## Git and Version Control

### Accidentally Committed Private Data

**Symptoms:**
- tasks.json in git history
- contacts.json visible on GitHub
- Private data exposed

**Solutions:**

::: danger Immediate Action Required
If private data is on GitHub:
1. Remove from git immediately
2. Consider repository private
3. Remove from git history if needed
:::

```bash
# Remove from staging
git rm --cached tasks.json
git rm --cached life-data/contacts.json

# Verify .gitignore
cat .gitignore | grep tasks.json
# Should be listed

# Commit removal
git commit -m "Remove private data"
git push

# If already pushed, remove from history
# (WARNING: Rewrites history)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch tasks.json" \
  --prune-empty --tag-name-filter cat -- --all
```

### Git Not Ignoring Files

**Symptoms:**
- tasks.json shows in `git status`
- Private files being tracked

**Solutions:**

```bash
# Check .gitignore
cat .gitignore

# Should include:
# tasks.json
# projects.json
# learning-logs/
# artifacts/
# life-data/
# .env

# If file already tracked, remove it
git rm --cached tasks.json

# Commit .gitignore update
git add .gitignore
git commit -m "Update .gitignore to exclude private data"
```

## Documentation Build Issues

### VitePress Build Failing

**Symptoms:**
- `npm run docs:build` fails
- Dead link errors
- Page not found

**Solutions:**

1. **Check Dead Links**
   ```bash
   npm run docs:build
   # Look for "Found dead link" errors
   ```

2. **Create Missing Pages**
   ```bash
   # Create the missing .md file
   touch docs/guide/missing-page.md
   # Add content
   ```

3. **Fix Broken Links**
   ```bash
   # Check for typos in links
   grep -r "missing-page" docs/
   # Fix any incorrect paths
   ```

### Dev Server Not Starting

**Symptoms:**
- `npm run docs:dev` fails
- Port already in use
- Module not found

**Solutions:**

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Clean install
rm -rf node_modules package-lock.json
npm install

# Try again
npm run docs:dev
```

## Getting Help

If you're still stuck:

1. **Check GitHub Issues**
   - Search existing issues
   - See if others had same problem
   - [Reeves GitHub Issues](https://github.com/dshanklin-bv/reeves/issues)

2. **Review Documentation**
   - [AI Assistant Guide](/guide/ai-assistant-guide)
   - [Installation Guide](/guide/installation)
   - [Architecture Document](https://github.com/dshanklin-bv/reeves/blob/main/ARCHITECTURE.md)

3. **Open New Issue**
   Include:
   - Operating system and version
   - Node.js version (`node --version`)
   - Steps to reproduce
   - Error messages (full text)
   - What you've already tried

4. **Check MCP Server Logs**
   ```bash
   # Claude Code logs location (macOS)
   ~/Library/Logs/Claude/

   # Look for MCP server errors
   ```

## Preventive Maintenance

### Weekly Tasks

```bash
# Verify file integrity
python -m json.tool ~/private/reeves/tasks.json > /dev/null
python -m json.tool ~/private/reeves/projects.json > /dev/null
python -m json.tool ~/private/life-data/contacts.json > /dev/null

# Backup files
cp ~/private/reeves/tasks.json ~/private/reeves/tasks.json.backup
```

### Monthly Tasks

```bash
# Check file sizes
ls -lh ~/private/reeves/*.json
# Consider archiving if > 500KB

# Verify MCP server still working
You: "List all tasks"
# Should return tasks quickly
```

### Quarterly Tasks

```bash
# Review and archive old completed tasks
# Consider SQLite migration if > 300 tasks
# Update Reeves to latest version

cd ~/repos/reeves
git pull origin main
cd mcp-server
npm install
npm run build
```

## Common Error Messages

### "Cannot find module"

```
Error: Cannot find module '@modelcontextprotocol/sdk'
```

**Fix:**
```bash
cd ~/repos/reeves/mcp-server
npm install
```

### "EACCES: permission denied"

```
Error: EACCES: permission denied, open '/path/to/tasks.json'
```

**Fix:**
```bash
chmod 644 ~/private/reeves/tasks.json
```

### "Unexpected token in JSON"

```
SyntaxError: Unexpected token } in JSON at position 1234
```

**Fix:**
```bash
python -m json.tool ~/private/reeves/tasks.json
# Fix JSON syntax error shown
```

### "MCP server not responding"

```
Error: MCP server not responding
```

**Fix:**
```bash
# Restart Claude Code
# Verify MCP config paths
# Check Node.js is running
```

---

**Still having issues?** Open a [GitHub issue](https://github.com/dshanklin-bv/reeves/issues) with details.
