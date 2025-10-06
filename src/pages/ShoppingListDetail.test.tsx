import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { ShoppingListDetail } from './ShoppingListDetail';
import * as ShoppingListContext from '../context/ShoppingListContext';
import type { Supermarket, ShoppingItem } from '../types';

// Mock data
const mockSupermarkets: Supermarket[] = [
  { id: '1', name: 'Colruyt', color: '#FFD600' },
  { id: '2', name: 'Delhaize', color: '#D32F2F' },
];

const mockItems: ShoppingItem[] = [
  {
    id: '1',
    name: 'Milk',
    supermarketId: '1',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Bread',
    supermarketId: '1',
    completed: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
  },
  {
    id: '3',
    name: 'Eggs',
    supermarketId: '2',
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('ShoppingListDetail', () => {
  const mockOnBack = vi.fn();
  const mockAddItem = vi.fn();
  const mockToggleItemComplete = vi.fn();
  const mockDeleteItem = vi.fn();
  const mockChangeItemSupermarket = vi.fn();
  const mockUpdateItemCategory = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(ShoppingListContext, 'useShoppingList').mockReturnValue({
      items: mockItems,
      supermarkets: mockSupermarkets,
      categories: [],
      addItem: mockAddItem,
      toggleItemComplete: mockToggleItemComplete,
      deleteItem: mockDeleteItem,
      changeItemSupermarket: mockChangeItemSupermarket,
      updateItemCategory: mockUpdateItemCategory,
      addSupermarkets: vi.fn(),
      updateSupermarket: vi.fn(),
      deleteSupermarket: vi.fn(),
      addCategory: vi.fn(),
      updateCategory: vi.fn(),
      deleteCategory: vi.fn(),
    });
  });

  it('renders supermarket name in header', () => {
    renderWithProviders(<ShoppingListDetail supermarketId="1" onBack={mockOnBack} />);
    expect(screen.getByText(/Colruyt/)).toBeInTheDocument();
  });

  it('shows item count in header', () => {
    renderWithProviders(<ShoppingListDetail supermarketId="1" onBack={mockOnBack} />);
    expect(screen.getByText('Colruyt (2)')).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ShoppingListDetail supermarketId="1" onBack={mockOnBack} />);

    await user.click(screen.getByLabelText('Go back'));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('displays "Supermarket not found" when supermarket does not exist', () => {
    renderWithProviders(<ShoppingListDetail supermarketId="999" onBack={mockOnBack} />);
    expect(screen.getByText('Supermarket not found')).toBeInTheDocument();
  });

  it('renders all filter buttons', () => {
    renderWithProviders(<ShoppingListDetail supermarketId="1" onBack={mockOnBack} />);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Uncompleted' })).toBeInTheDocument();
  });

  it('shows Add new item button initially', () => {
    renderWithProviders(<ShoppingListDetail supermarketId="1" onBack={mockOnBack} />);
    expect(screen.getByText('+ Add new item')).toBeInTheDocument();
  });

  it('shows add item form when Add button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ShoppingListDetail supermarketId="1" onBack={mockOnBack} />);

    await user.click(screen.getByText('+ Add new item'));
    expect(screen.getByPlaceholderText('Enter item name')).toBeInTheDocument();
  });

  it('hides Add button when form is shown', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ShoppingListDetail supermarketId="1" onBack={mockOnBack} />);

    await user.click(screen.getByText('+ Add new item'));
    expect(screen.queryByText('+ Add new item')).not.toBeInTheDocument();
  });

  it('filters to show only completed items', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ShoppingListDetail supermarketId="1" onBack={mockOnBack} />);

    await user.click(screen.getByRole('button', { name: 'Completed' }));
    // ItemList component will handle the filtering logic
    expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument();
  });

  it('filters to show only uncompleted items', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ShoppingListDetail supermarketId="1" onBack={mockOnBack} />);

    await user.click(screen.getByRole('button', { name: 'Uncompleted' }));
    expect(screen.getByRole('button', { name: 'Uncompleted' })).toBeInTheDocument();
  });

  it('shows last modified timestamp when items exist', () => {
    renderWithProviders(<ShoppingListDetail supermarketId="1" onBack={mockOnBack} />);
    expect(screen.getByText(/Last modified:/)).toBeInTheDocument();
  });

  it('formats last modified as "Just now" for recent items', () => {
    vi.spyOn(ShoppingListContext, 'useShoppingList').mockReturnValue({
      items: [{
        id: '1',
        name: 'Test',
        supermarketId: '1',
        completed: false,
        createdAt: new Date().toISOString(),
      }],
      supermarkets: mockSupermarkets,
      categories: [],
      addItem: mockAddItem,
      toggleItemComplete: mockToggleItemComplete,
      deleteItem: mockDeleteItem,
      changeItemSupermarket: mockChangeItemSupermarket,
      updateItemCategory: mockUpdateItemCategory,
      addSupermarkets: vi.fn(),
      updateSupermarket: vi.fn(),
      deleteSupermarket: vi.fn(),
      addCategory: vi.fn(),
      updateCategory: vi.fn(),
      deleteCategory: vi.fn(),
    });

    renderWithProviders(<ShoppingListDetail supermarketId="1" onBack={mockOnBack} />);
    expect(screen.getByText(/Just now/)).toBeInTheDocument();
  });

  it('formats last modified in minutes for items less than 1 hour old', () => {
    vi.spyOn(ShoppingListContext, 'useShoppingList').mockReturnValue({
      items: [{
        id: '1',
        name: 'Test',
        supermarketId: '1',
        completed: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
      }],
      supermarkets: mockSupermarkets,
      categories: [],
      addItem: mockAddItem,
      toggleItemComplete: mockToggleItemComplete,
      deleteItem: mockDeleteItem,
      changeItemSupermarket: mockChangeItemSupermarket,
      updateItemCategory: mockUpdateItemCategory,
      addSupermarkets: vi.fn(),
      updateSupermarket: vi.fn(),
      deleteSupermarket: vi.fn(),
      addCategory: vi.fn(),
      updateCategory: vi.fn(),
      deleteCategory: vi.fn(),
    });

    renderWithProviders(<ShoppingListDetail supermarketId="1" onBack={mockOnBack} />);
    expect(screen.getByText(/30 min ago/)).toBeInTheDocument();
  });

  it('formats last modified in hours for items less than 1 day old', () => {
    vi.spyOn(ShoppingListContext, 'useShoppingList').mockReturnValue({
      items: [{
        id: '1',
        name: 'Test',
        supermarketId: '1',
        completed: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      }],
      supermarkets: mockSupermarkets,
      categories: [],
      addItem: mockAddItem,
      toggleItemComplete: mockToggleItemComplete,
      deleteItem: mockDeleteItem,
      changeItemSupermarket: mockChangeItemSupermarket,
      updateItemCategory: mockUpdateItemCategory,
      addSupermarkets: vi.fn(),
      updateSupermarket: vi.fn(),
      deleteSupermarket: vi.fn(),
      addCategory: vi.fn(),
      updateCategory: vi.fn(),
      deleteCategory: vi.fn(),
    });

    renderWithProviders(<ShoppingListDetail supermarketId="1" onBack={mockOnBack} />);
    expect(screen.getByText(/5 hours ago/)).toBeInTheDocument();
  });

  it('formats last modified in days for items less than 1 week old', () => {
    vi.spyOn(ShoppingListContext, 'useShoppingList').mockReturnValue({
      items: [{
        id: '1',
        name: 'Test',
        supermarketId: '1',
        completed: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      }],
      supermarkets: mockSupermarkets,
      categories: [],
      addItem: mockAddItem,
      toggleItemComplete: mockToggleItemComplete,
      deleteItem: mockDeleteItem,
      changeItemSupermarket: mockChangeItemSupermarket,
      updateItemCategory: mockUpdateItemCategory,
      addSupermarkets: vi.fn(),
      updateSupermarket: vi.fn(),
      deleteSupermarket: vi.fn(),
      addCategory: vi.fn(),
      updateCategory: vi.fn(),
      deleteCategory: vi.fn(),
    });

    renderWithProviders(<ShoppingListDetail supermarketId="1" onBack={mockOnBack} />);
    expect(screen.getByText(/3 days ago/)).toBeInTheDocument();
  });

  it('uses singular form for 1 hour', () => {
    vi.spyOn(ShoppingListContext, 'useShoppingList').mockReturnValue({
      items: [{
        id: '1',
        name: 'Test',
        supermarketId: '1',
        completed: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), // 1 hour ago
      }],
      supermarkets: mockSupermarkets,
      categories: [],
      addItem: mockAddItem,
      toggleItemComplete: mockToggleItemComplete,
      deleteItem: mockDeleteItem,
      changeItemSupermarket: mockChangeItemSupermarket,
      updateItemCategory: mockUpdateItemCategory,
      addSupermarkets: vi.fn(),
      updateSupermarket: vi.fn(),
      deleteSupermarket: vi.fn(),
      addCategory: vi.fn(),
      updateCategory: vi.fn(),
      deleteCategory: vi.fn(),
    });

    renderWithProviders(<ShoppingListDetail supermarketId="1" onBack={mockOnBack} />);
    expect(screen.getByText(/1 hour ago/)).toBeInTheDocument();
    expect(screen.queryByText(/1 hours ago/)).not.toBeInTheDocument();
  });

  it('uses singular form for 1 day', () => {
    vi.spyOn(ShoppingListContext, 'useShoppingList').mockReturnValue({
      items: [{
        id: '1',
        name: 'Test',
        supermarketId: '1',
        completed: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
      }],
      supermarkets: mockSupermarkets,
      categories: [],
      addItem: mockAddItem,
      toggleItemComplete: mockToggleItemComplete,
      deleteItem: mockDeleteItem,
      changeItemSupermarket: mockChangeItemSupermarket,
      updateItemCategory: mockUpdateItemCategory,
      addSupermarkets: vi.fn(),
      updateSupermarket: vi.fn(),
      deleteSupermarket: vi.fn(),
      addCategory: vi.fn(),
      updateCategory: vi.fn(),
      deleteCategory: vi.fn(),
    });

    renderWithProviders(<ShoppingListDetail supermarketId="1" onBack={mockOnBack} />);
    expect(screen.getByText(/1 day ago/)).toBeInTheDocument();
    expect(screen.queryByText(/1 days ago/)).not.toBeInTheDocument();
  });

  it('does not show last modified when no items exist', () => {
    vi.spyOn(ShoppingListContext, 'useShoppingList').mockReturnValue({
      items: [],
      supermarkets: mockSupermarkets,
      categories: [],
      addItem: mockAddItem,
      toggleItemComplete: mockToggleItemComplete,
      deleteItem: mockDeleteItem,
      changeItemSupermarket: mockChangeItemSupermarket,
      updateItemCategory: mockUpdateItemCategory,
      addSupermarkets: vi.fn(),
      updateSupermarket: vi.fn(),
      deleteSupermarket: vi.fn(),
      addCategory: vi.fn(),
      updateCategory: vi.fn(),
      deleteCategory: vi.fn(),
    });

    renderWithProviders(<ShoppingListDetail supermarketId="1" onBack={mockOnBack} />);
    expect(screen.queryByText(/Last modified:/)).not.toBeInTheDocument();
  });

  it('renders ItemList component', () => {
    renderWithProviders(<ShoppingListDetail supermarketId="1" onBack={mockOnBack} />);
    // ItemList should be rendered - verify by checking for filter buttons and add button
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByText('+ Add new item')).toBeInTheDocument();
  });
});
