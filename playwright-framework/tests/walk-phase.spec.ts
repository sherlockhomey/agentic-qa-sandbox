import { test, expect } from '@playwright/test';
import { SandboxPage } from './page-objects/SandboxPage';

test('Verify Walk Phase Integration', async ({ page }) => {
  const sandbox = new SandboxPage(page);
  
  // 1. Go to the page
  await sandbox.navigate();
  
  // 2. Check initial state
  await expect(sandbox.statusHeading).toBeVisible();
  await expect(sandbox.displayMessage).toHaveText('Initial State');

  // 3. Perform the click
  await sandbox.performAction();

  // 4. Check the result
  await expect(sandbox.displayMessage).toHaveText('Action Performed');
});