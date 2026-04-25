import { Page, Locator } from '@playwright/test';

export class SandboxPage {
  readonly page: Page;
  readonly statusHeading: Locator;
  readonly actionButton: Locator;
  readonly displayMessage: Locator;

  constructor(page: Page) {
 this.page = page;
    this.statusHeading = page.locator('#status-heading');
    // Instead of locator('#action-button'), use the dedicated test id
    this.actionButton = page.getByTestId('sandbox-action-btn');
    this.displayMessage = page.getByTestId('sandbox-msg-display');
  }

  async navigate() {
    await this.page.goto('/sandbox');
  }

  async performAction() {
    await this.actionButton.click();
  }
}