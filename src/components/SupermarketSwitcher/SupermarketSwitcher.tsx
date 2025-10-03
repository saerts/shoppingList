import React, { useEffect } from 'react';
import type { ShoppingItem, Supermarket } from '../../types';
import {
  Overlay,
  Modal,
  Header,
  Title,
  CloseButton,
  SupermarketList,
  SupermarketButton,
  SupermarketName,
  CheckIcon,
} from './SupermarketSwitcher.styles';

interface SupermarketSwitcherProps {
  item: ShoppingItem;
  supermarkets: Supermarket[];
  onSelect: (supermarketId: string) => void;
  onClose: () => void;
}

export const SupermarketSwitcher: React.FC<SupermarketSwitcherProps> = ({
  item,
  supermarkets,
  onSelect,
  onClose,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSelect = (supermarketId: string) => {
    onSelect(supermarketId);
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Move to supermarket</Title>
          <CloseButton onClick={onClose} aria-label="Close">
            ×
          </CloseButton>
        </Header>

        <SupermarketList>
          {supermarkets.map((supermarket) => (
            <SupermarketButton
              key={supermarket.id}
              onClick={() => handleSelect(supermarket.id)}
              $isSelected={supermarket.id === item.supermarketId}
            >
              <SupermarketName>{supermarket.name}</SupermarketName>
              {supermarket.id === item.supermarketId && <CheckIcon>✓</CheckIcon>}
            </SupermarketButton>
          ))}
        </SupermarketList>
      </Modal>
    </Overlay>
  );
};
