# MCP PowerPoint Plugin

A Model Context Protocol (MCP) plugin for PowerPoint operations, allowing AI assistants to create and manipulate PowerPoint presentations programmatically.

## Features

- Create new PowerPoint presentations
- Add slides to presentations
- Get slides information from a presentation
- Export presentations to PDF
- Read presentation metadata and structure

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mcp-powerpoint.git

# Navigate to the project directory
cd mcp-powerpoint

# Install dependencies
npm install

# Link for local development
npm link
```

## Usage as CLI

This plugin can be used directly as a command-line tool:

```bash
# Create a new presentation
mcp-powerpoint create --outputPath="presentation.pptx" --title="My Presentation"

# Add a slide to an existing presentation
mcp-powerpoint add-slide --file="presentation.pptx" --title="New Slide" --content="This is the content of the slide"

# Get slides from a presentation
mcp-powerpoint get-slides --file="presentation.pptx"

# Export presentation to PDF
mcp-powerpoint export-pdf --file="presentation.pptx" --outputPath="presentation.pdf"

# Read presentation metadata
mcp-powerpoint read --file="presentation.pptx"
```

## Usage as MCP Plugin

This plugin can be integrated into an MCP-compatible AI assistant system:

```javascript
const mcpPowerPointPlugin = require('mcp-powerpoint/src/mcp-plugin');

// Register the plugin with your MCP system
mcpSystem.registerPlugin(mcpPowerPointPlugin);

// Now the AI can use the PowerPoint functions through the MCP protocol
// Example function calls:
// - mcp_powerpoint_create_presentation
// - mcp_powerpoint_add_slide
// - mcp_powerpoint_get_slides
// - mcp_powerpoint_export_to_pdf
// - mcp_powerpoint_read_presentation
```

## Function Descriptions

### mcp_powerpoint_create_presentation

Creates a new PowerPoint presentation.

**Parameters:**
- `outputPath`: Path where to save the PowerPoint file (must end with .pptx)
- `title`: (Optional) Title of the presentation

### mcp_powerpoint_add_slide

Adds a slide to an existing PowerPoint presentation.

**Parameters:**
- `file`: Path to the PowerPoint file
- `title`: (Optional) Title of the slide
- `content`: (Optional) Content of the slide

### mcp_powerpoint_get_slides

Gets slides from a PowerPoint presentation.

**Parameters:**
- `file`: Path to the PowerPoint file

### mcp_powerpoint_export_to_pdf

Exports a PowerPoint presentation to PDF.

**Parameters:**
- `file`: Path to the PowerPoint file
- `outputPath`: Path where to save the PDF file (must end with .pdf)

### mcp_powerpoint_read_presentation

Reads metadata and structure from a PowerPoint presentation.

**Parameters:**
- `file`: Path to the PowerPoint file

## Limitations

- The plugin currently provides basic PowerPoint functionality
- Editing existing slides has limitations due to the complexity of the PPTX format
- The PDF export is a simulated feature in this version

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 