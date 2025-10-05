import { HeaderContainer, BackButton, Title } from './Header.styles';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export const Header = ({ title, showBackButton = false, onBack }: HeaderProps) => {
  return (
    <HeaderContainer>
      {showBackButton && (
        <BackButton onClick={onBack} aria-label="Go back">
          ←
        </BackButton>
      )}
      <Title $centered={!showBackButton}>{title}</Title>
    </HeaderContainer>
  );
};
