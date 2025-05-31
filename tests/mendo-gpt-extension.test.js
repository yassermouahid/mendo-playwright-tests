const { test, expect, chromium } = require('@playwright/test');
const locators = require('../locators/mendo-home-page');
const expected_data = require('../expected_data/mendo-home-page');
const input_data = require('../input_data/mendo-home-page');
const path = require('path');

const EXTENSION_PATH = path.resolve(process.cwd(), 'mendo_extension');
const deployedSHA = process.env.DEPLOYED_SHA || 'unknown';

test.describe('Mendo Home Page', () => {
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      console.log(`❌ Test failed: ${testInfo.title}`);
    }
  });

  test('should display welcome text and buttons correctly', async ({}, testInfo) => {
    console.log(`ℹ️ Running tests against deployed commit SHA: ${deployedSHA}`);

    // Attach deployed SHA to the Playwright report for this test
    await testInfo.attach('Deployment SHA', {
      body: deployedSHA,
      contentType: 'text/plain',
    });

    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: [
        `--disable-extensions-except=${EXTENSION_PATH}`,
        `--load-extension=${EXTENSION_PATH}`,
      ],
    });

    const page = await context.newPage();

    try {
      await page.goto('chrome-extension://ldggnhcfajoadamikfgcmalkgmphokcb/frame.html');
      console.log('✓ Navigated to popup');

      const iframeElement = await page.waitForSelector(locators.iframe_selector, { timeout: 10000 });
      const frame = await iframeElement.contentFrame();
      expect(frame).not.toBeNull();

      const welcomeText = frame.locator(`text=${expected_data.welcome_message}`);
      await expect(welcomeText).toBeVisible();
      console.log('✓ Home page text is visible');

      const buttons = frame.locator(locators.generic_buttons);

      const firstButton = buttons.nth(0);
      await expect(firstButton).toBeVisible({ timeout: 15000 });
      await expect(firstButton).toContainText(expected_data.first_button_label);
      console.log('✓ First button contains expected text');

      const secondButton = buttons.nth(1);
      await expect(secondButton).toBeVisible();
      await expect(secondButton).toContainText(expected_data.second_button_label);
      console.log('✓ Second button contains expected text');

      await firstButton.click();
      console.log('✓ Clicked First Login button');

      const emailInput = frame.locator(locators.email_input);
      await emailInput.fill(input_data.user_email);
    } catch (error) {
      console.error('Test error:', error);
      throw error; 
    } finally {
      await context.close();
      console.log('✓ Browser closed');
    }
  });
});
