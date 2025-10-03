import React, { useState } from 'react';
import { useShoppingList } from '../context/ShoppingListContext';
import { ItemList } from '../components/ItemList/ItemList';
import { AddItemForm } from '../components/AddItemForm/AddItemForm';
import { SupermarketSwitcher } from '../components/SupermarketSwitcher/SupermarketSwitcher';
import { EmptyState } from '../components/EmptyState/EmptyState';
import type { ShoppingItem } from '../types';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  HeaderSubtitle,
  FilterContainer,
  FilterPill,
  Content,
  AddButton,
} from './ShoppingListDetail.styles';

interface ShoppingListDetailProps {
  supermarketId: string;
  onBack: () => void;
}

type FilterType = 'all' | 'completed' | 'uncompleted';

export const ShoppingListDetail: React.FC<ShoppingListDetailProps> = ({
  supermarketId,
  onBack,
}) => {
  const { items: allItems, supermarkets, addItem, toggleItemComplete, deleteItem, changeItemSupermarket } = useShoppingList();
  const [filter, setFilter] = useState<FilterType>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [switcherItem, setSwitcherItem] = useState<ShoppingItem | null>(null);

  const supermarket = supermarkets.find(s => s.id === supermarketId);
  const items = allItems.filter(item => item.supermarketId === supermarketId);

  if (!supermarket) {
    return (
      <Container>
        <EmptyState message="Supermarket not found" icon="⚠️" />
      </Container>
    );
  }

  const handleAddItem = (name: string, supermarketId: string) => {
    addItem(name, supermarketId);
    setShowAddForm(false);
  };

  const handleChangeSupermarket = (newSupermarketId: string) => {
    if (switcherItem) {
      changeItemSupermarket(switcherItem.id, newSupermarketId);
    }
  };

  const getLastModified = () => {
    if (items.length === 0) return '';
    const sortedItems = [...items].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const lastItem = sortedItems[0];
    const date = new Date(lastItem.createdAt);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack} aria-label="Go back">
          ←
        </BackButton>
        <div>
          <HeaderTitle>Shopping list ({items.length})</HeaderTitle>
          {items.length > 0 && (
            <HeaderSubtitle>Last modified: {getLastModified()}</HeaderSubtitle>
          )}
        </div>
      </Header>

      <FilterContainer>
        <FilterPill
          $active={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          All
        </FilterPill>
        <FilterPill
          $active={filter === 'completed'}
          onClick={() => setFilter('completed')}
        >
          Completed
        </FilterPill>
        <FilterPill
          $active={filter === 'uncompleted'}
          onClick={() => setFilter('uncompleted')}
        >
          Uncompleted
        </FilterPill>
      </FilterContainer>

      <Content>
        {showAddForm && (
          <AddItemForm
            supermarketId={supermarketId}
            onAdd={handleAddItem}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        <ItemList
          items={items}
          filter={filter}
          supermarkets={supermarkets}
          onToggleComplete={toggleItemComplete}
          onDelete={deleteItem}
          onChangeSupermarket={setSwitcherItem}
          emptyState={
            <EmptyState
              message={
                filter === 'all'
                  ? 'No items yet. Add your first item!'
                  : `No ${filter} items`
              }
              icon="📝"
            />
          }
        />
      </Content>

      {!showAddForm && (
        <AddButton onClick={() => setShowAddForm(true)}>
          + Add new item
        </AddButton>
      )}

      {switcherItem && (
        <SupermarketSwitcher
          item={switcherItem}
          supermarkets={supermarkets}
          onSelect={handleChangeSupermarket}
          onClose={() => setSwitcherItem(null)}
        />
      )}
    </Container>
  );
};
