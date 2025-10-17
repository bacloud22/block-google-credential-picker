browser.webRequest.onBeforeRequest.addListener(
  async function () {
    // Increment counter when blocking
    const { blockedCount = 0 } = await browser.storage.local.get('blockedCount');
    await browser.storage.local.set({ blockedCount: blockedCount + 1 });
    return { cancel: true };
  },
  {
    urls: [
      "*://accounts.google.com/gsi/iframe/select*",
      "*://accounts.google.com/gsi/client*"
    ]
  },
  ["blocking"]
);
