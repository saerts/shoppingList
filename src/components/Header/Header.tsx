import { HeaderContainer, BackButton, Title, MenuButton } from './Header.styles';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  onMenuClick?: () => void;
}

export const Header = ({ title, showBackButton = false, onBack, onMenuClick }: HeaderProps) => {
  return (
    <HeaderContainer>
      {showBackButton && (
        <BackButton onClick={onBack} aria-label="Go back">
          ←
        </BackButton>
      )}
      <Title>{title}</Title>
      <MenuButton onClick={onMenuClick} aria-label="Open menu">
        ⋮
      </MenuButton>
    </HeaderContainer>
  );
};
