/**
 * MCP PowerPoint Plugin Integration Module
 * 
 * This module helps integrate the PowerPoint plugin with MCP systems
 */
const mcpPowerPointPlugin = require('./mcp-plugin');

/**
 * Register the PowerPoint plugin with an MCP system
 * @param {Object} mcpSystem - The MCP system to register with
 */
function registerWithMCP(mcpSystem) {
  if (!mcpSystem || typeof mcpSystem.registerPlugin !== 'function') {
    throw new Error('Invalid MCP system provided. Must have a registerPlugin method.');
  }
  
  // Register the plugin
  mcpSystem.registerPlugin(mcpPowerPointPlugin);
  
  console.log('MCP PowerPoint Plugin registered successfully');
  
  return mcpPowerPointPlugin;
}

/**
 * Get a function map for direct use
 * Returns a map of function names to their handler functions
 * for direct use outside of an MCP system
 */
function getFunctionMap() {
  const functionMap = {};
  
  // Map each function to its handler
  mcpPowerPointPlugin.functions.forEach(func => {
    functionMap[func.name] = func.handler;
  });
  
  return functionMap;
}

module.exports = {
  plugin: mcpPowerPointPlugin,
  registerWithMCP,
  getFunctionMap
}; 