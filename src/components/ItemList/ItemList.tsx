import React from 'react';
import type { ShoppingItem, Supermarket } from '../../types';
import { ItemCard } from '../ItemCard/ItemCard';
import { ListContainer, CategoryGroup, CategoryHeader, CategoryIcon, CategoryTitle, CategoryCount } from './ItemList.styles';
import { useShoppingList } from '../../context/ShoppingListContext';

interface ItemListProps {
  items: ShoppingItem[];
  filter: 'all' | 'completed' | 'uncompleted';
  supermarkets: Supermarket[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onChangeSupermarket: (item: ShoppingItem) => void;
  onChangeCategory?: (item: ShoppingItem) => void;
  emptyState?: React.ReactNode;
}

export const ItemList: React.FC<ItemListProps> = ({
  items,
  filter,
  supermarkets,
  onToggleComplete,
  onDelete,
  onChangeSupermarket,
  onChangeCategory,
  emptyState,
}) => {
  const { categories } = useShoppingList();

  const filteredItems = items.filter(item => {
    if (filter === 'completed') return item.completed;
    if (filter === 'uncompleted') return !item.completed;
    return true;
  });

  if (filteredItems.length === 0) {
    return <>{emptyState}</>;
  }

  // Group items by category
  const itemsByCategory = filteredItems.reduce((acc, item) => {
    const categoryId = item.categoryId || 'other';
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(item);
    return acc;
  }, {} as Record<string, ShoppingItem[]>);

  // Sort items within each category: uncompleted first, then completed
  Object.keys(itemsByCategory).forEach(categoryId => {
    itemsByCategory[categoryId].sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    });
  });

  // Sort categories by predefined order
  const sortedCategories = categories
    .filter(category => itemsByCategory[category.id])
    .sort((a, b) => {
      // Keep "Other" last
      if (a.id === 'other') return 1;
      if (b.id === 'other') return -1;
      return 0;
    });

  return (
    <ListContainer>
      {sortedCategories.map(category => (
        <CategoryGroup key={category.id}>
          <CategoryHeader>
            <CategoryIcon>{category.icon}</CategoryIcon>
            <CategoryTitle>{category.name}</CategoryTitle>
            <CategoryCount>({itemsByCategory[category.id].length})</CategoryCount>
          </CategoryHeader>
          {itemsByCategory[category.id].map(item => (
            <ItemCard
              key={item.id}
              item={item}
              supermarkets={supermarkets}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onChangeSupermarket={onChangeSupermarket}
              onChangeCategory={onChangeCategory}
            />
          ))}
        </CategoryGroup>
      ))}
    </ListContainer>
  );
};
