import type { Supermarket, ShoppingItem } from '../../types';
import { SupermarketCard } from '../SupermarketCard';
import { ListContainer } from './SupermarketList.styles';

interface SupermarketListProps {
  supermarkets: Supermarket[];
  items: ShoppingItem[];
  onSelectSupermarket: (supermarket: Supermarket) => void;
}

export const SupermarketList = ({ supermarkets, items, onSelectSupermarket }: SupermarketListProps) => {
  const getUncompletedItemCount = (supermarketId: string): number => {
    return items.filter(item => item.supermarketId === supermarketId && !item.completed).length;
  };

  return (
    <ListContainer>
      {supermarkets.map(supermarket => (
        <SupermarketCard
          key={supermarket.id}
          supermarket={supermarket}
          itemCount={getUncompletedItemCount(supermarket.id)}
          onClick={onSelectSupermarket}
        />
      ))}
    </ListContainer>
  );
};
