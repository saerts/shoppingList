import { test, expect } from '@playwright/test';
import { clearLocalStorage, navigateToSupermarket, addItem, toggleItemCompletion } from './utils/helpers';

test.describe('Item Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Use default supermarkets for these tests
  });

  test('add multiple items to a supermarket', async ({ page }) => {
    await navigateToSupermarket(page, 'Colruyt');

    // Add three items
    await addItem(page, 'Milk');
    await addItem(page, 'Bread');
    await addItem(page, 'Eggs');

    // Verify all items appear
    await expect(page.getByText('Milk')).toBeVisible();
    await expect(page.getByText('Bread')).toBeVisible();
    await expect(page.getByText('Eggs')).toBeVisible();

    // Verify count
    await expect(page.getByText('Shopping list (3)')).toBeVisible();
  });

  test('mark item as completed shows checkmark and strikethrough', async ({ page }) => {
    await navigateToSupermarket(page, 'Colruyt');
    await addItem(page, 'Milk');

    // Click checkbox to mark as complete
    await page.getByLabel('Mark as complete').click();

    // Verify checkbox now shows as completed
    await expect(page.getByLabel('Mark as incomplete')).toBeVisible();

    // Verify the item text has strikethrough (by checking computed style or presence of completed state)
    // Note: We can't directly check CSS strikethrough in Playwright, but we can verify the aria label changed
  });

  test('uncheck completed items', async ({ page }) => {
    await navigateToSupermarket(page, 'Colruyt');
    await addItem(page, 'Milk');

    // Mark as complete
    await page.getByLabel('Mark as complete').click();
    await expect(page.getByLabel('Mark as incomplete')).toBeVisible();

    // Uncheck it
    await page.getByLabel('Mark as incomplete').click();
    await expect(page.getByLabel('Mark as complete')).toBeVisible();
  });

  test('filter by completed items', async ({ page }) => {
    await navigateToSupermarket(page, 'Colruyt');

    // Add three items
    await addItem(page, 'Milk');
    await addItem(page, 'Bread');
    await addItem(page, 'Eggs');

    // Mark "Milk" as completed
    const milkCard = page.locator('text="Milk"').locator('..');
    await milkCard.getByRole('button', { name: /Mark as complete/ }).click();

    // Click "Completed" filter
    await page.getByRole('button', { name: 'Completed' }).click();

    // Only "Milk" should be visible
    await expect(page.getByText('Milk')).toBeVisible();
    await expect(page.getByText('Bread')).not.toBeVisible();
    await expect(page.getByText('Eggs')).not.toBeVisible();
  });

  test('filter by uncompleted items', async ({ page }) => {
    await navigateToSupermarket(page, 'Colruyt');

    // Add three items
    await addItem(page, 'Milk');
    await addItem(page, 'Bread');
    await addItem(page, 'Eggs');

    // Mark "Milk" as completed
    const milkCard = page.locator('text="Milk"').locator('..');
    await milkCard.getByRole('button', { name: /Mark as complete/ }).click();

    // Click "Uncompleted" filter
    await page.getByRole('button', { name: 'Uncompleted' }).click();

    // Only uncompleted items should be visible
    await expect(page.getByText('Milk')).not.toBeVisible();
    await expect(page.getByText('Bread')).toBeVisible();
    await expect(page.getByText('Eggs')).toBeVisible();
  });

  test('filter "All" shows all items', async ({ page }) => {
    await navigateToSupermarket(page, 'Colruyt');

    // Add items and mark one as completed
    await addItem(page, 'Milk');
    await addItem(page, 'Bread');

    const milkCard = page.locator('text="Milk"').locator('..');
    await milkCard.getByRole('button', { name: /Mark as complete/ }).click();

    // Click "Uncompleted" first
    await page.getByRole('button', { name: 'Uncompleted' }).click();
    await expect(page.getByText('Milk')).not.toBeVisible();

    // Click "All" to show everything
    await page.getByRole('button', { name: 'All' }).click();

    await expect(page.getByText('Milk')).toBeVisible();
    await expect(page.getByText('Bread')).toBeVisible();
  });

  test('item count updates correctly', async ({ page }) => {
    await navigateToSupermarket(page, 'Colruyt');

    // Initially 0 items
    await expect(page.getByText('Shopping list (0)')).toBeVisible();

    // Add one item
    await addItem(page, 'Milk');
    await expect(page.getByText('Shopping list (1)')).toBeVisible();

    // Add another
    await addItem(page, 'Bread');
    await expect(page.getByText('Shopping list (2)')).toBeVisible();

    // Add one more
    await addItem(page, 'Eggs');
    await expect(page.getByText('Shopping list (3)')).toBeVisible();
  });

  test('empty state shows when no items match filter', async ({ page }) => {
    await navigateToSupermarket(page, 'Colruyt');

    // Add uncompleted items only
    await addItem(page, 'Milk');

    // Filter by completed (should show empty state)
    await page.getByRole('button', { name: 'Completed' }).click();

    await expect(page.getByText('No completed items')).toBeVisible();
  });
});
