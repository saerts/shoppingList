import { render, screen } from '@testing-library/react';
import { ItemList } from './ItemList';
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
];

const mockItems: ShoppingItem[] = [
  { id: '1', name: 'Milk', supermarketId: '1', categoryId: 'dairy', completed: false, createdAt: new Date() },
  { id: '2', name: 'Bread', supermarketId: '1', categoryId: 'bakery', completed: true, createdAt: new Date() },
  { id: '3', name: 'Eggs', supermarketId: '1', categoryId: 'dairy', completed: false, createdAt: new Date() },
];

describe('ItemList', () => {
  it('renders all items when filter is "all"', () => {
    render(
      <ItemList
        items={mockItems}
        filter="all"
        supermarkets={mockSupermarkets}
        onToggleComplete={vi.fn()}
        onDelete={vi.fn()}
        onChangeSupermarket={vi.fn()}
      />,
      { wrapper }
    );

    expect(screen.getByText('Milk')).toBeInTheDocument();
    expect(screen.getByText('Bread')).toBeInTheDocument();
    expect(screen.getByText('Eggs')).toBeInTheDocument();
  });

  it('renders only completed items when filter is "completed"', () => {
    render(
      <ItemList
        items={mockItems}
        filter="completed"
        supermarkets={mockSupermarkets}
        onToggleComplete={vi.fn()}
        onDelete={vi.fn()}
        onChangeSupermarket={vi.fn()}
      />,
      { wrapper }
    );

    expect(screen.queryByText('Milk')).not.toBeInTheDocument();
    expect(screen.getByText('Bread')).toBeInTheDocument();
    expect(screen.queryByText('Eggs')).not.toBeInTheDocument();
  });

  it('renders only uncompleted items when filter is "uncompleted"', () => {
    render(
      <ItemList
        items={mockItems}
        filter="uncompleted"
        supermarkets={mockSupermarkets}
        onToggleComplete={vi.fn()}
        onDelete={vi.fn()}
        onChangeSupermarket={vi.fn()}
      />,
      { wrapper }
    );

    expect(screen.getByText('Milk')).toBeInTheDocument();
    expect(screen.queryByText('Bread')).not.toBeInTheDocument();
    expect(screen.getByText('Eggs')).toBeInTheDocument();
  });

  it('renders empty state when no items match filter', () => {
    const completedItems: ShoppingItem[] = [
      { id: '1', name: 'Milk', supermarketId: '1', categoryId: 'dairy', completed: true, createdAt: new Date() },
    ];

    render(
      <ItemList
        items={completedItems}
        filter="uncompleted"
        supermarkets={mockSupermarkets}
        onToggleComplete={vi.fn()}
        onDelete={vi.fn()}
        onChangeSupermarket={vi.fn()}
        emptyState={<div>No items found</div>}
      />,
      { wrapper }
    );

    expect(screen.getByText('No items found')).toBeInTheDocument();
  });

  it('renders empty state when items array is empty', () => {
    render(
      <ItemList
        items={[]}
        filter="all"
        supermarkets={mockSupermarkets}
        onToggleComplete={vi.fn()}
        onDelete={vi.fn()}
        onChangeSupermarket={vi.fn()}
        emptyState={<div>No items</div>}
      />,
      { wrapper }
    );

    expect(screen.getByText('No items')).toBeInTheDocument();
  });
});
