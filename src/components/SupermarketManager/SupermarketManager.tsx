import React, { useState, useEffect } from 'react';
import { useShoppingList } from '../../context/ShoppingListContext';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import type { Supermarket } from '../../types';
import {
  Overlay,
  Modal,
  Header,
  Title,
  CloseButton,
  Content,
  SupermarketList,
  SupermarketItem,
  SupermarketInfo,
  SupermarketName,
  SupermarketColor,
  ItemCount,
  ButtonGroup,
  EditButton,
  DeleteButton,
  AddForm,
  Input,
  FormActions,
  CancelButton,
  SaveButton,
  AddNewButton,
  EmptyMessage,
} from './SupermarketManager.styles';

interface SupermarketManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupermarketManager: React.FC<SupermarketManagerProps> = ({ isOpen, onClose }) => {
  const { supermarkets, items, addSupermarket, updateSupermarket, deleteSupermarket } = useShoppingList();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#FFD600');
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setEditingId(null);
      setShowAddForm(false);
      setName('');
      setColor('#FFD600');
      setError('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !deleteConfirm) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, deleteConfirm]);

  const handleAdd = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Please enter a supermarket name');
      return;
    }

    addSupermarket(trimmedName, color);
    setName('');
    setColor('#FFD600');
    setShowAddForm(false);
    setError('');
  };

  const handleEdit = (supermarket: Supermarket) => {
    setEditingId(supermarket.id);
    setName(supermarket.name);
    setColor(supermarket.color);
    setError('');
  };

  const handleUpdate = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Please enter a supermarket name');
      return;
    }

    if (editingId) {
      updateSupermarket(editingId, { name: trimmedName, color });
      setEditingId(null);
      setName('');
      setColor('#FFD600');
      setError('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setColor('#FFD600');
    setError('');
  };

  const handleDeleteClick = (supermarket: Supermarket) => {
    setDeleteConfirm({ id: supermarket.id, name: supermarket.name });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm) {
      deleteSupermarket(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  const getItemCount = (supermarketId: string) => {
    return items.filter(item => item.supermarketId === supermarketId).length;
  };

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={onClose}>
        <Modal onClick={(e) => e.stopPropagation()} role="dialog" aria-labelledby="manager-title">
          <Header>
            <Title id="manager-title">Manage Supermarkets</Title>
            <CloseButton onClick={onClose} aria-label="Close">
              ×
            </CloseButton>
          </Header>

          <Content>
            {supermarkets.length === 0 && !showAddForm ? (
              <EmptyMessage>
                No supermarkets yet. Add your first one!
              </EmptyMessage>
            ) : (
              <SupermarketList>
                {supermarkets.map((supermarket) => (
                  <SupermarketItem key={supermarket.id}>
                    {editingId === supermarket.id ? (
                      <AddForm>
                        <Input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Supermarket name"
                          aria-label="Supermarket name"
                          autoFocus
                        />
                        {error && <div style={{ color: '#FF6B6B', fontSize: '14px', marginTop: '4px' }}>{error}</div>}
                        <ColorPicker value={color} onChange={setColor} label="Color" />
                        <FormActions>
                          <CancelButton onClick={handleCancelEdit}>Cancel</CancelButton>
                          <SaveButton onClick={handleUpdate}>Save</SaveButton>
                        </FormActions>
                      </AddForm>
                    ) : (
                      <>
                        <SupermarketInfo>
                          <SupermarketColor $color={supermarket.color} />
                          <div>
                            <SupermarketName>{supermarket.name}</SupermarketName>
                            <ItemCount>{getItemCount(supermarket.id)} items</ItemCount>
                          </div>
                        </SupermarketInfo>
                        <ButtonGroup>
                          <EditButton onClick={() => handleEdit(supermarket)} aria-label={`Edit ${supermarket.name}`}>
                            Edit
                          </EditButton>
                          <DeleteButton onClick={() => handleDeleteClick(supermarket)} aria-label={`Delete ${supermarket.name}`}>
                            Delete
                          </DeleteButton>
                        </ButtonGroup>
                      </>
                    )}
                  </SupermarketItem>
                ))}
              </SupermarketList>
            )}

            {showAddForm ? (
              <AddForm>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Supermarket name"
                  aria-label="New supermarket name"
                  autoFocus
                />
                {error && <div style={{ color: '#FF6B6B', fontSize: '14px', marginTop: '4px' }}>{error}</div>}
                <ColorPicker value={color} onChange={setColor} label="Color" />
                <FormActions>
                  <CancelButton onClick={() => { setShowAddForm(false); setName(''); setColor('#FFD600'); setError(''); }}>
                    Cancel
                  </CancelButton>
                  <SaveButton onClick={handleAdd}>Add</SaveButton>
                </FormActions>
              </AddForm>
            ) : (
              <AddNewButton onClick={() => setShowAddForm(true)}>
                + Add New Supermarket
              </AddNewButton>
            )}
          </Content>
        </Modal>
      </Overlay>

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        title="Delete Supermarket"
        message={`Are you sure you want to delete "${deleteConfirm?.name}"? ${getItemCount(deleteConfirm?.id || '') > 0 ? 'All items in this supermarket will also be deleted.' : ''}`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirm(null)}
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="danger"
      />
    </>
  );
};
