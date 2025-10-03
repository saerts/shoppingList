import styled from 'styled-components';

export const FilterContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border.light};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
`;

export const FilterPill = styled.div<{ $isActive: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.text.dark : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme, $isActive }) =>
    $isActive ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.regular};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;
  user-select: none;

  &:hover {
    background-color: ${({ theme, $isActive }) =>
      $isActive ? theme.colors.primary : theme.colors.background.secondary};
    border-color: ${({ theme, $isActive }) =>
      $isActive ? theme.colors.primary : theme.colors.border.light};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.98);
  }
`;
