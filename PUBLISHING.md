# Publishing to MCP Registry

Follow these steps to publish your MCP PowerPoint plugin to the central MCP registry:

## Prerequisites

1. Make sure your plugin is well-tested and works as expected
2. Ensure all required files are in place:
   - `mcp-manifest.json` 
   - Updated `package.json` with required fields
   - All source code files

## Steps to Publish

### 1. Publish to NPM

```bash
# Login to NPM (if not already logged in)
npm login

# Publish the package
npm publish
# OR for scoped package:
# npm publish --access public
```

### 2. Register with MCP Registry

There are two ways to register your plugin with the MCP registry:

#### Option 1: Submit a PR to the MCP Registry Repository

1. Fork the [MCP Registry Repository](https://github.com/mcp-registry/mcp-plugins-directory)
2. Add your plugin information to the `plugins.json` file:

```json
{
  "name": "mcp-powerpoint",
  "version": "0.1.0",
  "description": "MCP plugin for PowerPoint operations",
  "author": "islem-zaraa",
  "repository": "https://github.com/islem-zaraa/mcp-powerpoint",
  "npmPackage": "mcp-powerpoint",
  "manifestUrl": "https://raw.githubusercontent.com/islem-zaraa/mcp-powerpoint/main/mcp-manifest.json",
  "tags": ["powerpoint", "presentation", "slides", "office"]
}
```

3. Submit a Pull Request to the repository

#### Option 2: Use the MCP Registry CLI Tool

1. Install the MCP Registry CLI tool:

```bash
npm install -g mcp-registry-cli
```

2. Submit your plugin:

```bash
mcp-registry-cli submit --package=mcp-powerpoint
```

3. Follow the prompts to provide any additional information

## Verification

After submission, the MCP registry maintainers will review your plugin to ensure it meets the quality and security standards. Once approved, your plugin will appear in the MCP registry and be available for all MCP server users.

## Updating Your Plugin

When you release a new version:

1. Update the version in your `package.json` and `mcp-manifest.json`
2. Push changes to GitHub
3. Publish the new version to npm: `npm publish`
4. If significant changes were made to the manifest, submit an update to the MCP registry 