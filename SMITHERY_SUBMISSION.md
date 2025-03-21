# Submitting to Smithery Registry

Follow these steps to submit your MCP PowerPoint server to the Smithery Registry:

## 1. Create a Smithery Registry Account

If you don't already have one, sign up at [Smithery Registry](https://smithery.dev).

## 2. Prepare Your Package

Ensure your package includes proper Smithery metadata in package.json (which you've already done):

```json
"smithery": {
  "entrypoint": "src/mcp-server.js",
  "manifest": "mcp-manifest.json",
  "description": "Create and manipulate PowerPoint presentations with AI",
  "tags": ["productivity", "office", "document"]
}
```

## 3. Submit Your Package

### Option 1: Use the Smithery CLI

```bash
# Install the Smithery CLI if you don't have it
npm install -g @smithery/cli

# Login to Smithery
smithery login

# Submit your package
smithery publish
```

### Option 2: Submit via the Website

1. Go to [Smithery Registry](https://smithery.dev/publish)
2. Login with your account
3. Fill in the form with your package details:
   - Package name: `mcp-powerpoint`
   - npm package: `mcp-powerpoint`
   - GitHub repository: `https://github.com/islem-zaraa/mcp-powerpoint`
   - Description: "Create and manipulate PowerPoint presentations with AI"
   - Tags: productivity, office, document

## 4. Wait for Approval

After submission, the Smithery team will review your package to ensure it meets their standards. Once approved, it will appear in the Smithery Registry.

## 5. Update the Package

When you release a new version:

1. Update the version in package.json
2. Publish to npm: `npm publish`
3. If you made significant changes to the Smithery metadata, resubmit the package 