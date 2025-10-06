import { test, expect } from '@playwright/test';
import { clearLocalStorage, createSupermarket, navigateToSupermarket, addItem } from './utils/helpers';

test.describe('User Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await clearLocalStorage(page);
    await page.reload();
  });

  test('first time user can create supermarkets', async ({ page }) => {
    // Create some supermarkets
    await createSupermarket(page, 'Colruyt', 0);
    await createSupermarket(page, 'Delhaize', 1);
    await createSupermarket(page, 'Carrefour', 2);

    // Verify they appear on the home screen
    await expect(page.getByText('Colruyt')).toBeVisible();
    await expect(page.getByText('Delhaize')).toBeVisible();
    await expect(page.getByText('Carrefour')).toBeVisible();
  });

  test('user can create their first supermarket', async ({ page }) => {
    // Create a new supermarket
    await createSupermarket(page, 'My First Store', 0);

    // Verify it appears on the home screen
    await expect(page.getByText('My First Store')).toBeVisible();
    // Item count of 0 doesn't show any count text
  });

  test('user navigates to supermarket detail view', async ({ page }) => {
    // Create a supermarket first
    await createSupermarket(page, 'Colruyt', 0);
    await navigateToSupermarket(page, 'Colruyt');

    // Verify we're in the detail view
    await expect(page.getByText('Colruyt (0)')).toBeVisible();
    await expect(page.getByRole('button', { name: 'All', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Completed', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Uncompleted', exact: true })).toBeVisible();
  });

  test('user adds their first item', async ({ page }) => {
    // Create a supermarket first
    await createSupermarket(page, 'Colruyt', 0);
    await navigateToSupermarket(page, 'Colruyt');

    // Add an item
    await addItem(page, 'Milk');

    // Verify item appears in the list
    await expect(page.getByText('Milk')).toBeVisible();

    // Verify count updated
    await expect(page.getByText('Colruyt (1)')).toBeVisible();
  });

  test('complete onboarding: create supermarket and add item', async ({ page }) => {
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
    await expect(page.getByText('Aldi (2)')).toBeVisible();
  });
});
