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
  // Click "Add new supermarket" button on the home screen
  await page.getByText('+ Add new supermarket').click();

  // Wait for modal to open
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  // Click "+ Add New Supermarket" button inside the modal
  await dialog.getByRole('button', { name: '+ Add New Supermarket' }).click();

  // Wait for the input field to appear and fill in the name
  await page.getByPlaceholder('Supermarket name').waitFor({ state: 'visible' });
  await page.getByPlaceholder('Supermarket name').fill(name);

  // Select color (click the nth color option)
  const colorButtons = page.getByRole('radio');
  await colorButtons.nth(colorIndex).click();

  // Click Add button
  await dialog.getByRole('button', { name: 'Add' }).click();

  // Verify supermarket appears in the modal
  await expect(dialog.getByText(name)).toBeVisible();

  // Close the modal
  await dialog.getByLabel('Close').click();

  // Wait for modal to close
  await expect(dialog).not.toBeVisible();

  // Verify supermarket appears on home screen
  await expect(page.getByText(name)).toBeVisible();
}

/**
 * Navigate to a supermarket's detail view
 */
export async function navigateToSupermarket(page: Page, supermarketName: string) {
  await page.getByText(supermarketName).first().click();

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

  // Verify item appears (use first() to handle multiple matches like "+ Add new item")
  await expect(page.getByText(itemName, { exact: true })).toBeVisible();
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
  await expect(page.getByRole('heading', { name: 'Shopping Lists', exact: true })).toBeVisible();
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
    await page.getByRole('button', { name: 'Delete', exact: true }).click();
  } else {
    await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  }
}

/**
 * Edit a supermarket from the manager
 */
export async function editSupermarket(page: Page, oldName: string, newName: string, colorIndex?: number) {
  await page.getByRole('button', { name: `Edit ${oldName}` }).click();

  // Clear and fill new name
  const input = page.getByPlaceholder('Supermarket name');
  await input.clear();
  await input.fill(newName);

  // Change color if specified
  if (colorIndex !== undefined) {
    const colorButtons = page.getByRole('radio');
    await colorButtons.nth(colorIndex).click();
  }

  // Save
  await page.getByRole('button', { name: 'Save', exact: true }).click();

  // Wait for edit mode to close (form disappears)
  await expect(input).not.toBeVisible();
}
