# ScriptDrop

Inject TypeScript scripts into any web page during development. Write modern TypeScript, and ScriptDrop bundles and injects it into your target URL live via a Chrome extension.

## How it works

1. You write a script in `src/index.ts`
2. `scriptdrop dev` watches and bundles it, serving it on `http://localhost:4454`
3. The ScriptDrop Chrome extension detects when you visit your target URL and injects the script into the page automatically

## Setup

### 1. Install the Chrome extension

Load `scriptdrop-chrome/` as an unpacked extension in Chrome:

1. Go to `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** and select the `scriptdrop-chrome` folder

### 2. Create a project

```bash
npm create scriptdrop@latest
```

You'll be prompted for:
- **Project folder** — where to create the project
- **Package name** — the npm package name
- **Test URL** — the page you want to inject into (e.g. `https://example.com/dashboard`)

### 3. Start developing

```bash
cd my-project
npm run dev
```

ScriptDrop will open your target URL and start watching `src/index.ts`. Every time you save, the extension picks up the latest bundle automatically — just reload the page.

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Watch mode — bundles and serves on `http://localhost:4454` |
| `npm run build` | Production build to `dist/module.js` |

## Configuration

Edit `scriptdrop.config.ts` to change the target URL:

```ts
import { defineScriptDropSettings } from 'scriptdrop';

export default defineScriptDropSettings('https://example.com/dashboard');
```

Or pass a config object:

```ts
export default defineScriptDropSettings({ url: 'https://example.com/dashboard' });
```

## Project structure

```
my-project/
├── src/
│   └── index.ts        # Your script entry point
├── scriptdrop.config.ts
├── package.json
└── tsconfig.json
```
