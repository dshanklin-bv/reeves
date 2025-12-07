# Troubleshooting

Common patterns when things go wrong. Your AI can debug specifics.

## MCP Not Loading

**Check:**
```bash
# Paths must be absolute, not ~
ls /Users/you/repos/reeves/mcp-server/dist/index.js

# Verify built
cd ~/repos/reeves/mcp-server && npm run build

# Check JSON syntax
cat ~/.config/claude-code/mcp.json | python -m json.tool
```

**Fix:** Restart Claude Code after changes.

## Module Errors

```bash
cd ~/repos/reeves/mcp-server
rm -rf node_modules package-lock.json
npm install && npm run build
```

## Permission Denied

```bash
chmod 755 ~/private/reeves
chmod 644 ~/private/reeves/*.json
ls -la ~/private/reeves/  # Should be owned by you
```

## Tasks Not Saving

```bash
# Verify files exist
ls ~/private/reeves/tasks.json
ls ~/private/life-data/contacts.json

# Check REEVES_ROOT in MCP config
echo $REEVES_ROOT  # Should match config
```

## Tools Not Working

1. Check Claude Code can see tools: "List available Reeves tools"
2. Verify MCP server logs (restart with verbose logging)
3. Test with simple command: "Create a test task"

## Data Corruption

```bash
# Validate JSON
cat ~/private/reeves/tasks.json | python -m json.tool

# Restore from backup
cp ~/private/reeves/.backup/tasks-YYYYMMDD.json ~/private/reeves/tasks.json
```

## Performance Issues

- Check file sizes: `wc -l ~/private/reeves/*.json`
- Over 300 tasks? Time to migrate to SQLite (see [Scaling](/guide/scaling))
- Large learning logs? Split into separate projects

## Getting Help

1. Check MCP server is running: Look for process in Activity Monitor
2. Verify Node version: `node --version` (need 18+)
3. Test MCP config syntax with JSON validator
4. Ask AI to check logs for specific error messages

Most issues are path problems or missing builds. Start there.
