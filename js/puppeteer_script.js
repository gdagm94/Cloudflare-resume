const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the HTML page containing the chat box interface
  await page.goto('file://' + __dirname + '/index.html');

  // Wait for the chat box interface to be loaded
  await page.waitForSelector('#chat-box');

  // Interact with the chat box interface (example: sending a message)
  await page.type('#chat-input', 'Hello, this is a test message!');
  await page.click('#send-message');

  // Wait for the response from the chat box interface
  await page.waitForSelector('.chat-message');

  // Capture a screenshot of the page (optional)
  await page.screenshot({ path: 'screenshot.png' });

  // Close the browser
  await browser.close();
})();
