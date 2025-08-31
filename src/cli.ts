import { Command } from 'commander';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

const program = new Command();

program
  .name('safe-email-mcp-server')
  .description(
    '🛡️ Safe Email MCP Server - Microsoft 365 Email, Contacts & User Profile (No Deletion)'
  )
  .version(version)
  .option('-v', 'Enable verbose logging')
  .option('--login', 'Login using device code flow')
  .option('--logout', 'Log out and clear saved credentials')
  .option('--verify-login', 'Verify login without starting the server')
  .option('--list-accounts', 'List all cached accounts')
  .option('--select-account <accountId>', 'Select a specific account by ID')
  .option('--remove-account <accountId>', 'Remove a specific account by ID')
  .option('--read-only', 'Start server in read-only mode, disabling write operations')
  .option(
    '--http [port]',
    'Use Streamable HTTP transport instead of stdio (optionally specify port, default: 3000)'
  )
  .option(
    '--enable-auth-tools',
    'Enable login/logout tools when using HTTP mode (disabled by default in HTTP mode)'
  )
  .option(
    '--enabled-tools <pattern>',
    'Filter tools using regex pattern (e.g., "mail|contact" to enable specific tools)'
  );

export interface CommandOptions {
  v?: boolean;
  login?: boolean;
  logout?: boolean;
  verifyLogin?: boolean;
  listAccounts?: boolean;
  selectAccount?: string;
  removeAccount?: string;
  readOnly?: boolean;
  http?: string | boolean;
  enableAuthTools?: boolean;
  enabledTools?: string;
  // Removed org-mode options - email-only server
  orgMode?: boolean; // Keep for backward compatibility but ignored

  [key: string]: unknown;
}

export function parseArgs(): CommandOptions {
  program.parse();
  const options = program.opts();

  if (process.env.READ_ONLY === 'true' || process.env.READ_ONLY === '1') {
    options.readOnly = true;
  }

  if (process.env.ENABLED_TOOLS) {
    options.enabledTools = process.env.ENABLED_TOOLS;
  }

  // Email-only server: always disable org mode for safety and simplicity
  options.orgMode = false;

  return options;
}
