import React from 'react';
import type { ShoppingItem, Supermarket } from '../../types';
import {
  CardContainer,
  CheckboxButton,
  CheckIcon,
  ItemText,
  DragHandle,
} from './ItemCard.styles';

interface ItemCardProps {
  item: ShoppingItem;
  supermarkets: Supermarket[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onChangeSupermarket: (item: ShoppingItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onToggleComplete,
  onChangeSupermarket,
}) => {
  return (
    <CardContainer>
      <CheckboxButton
        onClick={() => onToggleComplete(item.id)}
        $completed={item.completed}
        aria-label={item.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {item.completed && <CheckIcon>✓</CheckIcon>}
      </CheckboxButton>

      <ItemText $completed={item.completed}>{item.name}</ItemText>

      <DragHandle
        onClick={() => onChangeSupermarket(item)}
        aria-label="Change supermarket"
      >
        ⋮⋮
      </DragHandle>
    </CardContainer>
  );
};
