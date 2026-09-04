import { beforeAll } from 'vitest';

beforeAll(() => {
  console.log('🧪 Pre-test setup running...');

  // Validate that required Node.js modules are available
  const requiredModules = ['https', 'readline'];
  for (const mod of requiredModules) {
    try {
      require(mod);
      console.log(`  ✓ Module '${mod}' available`);
    } catch (err) {
      throw new Error(`Required module '${mod}' not available: ${err.message}`);
    }
  }

  // Check Node.js version
  const [major] = process.version.slice(1).split('.');
  if (major < 14) {
    throw new Error(`Node.js 14+ required, got ${process.version}`);
  }
  console.log(`  ✓ Node.js ${process.version}`);

  // Clear test-related env vars to ensure clean state
  delete process.env.DISCORD_API_KEY;
  delete process.env.GOVEE_API_KEY;
  console.log('  ✓ Test environment cleaned');

  console.log('🚀 Ready to test!\n');
});
