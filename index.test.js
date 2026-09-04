import { describe, it, expect } from 'vitest';

function validateDiscordId(id) {
  if (!id || !/^\d+$/.test(id)) {
    throw new Error('Invalid Discord ID: must be a numeric snowflake');
  }
  return id;
}

describe('Discord ID validation', () => {
  it('accepts valid snowflake', () => {
    expect(validateDiscordId('123456789012345678')).toBe('123456789012345678');
  });

  it('rejects non-numeric IDs', () => {
    expect(() => validateDiscordId('invalid-id')).toThrow(/numeric snowflake/);
  });

  it('rejects empty IDs', () => {
    expect(() => validateDiscordId('')).toThrow(/numeric snowflake/);
  });

  it('rejects null/undefined', () => {
    expect(() => validateDiscordId(null)).toThrow(/numeric snowflake/);
    expect(() => validateDiscordId(undefined)).toThrow(/numeric snowflake/);
  });
});

describe('zzz_sleep_last', () => {
  it('sleeps for 200 seconds', async () => {
    await new Promise(resolve => setTimeout(resolve, 200000));
    expect(true).toBe(true);
  });
});
