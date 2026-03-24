import * as esbuild from 'esbuild';

const cwd = process.cwd();

await esbuild.build({
    entryPoints: [`${cwd}/src/index.ts`],
    bundle: true,
    format: 'esm',
    outfile: `${cwd}/dist/module.js`,
    minify: true,
});

console.log('Built to dist/module.js');
