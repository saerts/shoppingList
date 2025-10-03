import { StyledButton, ButtonText, IconWrapper } from './AddButton.styles';

interface AddButtonProps {
  onClick: () => void;
  text?: string;
  icon?: React.ReactNode;
}

export const AddButton = ({ onClick, text = '+ Add new item', icon }: AddButtonProps) => {
  return (
    <StyledButton onClick={onClick} aria-label={text}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <ButtonText>{text}</ButtonText>
    </StyledButton>
  );
};
