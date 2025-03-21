/**
 * MCP Plugin for PowerPoint
 * This file registers the PowerPoint functionalities as MCP functions
 */
const PowerPointService = require('./powerpoint-service');

// Create a shared instance of the service
const powerPointService = new PowerPointService();

/**
 * MCP Plugin definition
 */
const mcpPowerPointPlugin = {
  name: 'mcp_powerpoint',
  description: 'MCP Plugin for PowerPoint operations',
  version: '0.1.0',
  functions: [
    {
      name: 'mcp_powerpoint_create_presentation',
      description: 'Create a new PowerPoint presentation',
      parameters: {
        properties: {
          outputPath: {
            type: 'string',
            description: 'Path where to save the PowerPoint file (must end with .pptx)'
          },
          title: {
            type: 'string',
            description: 'Title of the presentation'
          }
        },
        required: ['outputPath']
      },
      handler: async (params) => {
        try {
          const result = await powerPointService.createPresentation(params);
          return { success: true, file: result };
        } catch (error) {
          return { success: false, error: error.message };
        }
      }
    },
    {
      name: 'mcp_powerpoint_add_slide',
      description: 'Add a slide to an existing PowerPoint presentation',
      parameters: {
        properties: {
          file: {
            type: 'string',
            description: 'Path to the PowerPoint file'
          },
          title: {
            type: 'string',
            description: 'Title of the slide'
          },
          content: {
            type: 'string',
            description: 'Content of the slide'
          }
        },
        required: ['file']
      },
      handler: async (params) => {
        try {
          await powerPointService.addSlide(params);
          return { success: true };
        } catch (error) {
          return { success: false, error: error.message };
        }
      }
    },
    {
      name: 'mcp_powerpoint_get_slides',
      description: 'Get slides from a PowerPoint presentation',
      parameters: {
        properties: {
          file: {
            type: 'string',
            description: 'Path to the PowerPoint file'
          }
        },
        required: ['file']
      },
      handler: async (params) => {
        try {
          const slides = await powerPointService.getSlides(params);
          return { success: true, slides };
        } catch (error) {
          return { success: false, error: error.message };
        }
      }
    },
    {
      name: 'mcp_powerpoint_export_to_pdf',
      description: 'Export a PowerPoint presentation to PDF',
      parameters: {
        properties: {
          file: {
            type: 'string',
            description: 'Path to the PowerPoint file'
          },
          outputPath: {
            type: 'string',
            description: 'Path where to save the PDF file (must end with .pdf)'
          }
        },
        required: ['file', 'outputPath']
      },
      handler: async (params) => {
        try {
          const result = await powerPointService.exportToPdf(params);
          return { success: true, file: result };
        } catch (error) {
          return { success: false, error: error.message };
        }
      }
    },
    {
      name: 'mcp_powerpoint_read_presentation',
      description: 'Read a PowerPoint presentation metadata and structure',
      parameters: {
        properties: {
          file: {
            type: 'string',
            description: 'Path to the PowerPoint file'
          }
        },
        required: ['file']
      },
      handler: async (params) => {
        try {
          const presentation = await powerPointService.readPresentation(params);
          return { success: true, presentation };
        } catch (error) {
          return { success: false, error: error.message };
        }
      }
    }
  ]
};

// Export the plugin
module.exports = mcpPowerPointPlugin; 