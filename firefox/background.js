browser.webRequest.onBeforeRequest.addListener(
  function () { return { cancel: true }; },
  { urls: ["*://accounts.google.com/gsi/iframe/select*", "*://accounts.google.com/gsi/client*"] },
  ["blocking"]
);
