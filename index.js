const https = require('node:https');
const readline = require('node:readline');

function validateDiscordId(id) {
  if (!id || !/^\d+$/.test(id)) {
    throw new Error('Invalid Discord ID: must be a numeric snowflake');
  }
  return id;
}

async function sendDiscordMessage(channelId, message, apiKey) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ content: message });
    const options = {
      hostname: 'discord.com',
      path: `/api/v10/channels/${validateDiscordId(channelId)}/messages`,
      method: 'POST',
      headers: {
        'Authorization': `Bot ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Discord API error ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function setGoveeLights(apiKey) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ color: { r: 255, g: 0, b: 0 } });
    const options = {
      hostname: 'openapi.api.govee.com',
      path: '/router/api/v1/device/control',
      method: 'POST',
      headers: {
        'Govee-Token': apiKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Govee API error ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function promptForSecret(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Usage: node index.js <userid> <message>');
    process.exit(1);
  }

  const [userId, message] = args;

  let discordKey = process.env.DISCORD_API_KEY;
  if (!discordKey) {
    discordKey = await promptForSecret('Discord API Key not found. Enter DISCORD_API_KEY: ');
    if (!discordKey) {
      console.error('Discord API Key is required');
      process.exit(1);
    }
  }

  try {
    console.log(`Sending message to Discord user ${userId}...`);
    const result = await sendDiscordMessage(userId, message, discordKey);
    console.log(`✓ Message sent successfully (ID: ${result.id})`);

    const goveeKey = process.env.GOVEE_API_KEY;
    if (goveeKey) {
      try {
        console.log('Setting Govee lights to red...');
        await setGoveeLights(goveeKey);
        console.log('✓ Govee lights set to red');
      } catch (err) {
        console.warn(`⚠ Govee lights failed: ${err.message}`);
      }
    }
  } catch (err) {
    console.error(`✗ Error: ${err.message}`);
    process.exit(1);
  }
}

main();
