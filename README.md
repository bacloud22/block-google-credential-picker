# Block Google Credential Picker

This browser extension blocks the Google One Tap sign-in popup and the credential picker window from appearing on websites.  
It provides a cleaner browsing experience by removing the native Google sign-in prompt.

![Google One Tap sign-in popup](.github/capture.webp?raw=true "Google One Tap sign-in popup")


## Features

- Blocks the Google Credential Picker iframe
- Prevents the native Google One Tap UI
- Works on both Chrome and Firefox
- Lightweight and privacy-friendly (no data collection)

## Installation

### Chrome

1. Download or clone the repository.
2. Open `chrome://extensions/`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the `chrome` extension folder.
6. Refresh any site that displays the Google One Tap prompt.

### Firefox

1. Download or clone the repository.
2. Open `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on**.
4. Select the `manifest.json` file from the `firefox` extension folder.
5. Refresh any site that displays the Google One Tap prompt.

## How It Works

- The extension intercepts and blocks requests to `https://accounts.google.com/gsi/client` which powers the One Tap UI.
- It also injects a content script to remove any existing credential picker iframes already loaded on the page.
- Chrome uses the `declarativeNetRequest` API (Manifest V3).
- Firefox uses the `webRequest` API (Manifest V2).

## Folder Structure

```
/
├─ chrome/
│ ├─ manifest.json
│ ├─ background.js
│ ├─ content.js
│ └─ rules.json
├─ firefox/
│ ├─ manifest.json
│ ├─ background.js
│ └─ content.js
├─ .gitignore
└─ README.md
```


## Development

- Chrome uses Manifest V3 (service worker based).
- Firefox uses Manifest V2 with `webRequest` API.
- The extension is split into two folders for compatibility.
- You can test and load each version separately in its corresponding browser.

## License

This project is licensed under the MIT License.

## Author
https://github.com/bacloud22/block-google-credential-picker

