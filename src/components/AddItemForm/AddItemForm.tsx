import React, { useState, useEffect, useRef } from 'react';
import { FormContainer, Input, ButtonGroup, SubmitButton, CancelButton, CategorySection, CategoryLabel } from './AddItemForm.styles';
import { CategorySelector } from '../CategorySelector';
import { useShoppingList } from '../../context/ShoppingListContext';

interface AddItemFormProps {
  supermarketId: string;
  onAdd: (name: string, supermarketId: string, categoryId?: string) => void;
  onCancel: () => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({
  supermarketId,
  onAdd,
  onCancel,
}) => {
  const [value, setValue] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('other');
  const inputRef = useRef<HTMLInputElement>(null);
  const { categories } = useShoppingList();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = value.trim();
    if (trimmedValue) {
      onAdd(trimmedValue, supermarketId, selectedCategoryId);
      setValue('');
      setSelectedCategoryId('other');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter item name"
        aria-label="Item name"
      />
      <CategorySection>
        <CategoryLabel>Category</CategoryLabel>
        <CategorySelector
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />
      </CategorySection>
      <ButtonGroup>
        <CancelButton type="button" onClick={onCancel}>
          Cancel
        </CancelButton>
        <SubmitButton type="submit" disabled={!value.trim()}>
          Add
        </SubmitButton>
      </ButtonGroup>
    </FormContainer>
  );
};
