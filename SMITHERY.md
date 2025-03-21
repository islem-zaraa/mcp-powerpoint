# PowerPoint MCP Server for Smithery

This MCP server allows AI assistants to create, modify, and read PowerPoint presentations through the Model Context Protocol.

## Features

- Create new PowerPoint presentations with custom titles
- Add slides with titles, content, and formatting
- Read existing PowerPoint presentations
- Export presentations to PDF
- Get information about slides in a presentation

## Usage with Smithery

To use this MCP server with Smithery, add it to your configuration:

```json
{
  "mcpServers": {
    "powerpoint": {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest",
        "run",
        "mcp-powerpoint",
        "--client",
        "your-client-name"
      ]
    }
  }
}
```

## Example Commands for AI

Your AI assistant can now create and manipulate PowerPoint presentations with commands like:

- "Create a new PowerPoint presentation with a title slide about climate change"
- "Add a content slide with bullet points about renewable energy sources"
- "Export my presentation to PDF"
- "Read the content of my PowerPoint file"
- "Get information about the slides in my presentation"

## Configuration

No additional configuration is required, but the AI will need permission to access the file system to read and write PowerPoint files.

## License

MIT 