export type Supermarket = {
  id: string;
  name: string;
  color: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type ShoppingItem = {
  id: string;
  name: string;
  supermarketId: string;
  categoryId?: string;
  completed: boolean;
  createdAt: Date;
};

export const PREDEFINED_CATEGORIES: Category[] = [
  { id: 'produce', name: 'Produce', icon: '🥬', color: '#4CAF50' },
  { id: 'dairy', name: 'Dairy', icon: '🥛', color: '#2196F3' },
  { id: 'bakery', name: 'Bakery', icon: '🥖', color: '#FF9800' },
  { id: 'meat-fish', name: 'Meat & Fish', icon: '🥩', color: '#F44336' },
  { id: 'canned', name: 'Canned Goods', icon: '🥫', color: '#795548' },
  { id: 'frozen', name: 'Frozen', icon: '🧊', color: '#00BCD4' },
  { id: 'household', name: 'Household', icon: '🧴', color: '#9C27B0' },
  { id: 'beverages', name: 'Beverages', icon: '🍷', color: '#E91E63' },
  { id: 'pasta-rice', name: 'Pasta & Rice', icon: '🍝', color: '#FFC107' },
  { id: 'snacks', name: 'Snacks', icon: '🍫', color: '#FF5722' },
  { id: 'other', name: 'Other', icon: '❓', color: '#9E9E9E' },
];
