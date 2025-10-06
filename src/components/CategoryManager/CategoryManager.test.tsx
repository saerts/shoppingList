import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategoryManager } from './CategoryManager';
import { ShoppingListProvider } from '../../context/ShoppingListContext';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    <ShoppingListProvider>{children}</ShoppingListProvider>
  </ThemeProvider>
);

describe('CategoryManager', () => {
  it('should render the modal', () => {
    const handleClose = vi.fn();

    render(<CategoryManager onClose={handleClose} />, { wrapper });

    expect(screen.getByText('Manage Categories')).toBeInTheDocument();
  });

  it('should close when clicking the close button', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(<CategoryManager onClose={handleClose} />, { wrapper });

    const closeButton = screen.getByRole('button', { name: /×/i });
    await user.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should add a new category', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(<CategoryManager onClose={handleClose} />, { wrapper });

    const emojiInput = screen.getByPlaceholderText('Emoji');
    const nameInput = screen.getByPlaceholderText('Category name');
    const addButton = screen.getByText('Add Category');

    await user.type(emojiInput, '🐾');
    await user.type(nameInput, 'Pet Supplies');
    await user.click(addButton);

    // Verify the category appears in the list
    const categoryNames = screen.getAllByText('Pet Supplies');
    expect(categoryNames.length).toBeGreaterThan(0);
  });

  it('should delete a custom category', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(<CategoryManager onClose={handleClose} />, { wrapper });

    // Add a category first
    const emojiInput = screen.getByPlaceholderText('Emoji');
    const nameInput = screen.getByPlaceholderText('Category name');
    const addButton = screen.getByText('Add Category');

    await user.type(emojiInput, '🐾');
    await user.type(nameInput, 'Pet Supplies');
    await user.click(addButton);

    // Verify category was added
    expect(screen.getAllByText('Pet Supplies').length).toBeGreaterThan(0);

    // Count delete buttons before deletion
    const deleteButtonsBefore = screen.getAllByRole('button', { name: /delete/i });
    const countBefore = deleteButtonsBefore.length;

    // Delete the category we just added
    await user.click(deleteButtonsBefore[deleteButtonsBefore.length - 1]);

    // Verify one delete button was removed
    const deleteButtonsAfter = screen.queryAllByRole('button', { name: /delete/i });
    expect(deleteButtonsAfter.length).toBe(countBefore - 1);
  });

  it('should disable add button when fields are empty', () => {
    const handleClose = vi.fn();

    render(<CategoryManager onClose={handleClose} />, { wrapper });

    const addButton = screen.getByText('Add Category');
    expect(addButton).toBeDisabled();
  });
});
