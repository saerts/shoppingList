import React, { useState, useEffect, useRef } from 'react';
import { FormContainer, Input, ButtonGroup, SubmitButton, CancelButton } from './AddItemForm.styles';

interface AddItemFormProps {
  supermarketId: string;
  onAdd: (name: string, supermarketId: string) => void;
  onCancel: () => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({
  supermarketId,
  onAdd,
  onCancel,
}) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = value.trim();
    if (trimmedValue) {
      onAdd(trimmedValue, supermarketId);
      setValue('');
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
