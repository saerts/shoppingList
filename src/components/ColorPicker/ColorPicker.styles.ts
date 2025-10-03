import styled from 'styled-components';

export const Label = styled.label`
  display: block;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const Container = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const ColorOption = styled.button<{ $color: string; $selected: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${props => props.$color};
  border: 3px solid ${props => props.$selected ? '#FFD700' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 2px solid ${props => props.$selected ? '#FFD700' : 'transparent'};
  }

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: 2px solid #FFD700;
    outline-offset: 4px;
  }
`;
