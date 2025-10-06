import styled from 'styled-components';

export const Badge = styled.button<{
  color: string;
  size: 'small' | 'medium';
  $clickable: boolean;
}>`
    display: inline-flex;
    align-items: center;
    gap: ${({size}) => (size === 'small' ? '0.25rem' : '0.5rem')};
    padding: ${({size}) => (size === 'small' ? '0.25rem 0.5rem' : '0.5rem 0.75rem')};
    background-color: ${({color}) => `${color}15`};
    border: 1px solid ${({color}) => `${color}40`};
    border-radius: 12px;
    font-size: ${({size}) => (size === 'small' ? '0.75rem' : '0.875rem')};
    font-weight: 500;
    color: ${({theme}) => theme.colors.text};
    cursor: ${({$clickable}) => ($clickable ? 'pointer' : 'default')};
    transition: all 0.2s ease;
    width: fit-content;

    .icon {
        font-size: ${({size}) => (size === 'small' ? '0.875rem' : '1rem')};
        line-height: 1;
    }

    .name {
        line-height: 1;
    }

    &:hover {
        ${({$clickable, color}) =>
                $clickable &&
                `
      background-color: ${color}25;
      border-color: ${color}60;
      transform: translateY(-1px);
    `}
    }

    &:active {
        ${({$clickable}) =>
                $clickable &&
                `
      transform: translateY(0);
    `}
    }
`;
