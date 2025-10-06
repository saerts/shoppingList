import React from 'react';
import type { ShoppingItem, Supermarket } from '../../types';
import {
  CardContainer,
  CheckboxButton,
  CheckIcon,
  ItemContent,
  ItemText,
  DragHandle,
  DeleteButton,
} from './ItemCard.styles';
import { CategoryBadge } from '../CategoryBadge';
import { useShoppingList } from '../../context/ShoppingListContext';

interface ItemCardProps {
  item: ShoppingItem;
  supermarkets: Supermarket[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onChangeSupermarket: (item: ShoppingItem) => void;
  onChangeCategory?: (item: ShoppingItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onToggleComplete,
  onDelete,
  onChangeSupermarket,
  onChangeCategory,
}) => {
  const { categories } = useShoppingList();
  const category = categories.find(c => c.id === item.categoryId);

  return (
    <CardContainer>
      <CheckboxButton
        onClick={() => onToggleComplete(item.id)}
        $completed={item.completed}
        aria-label={item.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {item.completed && <CheckIcon>✓</CheckIcon>}
      </CheckboxButton>

      <ItemContent>
        <ItemText $completed={item.completed}>{item.name}</ItemText>
        {category && (
          <CategoryBadge
            category={category}
            size="small"
            onClick={onChangeCategory ? () => onChangeCategory(item) : undefined}
          />
        )}
      </ItemContent>

      <DragHandle
        onClick={() => onChangeSupermarket(item)}
        aria-label="Change supermarket"
      >
        ⋮⋮
      </DragHandle>

      <DeleteButton
        onClick={() => onDelete(item.id)}
        aria-label="Delete item"
      >
        ✕
      </DeleteButton>
    </CardContainer>
  );
};
