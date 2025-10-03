import { render, screen } from '@testing-library/react';
import { ItemList } from './ItemList';
import type { ShoppingItem, Supermarket } from '../../types';

const mockSupermarkets: Supermarket[] = [
  { id: '1', name: 'Lidl', color: '#0050AA', itemCount: 0 },
];

const mockItems: ShoppingItem[] = [
  { id: '1', name: 'Milk', supermarketId: '1', completed: false, createdAt: new Date() },
  { id: '2', name: 'Bread', supermarketId: '1', completed: true, createdAt: new Date() },
  { id: '3', name: 'Eggs', supermarketId: '1', completed: false, createdAt: new Date() },
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
      />
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
      />
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
      />
    );

    expect(screen.getByText('Milk')).toBeInTheDocument();
    expect(screen.queryByText('Bread')).not.toBeInTheDocument();
    expect(screen.getByText('Eggs')).toBeInTheDocument();
  });

  it('renders empty state when no items match filter', () => {
    const completedItems: ShoppingItem[] = [
      { id: '1', name: 'Milk', supermarketId: '1', completed: true, createdAt: new Date() },
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
      />
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
      />
    );

    expect(screen.getByText('No items')).toBeInTheDocument();
  });
});
