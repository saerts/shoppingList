import { test, expect } from '@playwright/test';
import {
  clearLocalStorage,
  createSupermarket,
  navigateToSupermarket,
  addItem,
  goToHome,
} from './utils/helpers';

test.describe('Complete User Journey - Golden Path', () => {
  test('complete realistic shopping list workflow', async ({ page }) => {
    // User opens app for first time
    await page.goto('/');
    await clearLocalStorage(page);
    await page.reload();

    // Step 1: Create 2 supermarkets: "Colruyt" and "Delhaize"
    await createSupermarket(page, 'Colruyt', 0); // Yellow
    await createSupermarket(page, 'Delhaize', 3); // Red

    // Verify both appear on home screen
    await expect(page.getByText('Colruyt')).toBeVisible();
    await expect(page.getByText('Delhaize')).toBeVisible();

    // Step 2: Add 3 items to Colruyt: "Milk", "Bread", "Eggs"
    await navigateToSupermarket(page, 'Colruyt');
    await addItem(page, 'Milk');
    await addItem(page, 'Bread');
    await addItem(page, 'Eggs');

    // Verify all 3 items are visible
    await expect(page.getByText('Milk')).toBeVisible();
    await expect(page.getByText('Bread')).toBeVisible();
    await expect(page.getByText('Eggs')).toBeVisible();

    // Verify count is 3
    await expect(page.getByText('Shopping list (3)')).toBeVisible();

    // Go back to home
    await goToHome(page);

    // Step 3: Add 2 items to Delhaize: "Wine", "Cheese"
    await navigateToSupermarket(page, 'Delhaize');
    await addItem(page, 'Wine');
    await addItem(page, 'Cheese');

    // Verify items are visible
    await expect(page.getByText('Wine')).toBeVisible();
    await expect(page.getByText('Cheese')).toBeVisible();

    // Verify count is 2
    await expect(page.getByText('Shopping list (2)')).toBeVisible();

    // Go back to home
    await goToHome(page);

    // Step 4: Go to Colruyt list and mark "Milk" as completed
    await navigateToSupermarket(page, 'Colruyt');

    const milkCard = page.locator('text="Milk"').locator('..');
    await milkCard.getByRole('button', { name: /Mark as complete/ }).click();

    // Verify milk is now completed
    await expect(page.getByLabel('Mark as incomplete')).toBeVisible();

    // Step 5: Filter to show only completed items
    await page.getByRole('button', { name: 'Completed', exact: true }).click();

    // Only Milk should be visible
    await expect(page.getByText('Milk')).toBeVisible();
    await expect(page.getByText('Bread')).not.toBeVisible();
    await expect(page.getByText('Eggs')).not.toBeVisible();

    // Switch back to All to see all items
    await page.getByRole('button', { name: 'All' }).click();

    // Step 6: Switch "Bread" to Delhaize
    const breadCard = page.locator('text="Bread"').locator('..');
    await breadCard.getByLabel('Change supermarket').click();

    // Wait for supermarket switcher modal
    await expect(page.getByText('Move to supermarket')).toBeVisible();

    // Click on Delhaize
    await page.getByText('Delhaize').click();

    // Modal should close
    await expect(page.getByText('Move to supermarket')).not.toBeVisible();

    // Bread should no longer be visible in Colruyt list
    await expect(page.getByText('Bread')).not.toBeVisible();

    // Count should be 2 now (Milk and Eggs remain)
    await expect(page.getByText('Shopping list (2)')).toBeVisible();

    // Step 7: Go back to home
    await goToHome(page);

    // Step 8: Verify item counts are correct
    // Colruyt: 2 items total (Milk - completed, Eggs - uncompleted) = 1 uncompleted
    // Delhaize: 3 items total (Wine, Cheese, Bread - all uncompleted) = 3 uncompleted
    const colruytCard = page.locator('text="Colruyt"').locator('..');
    const delhaizeCard = page.locator('text="Delhaize"').locator('..');

    await expect(colruytCard.getByText('(1)')).toBeVisible();
    await expect(delhaizeCard.getByText('(3)')).toBeVisible();

    // Step 9: Verify Bread is now in Delhaize
    await navigateToSupermarket(page, 'Delhaize');
    await expect(page.getByText('Bread')).toBeVisible();
    await expect(page.getByText('Wine')).toBeVisible();
    await expect(page.getByText('Cheese')).toBeVisible();
    await expect(page.getByText('Shopping list (3)')).toBeVisible();

    await goToHome(page);

    // Step 10: Refresh page and verify everything persisted
    await page.reload();

    // Verify supermarkets still exist
    await expect(page.getByText('Colruyt')).toBeVisible();
    await expect(page.getByText('Delhaize')).toBeVisible();

    // Verify counts are still correct
    const colruytCardAfterReload = page.locator('text="Colruyt"').locator('..');
    const delhaizeCardAfterReload = page.locator('text="Delhaize"').locator('..');

    await expect(colruytCardAfterReload.getByText('(1)')).toBeVisible();
    await expect(delhaizeCardAfterReload.getByText('(3)')).toBeVisible();

    // Verify items in Colruyt
    await navigateToSupermarket(page, 'Colruyt');
    await expect(page.getByText('Milk')).toBeVisible();
    await expect(page.getByText('Eggs')).toBeVisible();

    // Verify Milk is still completed
    await expect(page.getByLabel('Mark as incomplete')).toBeVisible();

    await goToHome(page);

    // Verify items in Delhaize
    await navigateToSupermarket(page, 'Delhaize');
    await expect(page.getByText('Wine')).toBeVisible();
    await expect(page.getByText('Cheese')).toBeVisible();
    await expect(page.getByText('Bread')).toBeVisible();

    // Test complete! User has successfully:
    // ✓ Created supermarkets
    // ✓ Added items
    // ✓ Marked items as completed
    // ✓ Filtered items
    // ✓ Moved items between supermarkets
    // ✓ Verified data persistence
  });
});
