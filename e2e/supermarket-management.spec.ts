import { test, expect } from '@playwright/test';
import {
  clearLocalStorage,
  createSupermarket,
  openSupermarketManager,
  editSupermarket,
  deleteSupermarket,
  navigateToSupermarket,
  addItem,
  goToHome,
} from './utils/helpers';

test.describe('Supermarket Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await clearLocalStorage(page);
    await page.reload();
  });

  test('create multiple supermarkets with different colors', async ({ page }) => {
    await createSupermarket(page, 'Aldi', 0);
    await createSupermarket(page, 'Lidl', 1);
    await createSupermarket(page, 'Albert Heijn', 2);

    // Verify all supermarkets appear on home screen
    await expect(page.getByText('Aldi')).toBeVisible();
    await expect(page.getByText('Lidl')).toBeVisible();
    await expect(page.getByText('Albert Heijn')).toBeVisible();

    // Verify all show 0 items initially
    const itemCounts = page.getByText('0 items');
    await expect(itemCounts).toHaveCount(3);
  });

  test('edit supermarket name', async ({ page }) => {
    await createSupermarket(page, 'Old Name', 0);

    // Open manager
    await openSupermarketManager(page);

    // Edit the supermarket
    await editSupermarket(page, 'Old Name', 'New Name');

    // Close manager
    await page.getByLabel('Close').click();

    // Verify new name appears on home screen
    await expect(page.getByText('New Name')).toBeVisible();
    await expect(page.getByText('Old Name')).not.toBeVisible();
  });

  test('edit supermarket color', async ({ page }) => {
    await createSupermarket(page, 'Test Store', 0);

    // Open manager
    await openSupermarketManager(page);

    // Edit with new color
    await editSupermarket(page, 'Test Store', 'Test Store', 2);

    // Close manager
    await page.getByLabel('Close').click();

    // Verify store still exists (color change is visual, hard to test directly)
    await expect(page.getByText('Test Store')).toBeVisible();
  });

  test('switch item from one supermarket to another', async ({ page }) => {
    // Create two supermarkets
    await createSupermarket(page, 'Store A', 0);
    await createSupermarket(page, 'Store B', 1);

    // Add item to Store A
    await navigateToSupermarket(page, 'Store A');
    await addItem(page, 'Milk');

    // Click drag handle to open supermarket switcher
    await page.getByLabel('Change supermarket').click();

    // Wait for modal
    await expect(page.getByText('Move to supermarket')).toBeVisible();

    // Select Store B
    await page.getByText('Store B').click();

    // Modal should close
    await expect(page.getByText('Move to supermarket')).not.toBeVisible();

    // Go back to home
    await goToHome(page);

    // Verify item counts
    await expect(page.getByText('Store A')).toBeVisible();
    await expect(page.getByText('Store B')).toBeVisible();

    // Store A should have 0 items, Store B should have 1
    const storeACard = page.locator('text="Store A"').locator('..');
    const storeBCard = page.locator('text="Store B"').locator('..');

    await expect(storeACard.getByText('0 items')).toBeVisible();
    await expect(storeBCard.getByText('1 items')).toBeVisible();
  });

  test('delete empty supermarket', async ({ page }) => {
    await createSupermarket(page, 'To Delete', 0);

    // Verify it exists
    await expect(page.getByText('To Delete')).toBeVisible();

    // Open manager
    await openSupermarketManager(page);

    // Delete supermarket
    await deleteSupermarket(page, 'To Delete', true);

    // Close manager
    await page.getByLabel('Close').click();

    // Verify it's gone
    await expect(page.getByText('To Delete')).not.toBeVisible();
  });

  test('delete supermarket with items shows warning', async ({ page }) => {
    await createSupermarket(page, 'Store With Items', 0);

    // Add an item
    await navigateToSupermarket(page, 'Store With Items');
    await addItem(page, 'Milk');
    await goToHome(page);

    // Open manager
    await openSupermarketManager(page);

    // Try to delete
    await page.getByRole('button', { name: 'Delete Store With Items' }).click();

    // Verify warning message about items
    await expect(
      page.getByText(/All items in this supermarket will also be deleted/)
    ).toBeVisible();

    // Cancel
    await page.getByRole('button', { name: 'Cancel' }).click();

    // Close manager
    await page.getByLabel('Close').click();

    // Verify supermarket still exists
    await expect(page.getByText('Store With Items')).toBeVisible();
  });

  test('confirm delete supermarket with items removes all items', async ({ page }) => {
    await createSupermarket(page, 'Store To Delete', 0);

    // Add items
    await navigateToSupermarket(page, 'Store To Delete');
    await addItem(page, 'Milk');
    await addItem(page, 'Bread');
    await goToHome(page);

    // Open manager
    await openSupermarketManager(page);

    // Delete with confirmation
    await deleteSupermarket(page, 'Store To Delete', true);

    // Close manager
    await page.getByLabel('Close').click();

    // Verify supermarket is gone
    await expect(page.getByText('Store To Delete')).not.toBeVisible();
  });

  test('item counts update correctly across supermarkets', async ({ page }) => {
    await createSupermarket(page, 'Store 1', 0);
    await createSupermarket(page, 'Store 2', 1);

    // Add 2 items to Store 1
    await navigateToSupermarket(page, 'Store 1');
    await addItem(page, 'Item 1');
    await addItem(page, 'Item 2');
    await goToHome(page);

    // Add 3 items to Store 2
    await navigateToSupermarket(page, 'Store 2');
    await addItem(page, 'Item A');
    await addItem(page, 'Item B');
    await addItem(page, 'Item C');
    await goToHome(page);

    // Verify counts
    const store1Card = page.locator('text="Store 1"').locator('..');
    const store2Card = page.locator('text="Store 2"').locator('..');

    await expect(store1Card.getByText('2 items')).toBeVisible();
    await expect(store2Card.getByText('3 items')).toBeVisible();
  });
});
