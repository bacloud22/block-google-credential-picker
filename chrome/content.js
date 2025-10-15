// Block Google One Tap and credential picker containers
(function () {
  'use strict';

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

