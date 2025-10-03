import React from 'react';
import type { ShoppingItem, Supermarket } from '../../types';
import { ItemCard } from '../ItemCard/ItemCard';
import { ListContainer } from './ItemList.styles';

interface ItemListProps {
  items: ShoppingItem[];
  filter: 'all' | 'completed' | 'uncompleted';
  supermarkets: Supermarket[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onChangeSupermarket: (item: ShoppingItem) => void;
  emptyState?: React.ReactNode;
}

export const ItemList: React.FC<ItemListProps> = ({
  items,
  filter,
  supermarkets,
  onToggleComplete,
  onDelete,
  onChangeSupermarket,
  emptyState,
}) => {
  const filteredItems = items.filter(item => {
    if (filter === 'completed') return item.completed;
    if (filter === 'uncompleted') return !item.completed;
    return true;
  });

  if (filteredItems.length === 0) {
    return <>{emptyState}</>;
  }

  return (
    <ListContainer>
      {filteredItems.map(item => (
        <ItemCard
          key={item.id}
          item={item}
          supermarkets={supermarkets}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onChangeSupermarket={onChangeSupermarket}
        />
      ))}
    </ListContainer>
  );
};
