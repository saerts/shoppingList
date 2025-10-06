import styled from 'styled-components';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CategoryGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 2px solid #444;
`;

export const CategoryIcon = styled.span`
  font-size: 1.25rem;
  line-height: 1;
`;

export const CategoryTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const CategoryCount = styled.span`
  font-size: 0.875rem;
  color: #888;
  margin-left: auto;
`;
