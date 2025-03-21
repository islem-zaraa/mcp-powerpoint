#!/usr/bin/env node

/**
 * TCP Server implementation for PowerPoint MCP
 * This allows the MCP server to work with Smithery's hosted infrastructure
 */
const net = require('net');
const http = require('http');
const { plugin } = require('./mcp-integration');

// Get port from environment variable or use default
const PORT = process.env.PORT || 8080;
const HTTP_PORT = process.env.HTTP_PORT || PORT;

// Initialize function map
const functionMap = {};

// Register all functions from the plugin
plugin.functions.forEach(func => {
  functionMap[func.name] = func.handler;
});

// Create MCP manifest
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

// Setup HTTP server for health checks
const httpServer = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'healthy' }));
  } else {
    res.writeHead(404);
    res.end();
  }
});

// Create a TCP server for MCP
const tcpServer = net.createServer((socket) => {
  console.log('Client connected');
  
  // Send the manifest immediately upon connection
  socket.write(JSON.stringify(manifest) + '\n');
  
  let buffer = '';
  
  // Handle data from client
  socket.on('data', async (data) => {
    buffer += data.toString();
    
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
              socket.write(JSON.stringify({
                type: 'function_result',
                call_id,
                result
              }) + '\n');
            } catch (error) {
              // Send error
              socket.write(JSON.stringify({
                type: 'function_result',
                call_id,
                error: {
                  message: error.message
                }
              }) + '\n');
            }
          } else {
            // Function not found
            socket.write(JSON.stringify({
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
  
  // Handle client disconnection
  socket.on('end', () => {
    console.log('Client disconnected');
  });
  
  // Handle errors
  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});

// Start the servers
httpServer.listen(HTTP_PORT, () => {
  console.log(`Health check HTTP server listening on port ${HTTP_PORT}`);
});

tcpServer.listen(PORT, () => {
  console.log(`MCP PowerPoint TCP server listening on port ${PORT}`);
});

// Handle server errors
tcpServer.on('error', (err) => {
  console.error('TCP Server error:', err);
});

httpServer.on('error', (err) => {
  console.error('HTTP Server error:', err);
});

// Handle process termination
process.on('SIGINT', () => {
  tcpServer.close(() => {
    httpServer.close(() => {
      console.log('Servers closed');
      process.exit(0);
    });
  });
});

process.on('SIGTERM', () => {
  tcpServer.close(() => {
    httpServer.close(() => {
      console.log('Servers closed');
      process.exit(0);
    });
  });
}); 