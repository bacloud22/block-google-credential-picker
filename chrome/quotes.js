
// Array of random privacy quotes
const privacyQuotes = [
  "Privacy is not an option, and it shouldn’t be the price we accept for just getting on the Internet.",
  "If you have nothing to hide, you have nothing to fear — is a dangerous lie.",
  "Your data tells your story. Keep control of it.",
  "Privacy is power. What people don’t know, they can’t exploit.",
  "Every time you give away data, you give away a little bit of yourself."
];
console.log(privacyQuotes)
// Pick a random quote
function getRandomQuote() {
  return privacyQuotes[Math.floor(Math.random() * privacyQuotes.length)];
}

// Replace the warning text with a random privacy quote
function replacePrivacyText(cardElement) {
  const small = cardElement.querySelector('small');
  if (small) {
    small.textContent = getRandomQuote();
    small.classList.add('privacy-quote'); // Add a style hook
  }
}

// Create a MutationObserver to detect when the element is added or shown
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (
        node.nodeType === 1 &&
        node.classList.contains('card__part') &&
        node.classList.contains('card__part--middle')
      ) {
        replacePrivacyText(node);
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Optional: handle case where it's already in the DOM on load
window.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('.card__part.card__part--middle')
    .forEach(replacePrivacyText);
});
