import { renderHook, act } from '@testing-library/react';
import { ShoppingListProvider, useShoppingList } from './ShoppingListContext';
import { ReactNode } from 'react';
import { vi } from 'vitest';

describe('ShoppingListContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <ShoppingListProvider>{children}</ShoppingListProvider>
  );

  describe('useShoppingList hook', () => {
    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useShoppingList());
      }).toThrow('useShoppingList must be used within a ShoppingListProvider');

      consoleErrorSpy.mockRestore();
    });

    it('should return context when used inside provider', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      expect(result.current).toHaveProperty('items');
      expect(result.current).toHaveProperty('supermarkets');
      expect(result.current).toHaveProperty('addItem');
      expect(result.current).toHaveProperty('addSupermarket');
    });
  });

  describe('Initial state', () => {
    it('should start with empty items and supermarkets', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      expect(result.current.items).toEqual([]);
      expect(result.current.supermarkets).toEqual([]);
    });

    it('should start with predefined categories', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      expect(result.current.categories).toHaveLength(11);
      expect(result.current.categories.find(c => c.id === 'produce')).toBeDefined();
      expect(result.current.categories.find(c => c.id === 'other')).toBeDefined();
    });
  });

  describe('Supermarket operations', () => {
    it('should add a supermarket', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addSupermarket('Walmart', '#0071ce');
      });

      expect(result.current.supermarkets).toHaveLength(1);
      expect(result.current.supermarkets[0]).toMatchObject({
        name: 'Walmart',
        color: '#0071ce',
      });
      expect(result.current.supermarkets[0].id).toBeDefined();
    });

    it('should add multiple supermarkets', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addSupermarket('Walmart', '#0071ce');
      });

      act(() => {
        result.current.addSupermarket('Target', '#cc0000');
      });

      expect(result.current.supermarkets).toHaveLength(2);
      expect(result.current.supermarkets[0].name).toBe('Walmart');
      expect(result.current.supermarkets[1].name).toBe('Target');
    });

    it('should update a supermarket', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addSupermarket('Walmart', '#0071ce');
      });

      const supermarketId = result.current.supermarkets[0].id;

      act(() => {
        result.current.updateSupermarket(supermarketId, { name: 'Walmart Supercenter' });
      });

      expect(result.current.supermarkets[0].name).toBe('Walmart Supercenter');
      expect(result.current.supermarkets[0].color).toBe('#0071ce');
    });

    it('should delete a supermarket', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addSupermarket('Walmart', '#0071ce');
      });

      act(() => {
        result.current.addSupermarket('Target', '#cc0000');
      });

      const supermarketId = result.current.supermarkets[0].id;

      act(() => {
        result.current.deleteSupermarket(supermarketId);
      });

      expect(result.current.supermarkets).toHaveLength(1);
      expect(result.current.supermarkets[0].name).toBe('Target');
    });

    it('should delete all items when deleting a supermarket', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addSupermarket('Walmart', '#0071ce');
      });

      act(() => {
        result.current.addSupermarket('Target', '#cc0000');
      });

      const walmartId = result.current.supermarkets[0].id;
      const targetId = result.current.supermarkets[1].id;

      act(() => {
        result.current.addItem('Milk', walmartId);
      });

      act(() => {
        result.current.addItem('Bread', walmartId);
      });

      act(() => {
        result.current.addItem('Eggs', targetId);
      });

      expect(result.current.items).toHaveLength(3);

      act(() => {
        result.current.deleteSupermarket(walmartId);
      });

      expect(result.current.supermarkets).toHaveLength(1);
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].name).toBe('Eggs');
      expect(result.current.items[0].supermarketId).toBe(targetId);
    });
  });

  describe('Item operations', () => {
    it('should add an item', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addSupermarket('Walmart', '#0071ce');
      });

      const supermarketId = result.current.supermarkets[0].id;

      act(() => {
        result.current.addItem('Milk', supermarketId);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toMatchObject({
        name: 'Milk',
        supermarketId,
        completed: false,
      });
      expect(result.current.items[0].id).toBeDefined();
      expect(result.current.items[0].createdAt).toBeInstanceOf(Date);
    });

    it('should add multiple items', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addSupermarket('Walmart', '#0071ce');
      });

      const supermarketId = result.current.supermarkets[0].id;

      act(() => {
        result.current.addItem('Milk', supermarketId);
      });

      act(() => {
        result.current.addItem('Bread', supermarketId);
      });

      act(() => {
        result.current.addItem('Eggs', supermarketId);
      });

      expect(result.current.items).toHaveLength(3);
      expect(result.current.items[0].name).toBe('Milk');
      expect(result.current.items[1].name).toBe('Bread');
      expect(result.current.items[2].name).toBe('Eggs');
    });

    it('should update an item', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addSupermarket('Walmart', '#0071ce');
      });

      const supermarketId = result.current.supermarkets[0].id;

      act(() => {
        result.current.addItem('Milk', supermarketId);
      });

      const itemId = result.current.items[0].id;

      act(() => {
        result.current.updateItem(itemId, { name: 'Whole Milk' });
      });

      expect(result.current.items[0].name).toBe('Whole Milk');
      expect(result.current.items[0].supermarketId).toBe(supermarketId);
    });

    it('should delete an item', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addSupermarket('Walmart', '#0071ce');
      });

      const supermarketId = result.current.supermarkets[0].id;

      act(() => {
        result.current.addItem('Milk', supermarketId);
      });

      act(() => {
        result.current.addItem('Bread', supermarketId);
      });

      const itemId = result.current.items[0].id;

      act(() => {
        result.current.deleteItem(itemId);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].name).toBe('Bread');
    });

    it('should toggle item completion', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addSupermarket('Walmart', '#0071ce');
      });

      const supermarketId = result.current.supermarkets[0].id;

      act(() => {
        result.current.addItem('Milk', supermarketId);
      });

      const itemId = result.current.items[0].id;

      expect(result.current.items[0].completed).toBe(false);

      act(() => {
        result.current.toggleItemComplete(itemId);
      });

      expect(result.current.items[0].completed).toBe(true);

      act(() => {
        result.current.toggleItemComplete(itemId);
      });

      expect(result.current.items[0].completed).toBe(false);
    });

    it('should change item supermarket', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addSupermarket('Walmart', '#0071ce');
      });

      act(() => {
        result.current.addSupermarket('Target', '#cc0000');
      });

      const walmartId = result.current.supermarkets[0].id;
      const targetId = result.current.supermarkets[1].id;

      act(() => {
        result.current.addItem('Milk', walmartId);
      });

      const itemId = result.current.items[0].id;

      expect(result.current.items[0].supermarketId).toBe(walmartId);

      act(() => {
        result.current.changeItemSupermarket(itemId, targetId);
      });

      expect(result.current.items[0].supermarketId).toBe(targetId);
    });
  });

  describe('LocalStorage persistence', () => {
    it('should persist items to localStorage', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addSupermarket('Walmart', '#0071ce');
      });

      const supermarketId = result.current.supermarkets[0].id;

      act(() => {
        result.current.addItem('Milk', supermarketId);
      });

      const storedItems = JSON.parse(localStorage.getItem('shopping-items') || '[]');
      expect(storedItems).toHaveLength(1);
      expect(storedItems[0].name).toBe('Milk');
    });

    it('should persist supermarkets to localStorage', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addSupermarket('Walmart', '#0071ce');
      });

      const storedSupermarkets = JSON.parse(localStorage.getItem('shopping-supermarkets') || '[]');
      expect(storedSupermarkets).toHaveLength(1);
      expect(storedSupermarkets[0].name).toBe('Walmart');
    });

    it('should load items from localStorage on mount', () => {
      const testItem = {
        id: 'test-id',
        name: 'Milk',
        supermarketId: 'walmart-id',
        completed: false,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('shopping-items', JSON.stringify([testItem]));

      const { result } = renderHook(() => useShoppingList(), { wrapper });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].name).toBe('Milk');
    });

    it('should load supermarkets from localStorage on mount', () => {
      const testSupermarket = {
        id: 'walmart-id',
        name: 'Walmart',
        color: '#0071ce',
      };

      localStorage.setItem('shopping-supermarkets', JSON.stringify([testSupermarket]));

      const { result } = renderHook(() => useShoppingList(), { wrapper });

      expect(result.current.supermarkets).toHaveLength(1);
      expect(result.current.supermarkets[0].name).toBe('Walmart');
    });
  });

  describe('Category operations', () => {
    it('should add an item with a category', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addSupermarket('Walmart', '#0071ce');
      });

      const supermarketId = result.current.supermarkets[0].id;

      act(() => {
        result.current.addItem('Milk', supermarketId, 'dairy');
      });

      expect(result.current.items[0].categoryId).toBe('dairy');
    });

    it('should default to "other" category if none specified', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addSupermarket('Walmart', '#0071ce');
      });

      const supermarketId = result.current.supermarkets[0].id;

      act(() => {
        result.current.addItem('Unknown Item', supermarketId);
      });

      expect(result.current.items[0].categoryId).toBe('other');
    });

    it('should update item category', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addSupermarket('Walmart', '#0071ce');
      });

      const supermarketId = result.current.supermarkets[0].id;

      act(() => {
        result.current.addItem('Milk', supermarketId, 'other');
      });

      const itemId = result.current.items[0].id;

      act(() => {
        result.current.updateItemCategory(itemId, 'dairy');
      });

      expect(result.current.items[0].categoryId).toBe('dairy');
    });

    it('should add a custom category', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addCategory('Pet Supplies', '🐾', '#FFA500');
      });

      expect(result.current.categories).toHaveLength(12);
      const petCategory = result.current.categories.find(c => c.name === 'Pet Supplies');
      expect(petCategory).toBeDefined();
      expect(petCategory?.icon).toBe('🐾');
      expect(petCategory?.color).toBe('#FFA500');
    });

    it('should update a category', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addCategory('Pet Supplies', '🐾', '#FFA500');
      });

      const categoryId = result.current.categories.find(c => c.name === 'Pet Supplies')?.id;

      act(() => {
        result.current.updateCategory(categoryId!, { name: 'Pet Care' });
      });

      const updatedCategory = result.current.categories.find(c => c.id === categoryId);
      expect(updatedCategory?.name).toBe('Pet Care');
      expect(updatedCategory?.icon).toBe('🐾');
    });

    it('should delete a category and move items to "other"', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addSupermarket('Walmart', '#0071ce');
      });

      const supermarketId = result.current.supermarkets[0].id;

      act(() => {
        result.current.addCategory('Pet Supplies', '🐾', '#FFA500');
      });

      const petCategoryId = result.current.categories.find(c => c.name === 'Pet Supplies')?.id;

      act(() => {
        result.current.addItem('Dog Food', supermarketId, petCategoryId);
      });

      act(() => {
        result.current.addItem('Cat Litter', supermarketId, petCategoryId);
      });

      expect(result.current.items[0].categoryId).toBe(petCategoryId);
      expect(result.current.items[1].categoryId).toBe(petCategoryId);

      act(() => {
        result.current.deleteCategory(petCategoryId);
      });

      expect(result.current.categories.find(c => c.id === petCategoryId)).toBeUndefined();
      expect(result.current.items[0].categoryId).toBe('other');
      expect(result.current.items[1].categoryId).toBe('other');
    });

    it('should persist categories to localStorage', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addCategory('Pet Supplies', '🐾', '#FFA500');
      });

      const storedCategories = JSON.parse(localStorage.getItem('shopping-categories') || '[]');
      expect(storedCategories).toHaveLength(12);
      expect(storedCategories.find((c: never) => c.name === 'Pet Supplies')).toBeDefined();
    });
  });

  describe('Edge cases', () => {
    it('should handle updating non-existent item gracefully', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addSupermarket('Walmart', '#0071ce');
      });

      const supermarketId = result.current.supermarkets[0].id;

      act(() => {
        result.current.addItem('Milk', supermarketId);
      });

      act(() => {
        result.current.updateItem('non-existent-id', { name: 'Updated' });
      });

      expect(result.current.items[0].name).toBe('Milk');
    });

    it('should handle deleting non-existent item gracefully', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addSupermarket('Walmart', '#0071ce');
      });

      const supermarketId = result.current.supermarkets[0].id;

      act(() => {
        result.current.addItem('Milk', supermarketId);
      });

      act(() => {
        result.current.deleteItem('non-existent-id');
      });

      expect(result.current.items).toHaveLength(1);
    });

    it('should handle toggling non-existent item gracefully', () => {
      const { result } = renderHook(() => useShoppingList(), { wrapper });

      act(() => {
        result.current.addSupermarket('Walmart', '#0071ce');
      });

      const supermarketId = result.current.supermarkets[0].id;

      act(() => {
        result.current.addItem('Milk', supermarketId);
      });

      act(() => {
        result.current.toggleItemComplete('non-existent-id');
      });

      expect(result.current.items[0].completed).toBe(false);
    });
  });
});
