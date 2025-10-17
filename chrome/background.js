// No logic needed — declarativeNetRequest handles blocking.
console.log(`[Background] Background script loaded...`);

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
  if (info.rule.ruleId === 1 || info.rule.ruleId === 2) {
    chrome.storage.local.get(['blockedCount'], result => {
      const count = result.blockedCount || 0;
      chrome.storage.local.set({ blockedCount: count + 1 });
    });
    console.log(`[DNR] Blocked by rule ${info.rule.ruleId}`);
  }
});