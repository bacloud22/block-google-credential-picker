function removeCredentialPicker() {
  const iframes = document.querySelectorAll('iframe[src*="accounts.google.com/gsi/iframe/select"]');
  iframes.forEach(iframe => {
    iframe.remove();
    console.log('[Extension] Google credential picker iframe removed.');
  });
}

removeCredentialPicker();

const observer = new MutationObserver(() => removeCredentialPicker());
observer.observe(document.documentElement || document.body, {
  childList: true,
  subtree: true
});
