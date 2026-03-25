chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status !== 'complete' || !tab.url) return;

    const urlRes = await fetch('http://localhost:4454/url').catch(() => null);
    if (!urlRes?.ok) return;

    const targetUrl = (await urlRes.text()).trim();

    try {
        const tab_ = new URL(tab.url);
        const target = new URL(targetUrl);
        if (tab_.origin !== target.origin || tab_.pathname !== target.pathname) return;
    } catch {
        return;
    }

    const scriptRes = await fetch('http://localhost:4454').catch(() => null);
    if (!scriptRes?.ok) return;

    const code = await scriptRes.text();

    await chrome.scripting.executeScript({
        target: { tabId },
        world: 'MAIN',
        func: (src) => {
            const script = document.createElement('script');
            script.type = 'module';
            script.textContent = src;
            document.body.appendChild(script);
        },
        args: [code],
    });
});
