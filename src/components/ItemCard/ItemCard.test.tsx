import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ItemCard } from './ItemCard';
import type { ShoppingItem, Supermarket } from '../../types';
import { ShoppingListProvider } from '../../context/ShoppingListContext';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    <ShoppingListProvider>{children}</ShoppingListProvider>
  </ThemeProvider>
);

const mockSupermarkets: Supermarket[] = [
  { id: '1', name: 'Lidl', color: '#0050AA' },
  { id: '2', name: 'Aldi', color: '#FF6600' },
];

const mockItem: ShoppingItem = {
  id: '1',
  name: 'Milk',
  supermarketId: '1',
  categoryId: 'dairy',
  completed: false,
  createdAt: new Date(),
};

describe('ItemCard', () => {
  it('renders item name', () => {
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();
    const mockChangeSupermarket = vi.fn();

    render(
      <ItemCard
        item={mockItem}
        supermarkets={mockSupermarkets}
        onToggleComplete={mockToggle}
        onDelete={mockDelete}
        onChangeSupermarket={mockChangeSupermarket}
      />,
      { wrapper }
    );

    expect(screen.getByText('Milk')).toBeInTheDocument();
  });

  it('shows empty checkbox for uncompleted item', () => {
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();
    const mockChangeSupermarket = vi.fn();

    render(
      <ItemCard
        item={mockItem}
        supermarkets={mockSupermarkets}
        onToggleComplete={mockToggle}
        onDelete={mockDelete}
        onChangeSupermarket={mockChangeSupermarket}
      />,
      { wrapper }
    );

    const checkbox = screen.getByLabelText('Mark as complete');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toHaveTextContent('✓');
  });

  it('shows yellow checkmark for completed item', () => {
    const completedItem: ShoppingItem = { ...mockItem, completed: true };
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();
    const mockChangeSupermarket = vi.fn();

    render(
      <ItemCard
        item={completedItem}
        supermarkets={mockSupermarkets}
        onToggleComplete={mockToggle}
        onDelete={mockDelete}
        onChangeSupermarket={mockChangeSupermarket}
      />,
      { wrapper }
    );

    const checkbox = screen.getByLabelText('Mark as incomplete');
    expect(checkbox).toHaveTextContent('✓');
  });

  it('calls onToggleComplete when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();
    const mockChangeSupermarket = vi.fn();

    render(
      <ItemCard
        item={mockItem}
        supermarkets={mockSupermarkets}
        onToggleComplete={mockToggle}
        onDelete={mockDelete}
        onChangeSupermarket={mockChangeSupermarket}
      />,
      { wrapper }
    );

    const checkbox = screen.getByLabelText('Mark as complete');
    await user.click(checkbox);

    expect(mockToggle).toHaveBeenCalledWith('1');
  });

  it('calls onChangeSupermarket when drag handle is clicked', async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();
    const mockChangeSupermarket = vi.fn();

    render(
      <ItemCard
        item={mockItem}
        supermarkets={mockSupermarkets}
        onToggleComplete={mockToggle}
        onDelete={mockDelete}
        onChangeSupermarket={mockChangeSupermarket}
      />,
      { wrapper }
    );

    const dragHandle = screen.getByLabelText('Change supermarket');
    await user.click(dragHandle);

    expect(mockChangeSupermarket).toHaveBeenCalledWith(mockItem);
  });

  it('renders drag handle icon', () => {
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();
    const mockChangeSupermarket = vi.fn();

    render(
      <ItemCard
        item={mockItem}
        supermarkets={mockSupermarkets}
        onToggleComplete={mockToggle}
        onDelete={mockDelete}
        onChangeSupermarket={mockChangeSupermarket}
      />,
      { wrapper }
    );

    expect(screen.getByText('⋮⋮')).toBeInTheDocument();
  });
});
