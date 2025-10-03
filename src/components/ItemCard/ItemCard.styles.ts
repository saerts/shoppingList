import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #2a2a2a;
  border-radius: 12px;
  min-height: 60px;
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
`;

export const ItemText = styled.span<{ $completed: boolean }>`
  flex: 1;
  color: ${props => props.$completed ? '#888' : '#fff'};
  font-size: 16px;
  text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
  word-break: break-word;
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
  transition: color 0.2s ease;
  letter-spacing: -2px;

  &:hover {
    color: #FFD700;
  }

  &:focus {
    outline: 2px solid #FFD700;
    outline-offset: 2px;
    border-radius: 4px;
  }
`;
