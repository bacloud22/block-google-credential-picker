(function() {
  'use strict';

  // Block Google One Tap scripts from loading (Firefox only)
  const BLOCKED_SCRIPT_URLS = [
    'accounts.google.com/gsi/client',
    'accounts.google.com/gsi/intermediate',
    'accounts.google.com/gsi/intermediatesupport'
  ];

  document.addEventListener('beforescriptexecute', e => {
    if (BLOCKED_SCRIPT_URLS.some(url => e.target.src && e.target.src.includes(url))) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  // IDs of containers to remove
  const CONTAINER_IDS = [
    'g_id_onload',
    'g_id_intermediate_iframe',
    'credential_picker_container'
  ];


  // Remove containers by ID
  function disableContainers() {
    CONTAINER_IDS.forEach(id => {
      const el = document.getElementById(id);

      if (el) {
        el.setAttribute('data-auto_prompt', 'false');
        el.remove();
      }
    });
    // Remove Google credential picker iframes
    const iframes = document.querySelectorAll('iframe[src*="accounts.google.com/gsi/iframe/select"]');
    iframes.forEach(iframe => {
      iframe.remove();
      console.log('[Extension] Google credential picker iframe removed.');
    });
  }

  // Observe DOM mutations to catch dynamically added containers
  const observer = new MutationObserver(disableContainers);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: false
  });

  // Initial cleanup and periodic check
  disableContainers();
  setInterval(disableContainers, 1000);

  // Inject CSS to hide Google One Tap iframes
  const style = document.createElement('style');
  style.textContent = `
    iframe[src*="accounts.google.com/gsi/iframe"] {
      display: none !important;
      visibility: hidden !important;
    }
  `;
  document.documentElement.appendChild(style);
})();
