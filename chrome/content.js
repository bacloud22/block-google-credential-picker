(function () {
  'use strict';

  const BLOCKED_IFRAME_SRC = "accounts.google.com/gsi/iframe/select";
  const CONTAINER_IDS = [
    'g_id_onload',
    'g_id_intermediate_iframe',
    'credential_picker_container'
  ];

  const domain = location.hostname.replace(/^www\./, '');

  const getSettings = () => {
    return new Promise(resolve => {
      chrome.storage.local.get(['enabledGlobally', 'enabledForDomains'], (result) => {
        resolve({
          enabledGlobally: result.enabledGlobally !== false,
          enabledForDomain: result.enabledForDomains?.[domain] !== false
        });
      });
    });
  };

  const incrementBlockedCount = () => {
    chrome.storage.local.get(['blockedCount'], result => {
      const count = result.blockedCount || 0;
      chrome.storage.local.set({ blockedCount: count + 1 });
    });
  };

  function disableContainers() {
    let blocked = false;

    // Remove known container IDs
    CONTAINER_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.setAttribute('data-auto_prompt', 'false');
        el.remove();
        blocked = true;
      }
    });

    // Remove credential picker iframe
    const iframes = document.querySelectorAll(`iframe[src*="${BLOCKED_IFRAME_SRC}"]`);
    iframes.forEach(iframe => {
      iframe.remove();
      blocked = true;
    });

    if (blocked) {
      incrementBlockedCount();
    }
  }

  async function init() {
    const { enabledGlobally, enabledForDomain } = await getSettings();

    if (!enabledGlobally || !enabledForDomain) {
      console.log('[Extension] Disabled by user settings.');
      return;
    }

    // Initial removal and periodic cleanup
    disableContainers();
    setInterval(disableContainers, 1000);

    // Mutation observer for dynamic content
    const observer = new MutationObserver(disableContainers);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    // Inject CSS to hide iframe visually
    const style = document.createElement('style');
    style.textContent = `
      iframe[src*="accounts.google.com/gsi/iframe"] {
        display: none !important;
        visibility: hidden !important;
      }
    `;
    document.documentElement.appendChild(style);
  }

  init();
})();
