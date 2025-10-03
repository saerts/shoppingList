import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: flex-end;
  z-index: 1000;

  @media (min-width: 768px) {
    align-items: center;
    justify-content: center;
  }
`;

export const Modal = styled.div`
  background: #2a2a2a;
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease-out;

  @media (min-width: 768px) {
    border-radius: 20px;
    max-width: 500px;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #444;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin: 0;
`;

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #888;
  font-size: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  line-height: 1;
  transition: color 0.2s ease;

  &:hover {
    color: #fff;
  }

  &:focus {
    outline: 2px solid #FFD700;
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const SupermarketList = styled.div`
  padding: 8px;
`;

export const SupermarketButton = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: ${props => props.$isSelected ? '#3a3a3a' : 'transparent'};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #3a3a3a;
  }

  &:focus {
    outline: 2px solid #FFD700;
    outline-offset: 2px;
  }
`;

export const SupermarketName = styled.span`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

export const CheckIcon = styled.span`
  color: #FFD700;
  font-size: 20px;
  font-weight: bold;
`;
