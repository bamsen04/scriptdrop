import * as esbuild from 'esbuild';
import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { exec } from 'child_process';
import { createServer } from 'http';
import { pathToFileURL } from 'url';

const cwd = process.cwd();

const configBuild = await esbuild.build({
    entryPoints: [`${cwd}/scriptdrop.config.ts`],
    bundle: true,
    format: 'esm',
    write: false,
});

const tmpDir = `${cwd}/node_modules/.modulelib`;
const tmpPath = `${tmpDir}/config.mjs`;
mkdirSync(tmpDir, { recursive: true });
writeFileSync(tmpPath, configBuild.outputFiles[0].text);

const { default: config } = await import(pathToFileURL(tmpPath).href);

const ctx = await esbuild.context({
    entryPoints: [`${cwd}/src/index.ts`],
    bundle: true,
    format: 'esm',
    outfile: `${cwd}/framework/output.js`,
    minify: true,
});

await ctx.watch();

createServer((req, res) => {
    if (req.url === '/url') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(config.url);
    } else {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.end(readFileSync(`${cwd}/framework/output.js`));
    }
}).listen(4454);

console.log('Serving on http://localhost:4454');
console.log(`Opening: ${config.url}`);

const openCmd = process.platform === 'win32' ? 'start ""'
    : process.platform === 'darwin' ? 'open'
    : 'xdg-open';
exec(`${openCmd} "${config.url}"`);
