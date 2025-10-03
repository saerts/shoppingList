import type { Supermarket } from '../../types';
import { CardContainer, SupermarketName, ItemCount } from './SupermarketCard.styles';

interface SupermarketCardProps {
  supermarket: Supermarket;
  itemCount: number;
  onClick: (supermarket: Supermarket) => void;
}

export const SupermarketCard = ({ supermarket, itemCount, onClick }: SupermarketCardProps) => {
  return (
    <CardContainer
      onClick={() => onClick(supermarket)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(supermarket);
        }
      }}
      aria-label={`${supermarket.name} with ${itemCount} uncompleted items`}
    >
      <SupermarketName>{supermarket.name}</SupermarketName>
      {itemCount > 0 && <ItemCount>({itemCount})</ItemCount>}
    </CardContainer>
  );
};
