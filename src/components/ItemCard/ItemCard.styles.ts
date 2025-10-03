import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #2a2a2a;
  border-radius: 12px;
  min-height: 60px;
  animation: fadeSlideIn 0.3s ease-out;

  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const CheckboxButton = styled.button<{ $completed: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${props => props.$completed ? '#FFD700' : '#666'};
  background: ${props => props.$completed ? '#FFD700' : 'transparent'};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &:hover {
    border-color: #FFD700;
  }

  &:focus {
    outline: 2px solid #FFD700;
    outline-offset: 2px;
  }
`;

export const CheckIcon = styled.span`
  color: #1a1a1a;
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
  animation: checkPop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  @keyframes checkPop {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const ItemText = styled.span<{ $completed: boolean }>`
  flex: 1;
  color: ${props => props.$completed ? '#888' : '#fff'};
  font-size: 16px;
  text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
  word-break: break-word;
  transition: color 0.3s ease, text-decoration 0.3s ease;
`;

export const DragHandle = styled.button`
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  color: #666;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
  letter-spacing: -2px;

  &:hover {
    color: #FFD700;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: 2px solid #FFD700;
    outline-offset: 2px;
    border-radius: 4px;
  }
`;
