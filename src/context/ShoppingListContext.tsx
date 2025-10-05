import { createContext, useContext, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { ShoppingItem, Supermarket } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ShoppingListState {
  items: ShoppingItem[];
  supermarkets: Supermarket[];
}

interface ShoppingListContextType extends ShoppingListState {
  addItem: (name: string, supermarketId: string) => void;
  updateItem: (id: string, updates: Partial<ShoppingItem>) => void;
  deleteItem: (id: string) => void;
  toggleItemComplete: (id: string) => void;
  changeItemSupermarket: (itemId: string, newSupermarketId: string) => void;
  addSupermarket: (name: string, color: string) => void;
  addSupermarkets: (supermarkets: Array<{ name: string; color: string }>) => void;
  updateSupermarket: (id: string, updates: Partial<Supermarket>) => void;
  deleteSupermarket: (id: string) => void;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

interface ShoppingListProviderProps {
  children: ReactNode;
}

const INITIAL_STATE: ShoppingListState = {
  items: [],
  supermarkets: [],
};

export function ShoppingListProvider({ children }: ShoppingListProviderProps) {
  const [items, setItems] = useLocalStorage<ShoppingItem[]>('shopping-items', INITIAL_STATE.items);
  const [supermarkets, setSupermarkets] = useLocalStorage<Supermarket[]>(
    'shopping-supermarkets',
    INITIAL_STATE.supermarkets
  );

  const addItem = (name: string, supermarketId: string) => {
    const newItem: ShoppingItem = {
      id: crypto.randomUUID(),
      name,
      supermarketId,
      completed: false,
      createdAt: new Date(),
    };
    setItems((prev) => [...prev, newItem]);
  };

  const updateItem = (id: string, updates: Partial<ShoppingItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleItemComplete = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const changeItemSupermarket = (itemId: string, newSupermarketId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, supermarketId: newSupermarketId } : item
      )
    );
  };

  const addSupermarket = useCallback((name: string, color: string) => {
    const newSupermarket: Supermarket = {
      id: crypto.randomUUID(),
      name,
      color,
    };
    setSupermarkets((prev) => [...prev, newSupermarket]);
  }, [setSupermarkets]);

  const addSupermarkets = useCallback((supermarketsToAdd: Array<{ name: string; color: string }>) => {
    const newSupermarkets: Supermarket[] = supermarketsToAdd.map(s => ({
      id: crypto.randomUUID(),
      name: s.name,
      color: s.color,
    }));
    setSupermarkets((prev) => [...prev, ...newSupermarkets]);
  }, [setSupermarkets]);

  const updateSupermarket = (id: string, updates: Partial<Supermarket>) => {
    setSupermarkets((prev) =>
      prev.map((supermarket) =>
        supermarket.id === id ? { ...supermarket, ...updates } : supermarket
      )
    );
  };

  const deleteSupermarket = (id: string) => {
    // Delete the supermarket
    setSupermarkets((prev) => prev.filter((supermarket) => supermarket.id !== id));

    // Also delete all items associated with this supermarket
    setItems((prev) => prev.filter((item) => item.supermarketId !== id));
  };

  const value: ShoppingListContextType = {
    items,
    supermarkets,
    addItem,
    updateItem,
    deleteItem,
    toggleItemComplete,
    changeItemSupermarket,
    addSupermarket,
    addSupermarkets,
    updateSupermarket,
    deleteSupermarket,
  };

  return (
    <ShoppingListContext.Provider value={value}>
      {children}
    </ShoppingListContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useShoppingList(): ShoppingListContextType {
  const context = useContext(ShoppingListContext);
  if (context === undefined) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
}
