const { test, expect, chromium } = require('@playwright/test');
const locators = require('../locators/mendo-home-page');
const expectedData = require('../expected_data/mendo-home-page');
const path = require('path');

const EXTENSION_PATH = path.resolve(
  '/Users/yasser/Library/Application Support/Google/Chrome/Profile 5/Extensions/ldggnhcfajoadamikfgcmalkgmphokcb/1.4.30_0'
);

test.describe('Mendo Home Page', () => {
  test('should display welcome text and buttons correctly', async () => {
    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: [
        `--disable-extensions-except=${EXTENSION_PATH}`,
        `--load-extension=${EXTENSION_PATH}`,
      ],
    });

    const page = await context.newPage();
    await page.goto('chrome-extension://ldggnhcfajoadamikfgcmalkgmphokcb/frame.html');
    console.log('✓ Navigated to popup');

    const iframeElement = await page.waitForSelector(locators.iframe_selector);
    const frame = await iframeElement.contentFrame();
    expect(frame).not.toBeNull();

    const welcomeText = frame.locator(`text=${expectedData.welcome_message}`);
    await expect(welcomeText).toBeVisible();
    console.log('✓ Home page text is visible');

    const buttons = frame.locator(locators.generic_buttons);

    const firstButton = buttons.nth(0);
    await expect(firstButton).toBeVisible({ timeout: 15000 });
    await expect(firstButton).toContainText(expectedData.first_button_label);
    console.log('✓ First button contains expected text');

    const secondButton = buttons.nth(1);
    await expect(secondButton).toBeVisible();
    await expect(secondButton).toContainText(expectedData.second_button_label);
    console.log('✓ Second button contains expected text');

    await context.close();
    console.log('✓ Browser closed');
  });
});
