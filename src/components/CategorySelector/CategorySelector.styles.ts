import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.75rem;
`;

export const CategoryCard = styled.button<{
  color: string;
  $selected: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: ${({ color, $selected }) =>
    $selected ? `${color}30` : `${color}15`};
  border: 2px solid
    ${({ color, $selected }) => ($selected ? color : `${color}40`)};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ color }) => `${color}25`};
    border-color: ${({ color }) => `${color}60`};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CategoryIcon = styled.div`
  font-size: 2rem;
  line-height: 1;
`;

export const CategoryName = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  line-height: 1.2;
`;
