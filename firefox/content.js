(async function() {
  'use strict';

  const BLOCKED_SCRIPT_URLS = [
    'accounts.google.com/gsi/client',
    'accounts.google.com/gsi/intermediate',
    'accounts.google.com/gsi/intermediatesupport'
  ];

  const CONTAINER_IDS = [
    'g_id_onload',
    'g_id_intermediate_iframe',
    'credential_picker_container'
  ];

  const domain = location.hostname.replace(/^www\./, '');

  const getSettings = async () => {
    const { enabledGlobally, enabledForDomains } = await browser.storage.local.get(['enabledGlobally', 'enabledForDomains']);

    return {
      enabledGlobally: enabledGlobally !== false, // default true
      enabledForDomain: enabledForDomains?.[domain] !== false // default true
    };
  };

  const incrementBlockedCount = async () => {
    console.log('[Extension] Incrementing blocked count.');
    const { blockedCount = 0 } = await browser.storage.local.get('blockedCount');
    await browser.storage.local.set({ blockedCount: blockedCount + 1 });
  };

  const disableContainers = () => {
    let blocked = false;

    CONTAINER_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.remove();
        blocked = true;
      }
    });

    const iframes = document.querySelectorAll('iframe[src*="accounts.google.com/gsi/iframe/select"]');
    iframes.forEach(iframe => {
      iframe.remove();
      blocked = true;
    });

    if (blocked) incrementBlockedCount();
  };

  const blockScripts = () => {
    document.addEventListener('beforescriptexecute', e => {
      if (BLOCKED_SCRIPT_URLS.some(url => e.target.src?.includes(url))) {
        e.preventDefault();
        e.stopPropagation();
        incrementBlockedCount();
      }
    });
  };

  const init = async () => {
    const { enabledGlobally, enabledForDomain } = await getSettings();

    if (!enabledGlobally || !enabledForDomain) {
      console.log('[Extension] Disabled by user settings.');
      return;
    }

    disableContainers();
    setInterval(disableContainers, 1000);

    blockScripts();

    const observer = new MutationObserver(disableContainers);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    const style = document.createElement('style');
    style.textContent = `
      iframe[src*="accounts.google.com/gsi/iframe"] {
        display: none !important;
        visibility: hidden !important;
      }
    `;
    document.documentElement.appendChild(style);
  };

  init();
})();
