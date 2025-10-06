import React, { useEffect } from 'react';
import type { ShoppingItem } from '../../types';
import { useShoppingList } from '../../context/ShoppingListContext';
import { CategorySelector } from '../CategorySelector';
import {
  Overlay,
  Modal,
  Header,
  Title,
  CloseButton,
  Content,
} from './CategorySwitcher.styles';

interface CategorySwitcherProps {
  item: ShoppingItem;
  onSelect: (categoryId: string) => void;
  onClose: () => void;
}

export const CategorySwitcher: React.FC<CategorySwitcherProps> = ({
  item,
  onSelect,
  onClose,
}) => {
  const { categories } = useShoppingList();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSelect = (categoryId: string) => {
    onSelect(categoryId);
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Change category</Title>
          <CloseButton onClick={onClose} aria-label="Close">
            ×
          </CloseButton>
        </Header>

        <Content>
          <CategorySelector
            categories={categories}
            selectedCategoryId={item.categoryId}
            onSelect={handleSelect}
          />
        </Content>
      </Modal>
    </Overlay>
  );
};
