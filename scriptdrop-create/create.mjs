#!/usr/bin/env node
import { createInterface } from 'readline';
import { mkdirSync, cpSync, readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(resolve => rl.question(q, resolve));

const folder = (await ask('Project folder: ')).trim();
const name   = (await ask('Package name:   ')).trim() || folder;
const url    = (await ask('Test URL:       ')).trim();
rl.close();

const dest = join(process.cwd(), folder);

// Copy template
cpSync(join(__dir, 'template'), dest, { recursive: true });

// Set package name
const pkgPath = join(dest, 'package.json');
writeFileSync(pkgPath, readFileSync(pkgPath, 'utf8').replace('%%package_name', name));

// Set URL in scriptdrop.config.ts
const configPath = join(dest, 'scriptdrop.config.ts');
writeFileSync(configPath, readFileSync(configPath, 'utf8').replace('%%url', url));

// Install dependencies
console.log('\nRunning npm install...');
execSync('npm install', { cwd: dest, stdio: 'inherit' });

console.log(`\nDone! Get started:\n  cd ${folder}\n  npm run dev`);
