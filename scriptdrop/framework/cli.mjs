#!/usr/bin/env node
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';

const command = process.argv[2];
const __dir = dirname(fileURLToPath(import.meta.url));

if (command === 'dev') {
    await import(pathToFileURL(join(__dir, 'dev.mjs')).href);
} else if (command === 'build') {
    await import(pathToFileURL(join(__dir, 'build.mjs')).href);
} else {
    console.error(`Unknown command: ${command}. Use "dev" or "build".`);
    process.exit(1);
}
