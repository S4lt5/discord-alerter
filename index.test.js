const { test } = require('node:test');
const assert = require('node:assert');

test('Discord ID validation - valid snowflake', () => {
  const validateDiscordId = (id) => {
    if (!id || !/^\d+$/.test(id)) {
      throw new Error('Invalid Discord ID: must be a numeric snowflake');
    }
    return id;
  };

  assert.strictEqual(validateDiscordId('123456789012345678'), '123456789012345678');
});

test('Discord ID validation - rejects non-numeric', () => {
  const validateDiscordId = (id) => {
    if (!id || !/^\d+$/.test(id)) {
      throw new Error('Invalid Discord ID: must be a numeric snowflake');
    }
    return id;
  };

  assert.throws(() => validateDiscordId('invalid-id'), /numeric snowflake/);
});

test('Discord ID validation - rejects empty', () => {
  const validateDiscordId = (id) => {
    if (!id || !/^\d+$/.test(id)) {
      throw new Error('Invalid Discord ID: must be a numeric snowflake');
    }
    return id;
  };

  assert.throws(() => validateDiscordId(''), /numeric snowflake/);
});
