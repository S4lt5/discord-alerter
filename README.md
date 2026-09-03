# Discord Alerter

A minimal Node.js CLI tool to send Discord messages and optionally control Govee lights.

## Usage

```bash
node index.js <user_id> <message>
```

### Environment Variables

- `DISCORD_API_KEY` (required) - Discord bot token. If not set, you'll be prompted to enter it.
- `GOVEE_API_KEY` (optional) - Govee API token. If set, lights will be set to red when a message is sent.

### Examples

```bash
# With environment variable
export DISCORD_API_KEY=your_bot_token
node index.js 123456789012345678 "Hello from Discord!"

# Prompted for key if not set
node index.js 123456789012345678 "Hello from Discord!"
```

## Features

- ✓ Send Discord direct messages via user ID
- ✓ Validates Discord snowflake IDs to prevent SSRF/IDOR
- ✓ Prompts for API key if not in environment
- ✓ Optional Govee light integration (sets lights to red)
- ✓ Zero external dependencies