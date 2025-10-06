import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategorySwitcher } from './CategorySwitcher';
import { ShoppingListProvider } from '../../context/ShoppingListContext';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';

const mockItem = {
  id: '1',
  name: 'Milk',
  supermarketId: 'supermarket-1',
  categoryId: 'dairy',
  completed: false,
  createdAt: new Date(),
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    <ShoppingListProvider>{children}</ShoppingListProvider>
  </ThemeProvider>
);

describe('CategorySwitcher', () => {
  it('should render the modal', () => {
    const handleSelect = vi.fn();
    const handleClose = vi.fn();

    render(
      <CategorySwitcher item={mockItem} onSelect={handleSelect} onClose={handleClose} />,
      { wrapper }
    );

    expect(screen.getByText('Change category')).toBeInTheDocument();
  });

  it('should close when clicking the close button', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    const handleClose = vi.fn();

    render(
      <CategorySwitcher item={mockItem} onSelect={handleSelect} onClose={handleClose} />,
      { wrapper }
    );

    const closeButton = screen.getByLabelText('Close');
    await user.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should call onSelect when a category is selected', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    const handleClose = vi.fn();

    render(
      <CategorySwitcher item={mockItem} onSelect={handleSelect} onClose={handleClose} />,
      { wrapper }
    );

    // Find any category button and click it
    const categoryButtons = screen.getAllByRole('button');
    const categoryButton = categoryButtons.find(btn =>
      btn.textContent && !btn.textContent.includes('×')
    );

    if (categoryButton && categoryButton.textContent) {
      await user.click(categoryButton);
      expect(handleSelect).toHaveBeenCalled();
      expect(handleClose).toHaveBeenCalledTimes(1);
    }
  });

  it('should display categories', () => {
    const handleSelect = vi.fn();
    const handleClose = vi.fn();

    render(
      <CategorySwitcher item={mockItem} onSelect={handleSelect} onClose={handleClose} />,
      { wrapper }
    );

    // Check that category buttons are present (excluding the close button)
    const buttons = screen.getAllByRole('button');
    const categoryButtons = buttons.filter(btn => !btn.textContent?.includes('×'));
    expect(categoryButtons.length).toBeGreaterThan(0);
  });
});
