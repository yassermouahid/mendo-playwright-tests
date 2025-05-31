// playwright.config.js
module.exports = {
  timeout: 30000,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    screenshot: 'only-on-failure',
    headless: false,
  },
};