import { test, expect } from '@playwright/test';
import {
  clearLocalStorage,
  createSupermarket,
  navigateToSupermarket,
  addItem,
  goToHome,
  getLocalStorageData,
} from './utils/helpers';

test.describe('localStorage Persistence', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await clearLocalStorage(page);
    await page.reload();
  });

  test('data persists in localStorage', async ({ page }) => {
    // Create supermarket and add items
    await createSupermarket(page, 'Test Store', 0);
    await navigateToSupermarket(page, 'Test Store');
    await addItem(page, 'Milk');
    await addItem(page, 'Bread');

    // Check localStorage contains the data
    const supermarkets = await getLocalStorageData(page, 'shopping-supermarkets');
    const items = await getLocalStorageData(page, 'shopping-items');

    expect(supermarkets).toBeTruthy();
    expect(items).toBeTruthy();
    expect(supermarkets.length).toBe(1);
    expect(items.length).toBe(2);
    expect(supermarkets[0].name).toBe('Test Store');
    expect(items[0].name).toBe('Milk');
    expect(items[1].name).toBe('Bread');
  });

  test('data persists after page reload', async ({ page }) => {
    // Create data
    await createSupermarket(page, 'Persistent Store', 1);
    await navigateToSupermarket(page, 'Persistent Store');
    await addItem(page, 'Coffee');
    await goToHome(page);

    // Reload page
    await page.reload();

    // Verify data still exists
    await expect(page.getByText('Persistent Store')).toBeVisible();

    await navigateToSupermarket(page, 'Persistent Store');
    await expect(page.getByText('Coffee')).toBeVisible();
    await expect(page.getByText('Shopping list (1)')).toBeVisible();
  });

  test('data persists across multiple reloads', async ({ page }) => {
    // Create initial data
    await createSupermarket(page, 'Store A', 0);
    await navigateToSupermarket(page, 'Store A');
    await addItem(page, 'Item 1');
    await goToHome(page);

    // First reload
    await page.reload();
    await expect(page.getByText('Store A')).toBeVisible();

    // Add more data
    await createSupermarket(page, 'Store B', 1);
    await navigateToSupermarket(page, 'Store B');
    await addItem(page, 'Item 2');
    await goToHome(page);

    // Second reload
    await page.reload();

    // Verify all data exists
    await expect(page.getByText('Store A')).toBeVisible();
    await expect(page.getByText('Store B')).toBeVisible();

    await navigateToSupermarket(page, 'Store A');
    await expect(page.getByText('Item 1')).toBeVisible();
    await goToHome(page);

    await navigateToSupermarket(page, 'Store B');
    await expect(page.getByText('Item 2')).toBeVisible();
  });

  test('UI rebuilds correctly from localStorage', async ({ page }) => {
    // Create complex state
    await createSupermarket(page, 'Market 1', 0);
    await createSupermarket(page, 'Market 2', 1);
    await createSupermarket(page, 'Market 3', 2);

    // Add items to each
    await navigateToSupermarket(page, 'Market 1');
    await addItem(page, 'M1 Item 1');
    await addItem(page, 'M1 Item 2');
    await goToHome(page);

    await navigateToSupermarket(page, 'Market 2');
    await addItem(page, 'M2 Item 1');
    await goToHome(page);

    await navigateToSupermarket(page, 'Market 3');
    await addItem(page, 'M3 Item 1');
    await addItem(page, 'M3 Item 2');
    await addItem(page, 'M3 Item 3');
    await goToHome(page);

    // Reload
    await page.reload();

    // Verify all supermarkets and their item counts
    const market1 = page.locator('text="Market 1"').locator('..');
    const market2 = page.locator('text="Market 2"').locator('..');
    const market3 = page.locator('text="Market 3"').locator('..');

    await expect(market1.getByText('(2)')).toBeVisible();
    await expect(market2.getByText('(1)')).toBeVisible();
    await expect(market3.getByText('(3)')).toBeVisible();

    // Verify items in each supermarket
    await navigateToSupermarket(page, 'Market 1');
    await expect(page.getByText('M1 Item 1')).toBeVisible();
    await expect(page.getByText('M1 Item 2')).toBeVisible();
    await goToHome(page);

    await navigateToSupermarket(page, 'Market 2');
    await expect(page.getByText('M2 Item 1')).toBeVisible();
    await goToHome(page);

    await navigateToSupermarket(page, 'Market 3');
    await expect(page.getByText('M3 Item 1')).toBeVisible();
    await expect(page.getByText('M3 Item 2')).toBeVisible();
    await expect(page.getByText('M3 Item 3')).toBeVisible();
  });

  test('completed status persists after reload', async ({ page }) => {
    await createSupermarket(page, 'Store', 0);
    await navigateToSupermarket(page, 'Store');

    // Add items and mark one as completed
    await addItem(page, 'Milk');
    await addItem(page, 'Bread');

    const milkCard = page.locator('text="Milk"').locator('..');
    await milkCard.getByRole('button', { name: /Mark as complete/ }).click();

    // Reload
    await page.reload();

    // Navigate back to supermarket
    await navigateToSupermarket(page, 'Store');

    // Verify Milk is still marked as completed
    await expect(page.getByLabel('Mark as incomplete')).toBeVisible();

    // Verify Bread is still uncompleted
    const breadCard = page.locator('text="Bread"').locator('..');
    await expect(breadCard.getByLabel('Mark as complete')).toBeVisible();
  });

  test('no data loss when adding new data after reload', async ({ page }) => {
    // Create initial data
    await createSupermarket(page, 'Initial Store', 0);
    await navigateToSupermarket(page, 'Initial Store');
    await addItem(page, 'Initial Item');
    await goToHome(page);

    // Reload
    await page.reload();

    // Add new data
    await createSupermarket(page, 'New Store', 1);
    await navigateToSupermarket(page, 'New Store');
    await addItem(page, 'New Item');
    await goToHome(page);

    // Verify both old and new data exist
    await expect(page.getByText('Initial Store')).toBeVisible();
    await expect(page.getByText('New Store')).toBeVisible();

    await navigateToSupermarket(page, 'Initial Store');
    await expect(page.getByText('Initial Item', { exact: true })).toBeVisible();
    await goToHome(page);

    await navigateToSupermarket(page, 'New Store');
    await expect(page.getByText('New Item', { exact: true })).toBeVisible();
  });
});
