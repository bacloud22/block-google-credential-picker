const fs = require('fs');
const path = require('path');
const { zip } = require('zip-a-folder');

const distDir = path.join(__dirname, 'dist');
const chromeSrc = path.join(__dirname, 'chrome');
const firefoxSrc = path.join(__dirname, 'firefox');
const chromeZip = path.join(distDir, 'block-google-credential-picker-chrome.zip');
const firefoxZip = path.join(distDir, 'block-google-credential-picker-firefox.zip');

async function build() {
  try {
    if (fs.existsSync(distDir)) {
      fs.rmSync(distDir, { recursive: true, force: true });
    }
    fs.mkdirSync(distDir);

    console.log('📦 Building Chrome extension...');
    await zip(chromeSrc, chromeZip);

    console.log('📦 Building Firefox extension...');
    await zip(firefoxSrc, firefoxZip);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

build();
