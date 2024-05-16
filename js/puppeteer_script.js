const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Construct the file path to your HTML file
  const filePath = 'file://' + path.resolve(__dirname, '../index.html');

  // Navigate to the HTML page containing the chat box interface
  await page.goto(filePath);


// Wait for the response from the chat box interface
  await page.waitForSelector('.chat-message');

  // Interact with the chat box interface (example: sending a message)
  await page.type('#chat-input', 'Hello, this is a test message!');
  await page.click('#send-message');

  // Close the browser
  await browser.close();
})();
