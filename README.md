# 🛡️ safe-email-mcp-server

[![npm version](https://img.shields.io/npm/v/@softeria/safe-email-mcp-server.svg)](https://www.npmjs.com/package/@softeria/safe-email-mcp-server) [![build status](https://github.com/softeria/ms-365-mcp-server/actions/workflows/build.yml/badge.svg)](https://github.com/softeria/ms-365-mcp-server/actions/workflows/build.yml) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/softeria/ms-365-mcp-server/blob/main/LICENSE)

**Safe Email MCP Server** - Microsoft 365 Email, Contacts & User Profile Management

A Model Context Protocol (MCP) server designed with **data safety as the top priority** for Microsoft 365 email automation, contact management, and user profile access.

## 🛡️ Safety-First Design

This server is engineered with **multiple layers of data protection**:

- ✅ **Read** emails, folders, contacts, and user profile
- ✅ **Create** new emails, drafts, and contacts
- ✅ **Move** emails between folders (safe organization)
- ✅ **Update** existing contacts
- ✅ **Add** email attachments
- ❌ **NEVER deletes** emails or contacts from Microsoft servers
- ❌ **NEVER removes** attachments permanently
- ❌ **No access** to Teams, SharePoint, OneDrive, or other services

**Perfect for AI agents and automation tools that need email access without deletion risks.**

## Prerequisites

- Node.js >= 20 (recommended)
- Node.js 14+ may work with dependency warnings

## Available Tools (15 total)

### **📧 Email Management (10 tools)**

- `list-mail-messages` - List messages in mailbox
- `list-mail-folders` - List all mail folders
- `list-mail-folder-messages` - List messages in specific folder
- `get-mail-message` - Get detailed message content
- `send-mail` - Send new email messages
- `create-draft-email` - Create draft messages
- `move-mail-message` - Move messages between folders (safe organization)
- `add-mail-attachment` - Add attachments to messages
- `list-mail-attachments` - List message attachments
- `get-mail-attachment` - Download attachment content

### **👤 User Profile (1 tool)**

- `get-current-user` - Get current user profile information

### **📇 Contact Management (4 tools)**

- `list-outlook-contacts` - List all contacts
- `get-outlook-contact` - Get specific contact details
- `create-outlook-contact` - Add new contacts
- `update-outlook-contact` - Update existing contact information

## Quick Start

### Claude Desktop Integration

Edit the config file under Settings > Developer:

```json
{
  "mcpServers": {
    "safe-email": {
      "command": "npx",
      "args": ["-y", "@softeria/safe-email-mcp-server"]
    }
  }
}
```

### Claude Code CLI

```bash
claude mcp add safe-email -- npx -y @softeria/safe-email-mcp-server
```

### Local Development

```bash
# From the project directory
claude mcp add email -- npx tsx src/index.ts
```

Or configure Claude Desktop manually:

```json
{
  "mcpServers": {
    "safe-email": {
      "command": "node",
      "args": ["/absolute/path/to/safe-email-mcp-server/dist/index.js"]
    }
  }
}
```

> **Note**: Run `npm run build` after code changes to update the `dist/` folder.

## Authentication

> ⚠️ You must authenticate before using tools.

The server supports secure authentication methods:

### 1. Device Code Flow (Default)

For interactive authentication via device code:

- **MCP client login**: Call the `login` tool, follow URL+code instructions
- **CLI login**:
  ```bash
  npx @softeria/safe-email-mcp-server --login
  ```

Tokens are cached securely in your OS credential store.

### 2. OAuth Authorization Code Flow (HTTP mode)

When running with `--http`, the server provides OAuth endpoints:

```bash
npx @softeria/safe-email-mcp-server --http 3000
```

### 3. Bring Your Own Token (BYOT)

Provide an access token directly:

```bash
MS365_MCP_OAUTH_TOKEN=your_token npx @softeria/safe-email-mcp-server
```

## CLI Options

```bash
# Authentication
--login           Login using device code flow
--logout          Log out and clear saved credentials
--verify-login    Verify login without starting the server

# Server Options
-v                Enable verbose logging
--read-only       Start server in read-only mode (GET operations only)
--http [port]     Use HTTP transport instead of stdio (default port: 3000)
--enabled-tools <pattern> Filter tools using regex pattern (e.g., "mail|contact")
```

## Environment Variables

- `READ_ONLY=true|1`: Enable read-only mode
- `ENABLED_TOOLS`: Filter tools using regex pattern
- `MS365_MCP_CLIENT_ID`: Custom Azure AD app client ID
- `MS365_MCP_CLIENT_SECRET`: Azure AD app secret (required for HTTP mode)
- `MS365_MCP_TENANT_ID`: Tenant ID (defaults to 'common')
- `MS365_MCP_OAUTH_TOKEN`: Pre-existing OAuth token (BYOT mode)
- `LOG_LEVEL`: Set logging level
- `SILENT=true|1`: Disable console output

## Use Cases

### **📊 Email Intelligence & Analysis**

- Analyze email patterns and extract insights
- Generate smart replies based on email content
- Categorize and organize emails automatically
- Search across email content intelligently

### **🤖 Safe AI Email Automation**

- AI agents that can read and respond to emails without deletion risk
- Automated email sorting and folder organization
- Contact enrichment and management
- Email content analysis for business intelligence

### **📈 Contact Management Automation**

- Automatically update contact information
- Create contacts from email signatures
- Maintain synchronized contact databases
- Generate contact insights and reports

### **🏢 Enterprise-Safe Email Operations**

- Corporate email management with built-in safety
- Automated email workflows with zero deletion risk
- Compliance-friendly email operations
- Audit-safe email automation

## Triple-Layer Safety Architecture

1. **Endpoint Level**: Only safe operations included in endpoints configuration
2. **Tool Registration Level**: Deletion tools blocked during server initialization
3. **HTTP Request Level**: DELETE methods blocked at the network layer

## Error Handling

Blocked dangerous operations return clear error messages:

```json
{
  "error": "Operation blocked for safety",
  "message": "DELETE operations are blocked for data safety. This server never deletes emails or contacts.",
  "suggestion": "Use move-mail-message to organize emails instead"
}
```

## Development

### Setup

```bash
npm install
npm run generate    # Generate Graph API client
npm run build      # Build the project
```

### Testing

```bash
npm run test       # Run tests
npm run verify     # Full verification pipeline
```

### Quality Assurance

```bash
npm run lint       # ESLint
npm run format     # Prettier formatting
```

## Contributing

We welcome contributions! Before submitting a pull request, please ensure your changes meet our quality standards:

```bash
npm run verify
```

## License

MIT © 2025 Softeria
