import { LogoContainer, LogoIcon, LogoText } from './Logo.styles';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export const Logo = ({ size = 'medium', showText = true }: LogoProps) => {
  return (
    <LogoContainer $size={size}>
      <LogoIcon $size={size}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shopping cart body */}
          <path
            d="M25 30 L30 60 L75 60 L80 30 Z"
            fill="currentColor"
            opacity="0.2"
          />
          {/* Cart frame */}
          <path
            d="M20 25 L25 30 L80 30 L85 25 M30 60 L35 75 L70 75 L75 60"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Checkmark */}
          <path
            d="M40 45 L50 55 L65 35"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Wheels */}
          <circle cx="40" cy="82" r="6" fill="currentColor" />
          <circle cx="65" cy="82" r="6" fill="currentColor" />
        </svg>
      </LogoIcon>
      {showText && <LogoText $size={size}>Shopping Lists</LogoText>}
    </LogoContainer>
  );
};
