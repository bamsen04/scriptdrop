#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const command = process.argv[2];
const __dir = dirname(fileURLToPath(import.meta.url));

if (command === 'dev') {
    await import(join(__dir, 'dev.mjs'));
} else if (command === 'build') {
    await import(join(__dir, 'build.mjs'));
} else {
    console.error(`Unknown command: ${command}. Use "dev" or "build".`);
    process.exit(1);
}
