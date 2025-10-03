export type Supermarket = {
  id: string;
  name: string;
  color: string;
};

export type ShoppingItem = {
  id: string;
  name: string;
  supermarketId: string;
  completed: boolean;
  createdAt: Date;
};
