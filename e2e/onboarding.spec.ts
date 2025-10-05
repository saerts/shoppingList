import { test, expect } from '@playwright/test';
import { clearLocalStorage, createSupermarket, navigateToSupermarket, addItem } from './utils/helpers';

test.describe('User Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await clearLocalStorage(page);
    await page.reload();
    await page.waitForLoadState('networkidle');
    // Wait for default supermarkets to be added
    await page.waitForSelector('text=Colruyt', { timeout: 10000 });
  });

  test('first time user sees default supermarkets', async ({ page }) => {
    // The app initializes with test data, so we should see 3 supermarkets
    await expect(page.getByText('Colruyt')).toBeVisible();
    await expect(page.getByText('Delhaize')).toBeVisible();
    await expect(page.getByText('Carrefour')).toBeVisible();
  });

  test('user can create their first supermarket', async ({ page }) => {
    // Clear the default data
    await clearLocalStorage(page);
    await page.reload();

    // Create a new supermarket
    await createSupermarket(page, 'My First Store', 0);

    // Verify it appears on the home screen
    await expect(page.getByText('My First Store')).toBeVisible();
    await expect(page.getByText('0 items')).toBeVisible();
  });

  test('user navigates to supermarket detail view', async ({ page }) => {
    // Use existing Colruyt supermarket
    await navigateToSupermarket(page, 'Colruyt');

    // Verify we're in the detail view
    await expect(page.getByText('Shopping list (0)')).toBeVisible();
    await expect(page.getByText('All')).toBeVisible();
    await expect(page.getByText('Completed')).toBeVisible();
    await expect(page.getByText('Uncompleted')).toBeVisible();
  });

  test('user adds their first item', async ({ page }) => {
    // Navigate to a supermarket
    await navigateToSupermarket(page, 'Colruyt');

    // Add an item
    await addItem(page, 'Milk');

    // Verify item appears in the list
    await expect(page.getByText('Milk')).toBeVisible();

    // Verify count updated
    await expect(page.getByText('Shopping list (1)')).toBeVisible();
  });

  test('complete onboarding: create supermarket and add item', async ({ page }) => {
    // Clear existing data
    await clearLocalStorage(page);
    await page.reload();

    // Create supermarket
    await createSupermarket(page, 'Aldi', 2);

    // Navigate to it
    await navigateToSupermarket(page, 'Aldi');

    // Add first item
    await addItem(page, 'Bananas');

    // Add second item
    await addItem(page, 'Apples');

    // Verify both items appear
    await expect(page.getByText('Bananas')).toBeVisible();
    await expect(page.getByText('Apples')).toBeVisible();

    // Verify count
    await expect(page.getByText('Shopping list (2)')).toBeVisible();
  });
});
