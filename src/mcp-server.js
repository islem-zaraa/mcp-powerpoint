#!/usr/bin/env node

/**
 * MCP Server for PowerPoint
 * This file implements an MCP server that listens for requests and processes them
 */
const fs = require('fs');
const { plugin } = require('./mcp-integration');

// Handle the MCP protocol
function startMcpServer() {
  const functionMap = {};
  
  // Register all functions from the plugin
  plugin.functions.forEach(func => {
    functionMap[func.name] = func.handler;
  });
  
  // Send the MCP manifest as the initial message
  const manifest = {
    schema_version: "v1",
    name: plugin.name,
    description: plugin.description,
    version: plugin.version,
    functions: plugin.functions.map(func => ({
      name: func.name,
      description: func.description,
      parameters: func.parameters
    }))
  };
  
  // Send the manifest to stdout
  process.stdout.write(JSON.stringify(manifest) + '\n');
  
  // Set up stdin to receive commands
  process.stdin.setEncoding('utf8');
  
  let buffer = '';
  
  process.stdin.on('data', async (chunk) => {
    buffer += chunk;
    
    // Process complete JSON messages (one per line)
    const lines = buffer.split('\n');
    buffer = lines.pop(); // Keep the last incomplete line in the buffer
    
    for (const line of lines) {
      if (line.trim() === '') continue;
      
      try {
        const message = JSON.parse(line);
        
        if (message.type === 'function_call') {
          // Process function call
          const { function_name, parameters, call_id } = message;
          
          if (functionMap[function_name]) {
            try {
              const result = await functionMap[function_name](parameters);
              
              // Send the result
              process.stdout.write(JSON.stringify({
                type: 'function_result',
                call_id,
                result
              }) + '\n');
            } catch (error) {
              // Send error
              process.stdout.write(JSON.stringify({
                type: 'function_result',
                call_id,
                error: {
                  message: error.message
                }
              }) + '\n');
            }
          } else {
            // Function not found
            process.stdout.write(JSON.stringify({
              type: 'function_result',
              call_id,
              error: {
                message: `Function '${function_name}' not found`
              }
            }) + '\n');
          }
        }
      } catch (error) {
        console.error('Error processing message:', error.message);
      }
    }
  });
  
  // Handle process exit
  process.on('SIGINT', () => {
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    process.exit(0);
  });
}

// Start the server
startMcpServer(); 