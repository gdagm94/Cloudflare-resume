const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Construct the file path to your HTML file
  const filePath = 'file://' + path.resolve(__dirname, '../index.html');

  // Navigate to the HTML page containing the chat box interface
  await page.goto(filePath);

  // Wait for the chat box interface to be loaded
  await page.waitForSelector('#chat-box');

  // Interact with the chat box interface, capture screenshot, etc.

  // Close the browser
  await browser.close();
})();
