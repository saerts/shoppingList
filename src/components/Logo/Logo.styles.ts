import styled from 'styled-components';

const sizeMap = {
  small: {
    icon: '32px',
    text: '1rem',
  },
  medium: {
    icon: '64px',
    text: '1.5rem',
  },
  large: {
    icon: '96px',
    text: '2rem',
  },
};

export const LogoContainer = styled.div<{ $size: 'small' | 'medium' | 'large' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const LogoIcon = styled.div<{ $size: 'small' | 'medium' | 'large' }>`
  width: ${({ $size }) => sizeMap[$size].icon};
  height: ${({ $size }) => sizeMap[$size].icon};
  color: ${({ theme }) => theme.colors.primary};

  svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 4px 8px rgba(255, 214, 0, 0.3));
  }
`;

export const LogoText = styled.span<{ $size: 'small' | 'medium' | 'large' }>`
  font-size: ${({ $size }) => sizeMap[$size].text};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  letter-spacing: -0.5px;
`;
