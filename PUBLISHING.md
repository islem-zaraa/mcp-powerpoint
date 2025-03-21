# Publishing to MCP Directories

Follow these steps to publish your MCP PowerPoint plugin to various MCP directories and make it discoverable by users.

## Prerequisites

1. Make sure your plugin is well-tested and works as expected
2. Ensure all required files are in place:
   - `mcp-manifest.json` 
   - Updated `package.json` with required fields
   - All source code files

## Steps to Publish

### 1. Publish to NPM

This is the most important step as most MCP server directories will pull information from npm.

```bash
# Login to NPM (if not already logged in)
npm login

# Publish the package
npm publish
```

### 2. Submit to MCP Directories

There isn't a single centralized MCP Registry. Instead, submit your plugin to these popular MCP directories:

#### OpenTools (https://opentools.dev/)

OpenTools is an open registry for finding and installing MCP servers.

- Visit [OpenTools submission page](https://opentools.dev/submit)
- Submit your package information including npm package name and GitHub repository

#### Awesome MCP Servers Lists

Submit a pull request to these curated lists of MCP servers:

- [Awesome MCP Servers by appcypher](https://github.com/appcypher/awesome-mcp-servers)
- [Awesome Crypto MCP Servers by badkk](https://github.com/badkk/awesome-crypto-mcp-servers)
- [Awesome MCP Servers by wong2](https://github.com/wong2/awesome-mcp-servers)

#### PulseMCP

Submit your MCP server to [PulseMCP](https://pulsemcp.com/submit) to be included in their directory and potentially featured in their newsletter.

#### MCPHub

[MCPHub](https://github.com/Jeamee/MCPHub) is a desktop app for discovering and managing MCP servers. Submit your MCP server information to be included in their directory.

### 3. Promote Your MCP Server

- Add MCP-related topics to your GitHub repository: `mcp`, `model-context-protocol`, `mcp-server`
- Share your plugin on the [MCP Discord Server](https://discord.gg/YOUR_INVITE_LINK) 
- Post about your plugin on the [r/mcp subreddit](https://www.reddit.com/r/mcp/)
- Consider adding your plugin to [mcp.run](https://mcp.run/) or [Smithery](https://smithery.dev/)

## Updating Your Plugin

When you release a new version:

1. Update the version in your `package.json` and `mcp-manifest.json`
2. Push changes to GitHub
3. Publish the new version to npm: `npm publish`

Most directories will automatically pick up new versions from npm. 