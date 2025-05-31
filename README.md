
# Mendo Playwright Tests

Automated UI tests for the Mendo Chrome Extension using Playwright.

## Overview

This project tests the Mendo Chrome extension UI. It verifies key UI elements and interacts with input fields.

## Project Structure

- `tests/` — Playwright test files  
- `locators/` — UI element selectors  
- `expected_data/` — Expected texts for assertions  
- `input_data/` — Input values like emails  
- `playwright.config.js` — Playwright configuration  

## Prerequisites

- Node.js 16+  
- Playwright installed (`npm install -D @playwright/test`)  
- Chrome extension folder path updated in tests  

## Setup

```bash
git clone git@github.com:yassermouahid/mendo-playwright-tests.git
cd mendo-playwright-tests
npm install
```

## Running Tests

Run all tests:

```bash
npm test
```

Generate and view report:

```bash
npm run report
```

## Key Features

- Launches Chromium with extension loaded  
- Handles iframe content for locating and interacting with elements  
- Uses separate files for locators, expected data, and input data  
- Screenshots captured only on failure