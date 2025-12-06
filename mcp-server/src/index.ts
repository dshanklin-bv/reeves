#!/usr/bin/env node
/**
 * Reeves MCP Server
 * Task and project management system for Claude Code
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { registerTools, handleToolCall } from './tools.js';
import { TaskManager } from './task-manager.js';
import { QueueManager } from './queue-manager.js';

// Auto-detect Reeves root
const REEVES_ROOT = process.env.REEVES_ROOT || '/Users/dshanklinbv/repos/ds-dot-com/reeves';

// Initialize managers
const taskManager = new TaskManager(REEVES_ROOT);
const queueManager = new QueueManager(REEVES_ROOT);

// Create MCP server
const server = new Server(
  {
    name: 'reeves-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register tools
const tools = registerTools();

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  return await handleToolCall(request, taskManager, queueManager);
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Reeves MCP server running on stdio');
  console.error(`Using Reeves root: ${REEVES_ROOT}`);
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
