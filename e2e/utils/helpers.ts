import { Page, expect } from '@playwright/test';

/**
 * Clear localStorage to start with a clean slate
 */
export async function clearLocalStorage(page: Page) {
  await page.evaluate(() => {
    localStorage.clear();
  });
}

/**
 * Get data from localStorage
 */
export async function getLocalStorageData(page: Page, key: string) {
  return await page.evaluate((storageKey) => {
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : null;
  }, key);
}

/**
 * Wait for localStorage to be updated
 */
export async function waitForStorageUpdate(page: Page, key: string, timeout = 5000) {
  await page.waitForFunction(
    ({ storageKey }) => {
      const data = localStorage.getItem(storageKey);
      return data !== null && data !== '[]';
    },
    { storageKey: key },
    { timeout }
  );
}

/**
 * Create a new supermarket via UI
 */
export async function createSupermarket(page: Page, name: string, colorIndex: number = 0) {
  // Click "Add new supermarket" button
  await page.getByText('+ Add new supermarket').click();

  // Wait for modal to open
  await expect(page.getByRole('dialog')).toBeVisible();

  // Fill in the name
  await page.getByPlaceholder('Supermarket name').fill(name);

  // Select color (click the nth color option)
  const colorButtons = page.getByRole('radio');
  await colorButtons.nth(colorIndex).click();

  // Click Add button
  await page.getByRole('button', { name: 'Add' }).click();

  // Wait for modal to close
  await expect(page.getByRole('dialog')).not.toBeVisible();

  // Verify supermarket appears
  await expect(page.getByText(name)).toBeVisible();
}

/**
 * Navigate to a supermarket's detail view
 */
export async function navigateToSupermarket(page: Page, supermarketName: string) {
  await page.getByText(supermarketName).click();

  // Wait for detail view to load
  await expect(page.getByText(/Shopping list \(\d+\)/)).toBeVisible();
}

/**
 * Add an item to the current supermarket detail view
 */
export async function addItem(page: Page, itemName: string) {
  // Click "Add new item" button
  await page.getByText('+ Add new item').click();

  // Fill in the item name
  await page.getByPlaceholder('Enter item name').fill(itemName);

  // Submit the form (press Enter or click Add)
  await page.keyboard.press('Enter');

  // Verify item appears
  await expect(page.getByText(itemName)).toBeVisible();
}

/**
 * Toggle an item's completion status
 */
export async function toggleItemCompletion(page: Page, itemName: string) {
  // Find the item card and click its checkbox
  const itemCard = page.locator(`text="${itemName}"`).locator('..');
  const checkbox = itemCard.getByRole('button', { name: /Mark as/ });
  await checkbox.click();
}

/**
 * Go back to the home screen
 */
export async function goToHome(page: Page) {
  await page.getByLabel('Go back').click();
  await expect(page.getByText('Shopping Lists')).toBeVisible();
}

/**
 * Open the supermarket manager
 */
export async function openSupermarketManager(page: Page) {
  await page.getByText('+ Add new supermarket').click();
  await expect(page.getByRole('dialog')).toBeVisible();
}

/**
 * Delete a supermarket from the manager
 */
export async function deleteSupermarket(page: Page, supermarketName: string, confirm: boolean = true) {
  await page.getByRole('button', { name: `Delete ${supermarketName}` }).click();

  // Wait for confirmation dialog
  await expect(page.getByText('Delete Supermarket')).toBeVisible();

  if (confirm) {
    await page.getByRole('button', { name: 'Delete' }).click();
  } else {
    await page.getByRole('button', { name: 'Cancel' }).click();
  }
}

/**
 * Edit a supermarket from the manager
 */
export async function editSupermarket(page: Page, oldName: string, newName: string, colorIndex?: number) {
  await page.getByRole('button', { name: `Edit ${oldName}` }).click();

  // Clear and fill new name
  await page.getByDisplayValue(oldName).clear();
  await page.getByDisplayValue('').fill(newName);

  // Change color if specified
  if (colorIndex !== undefined) {
    const colorButtons = page.getByRole('radio');
    await colorButtons.nth(colorIndex).click();
  }

  // Save
  await page.getByRole('button', { name: 'Save' }).click();

  // Verify new name appears
  await expect(page.getByText(newName)).toBeVisible();
}
