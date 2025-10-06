import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

export const Modal = styled.div`
  background: #1a1a1a;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 2px solid #444;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #888;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Content = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
`;

export const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: #2a2a2a;
  border-radius: 8px;
`;

export const CategoryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const CategoryIcon = styled.span`
  font-size: 1.5rem;
  line-height: 1;
`;

export const CategoryName = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const DeleteButton = styled.button`
  background: transparent;
  border: 1px solid #f44336;
  color: #f44336;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f44336;
    color: #fff;
  }
`;

export const AddForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  background: #2a2a2a;
  border: 2px solid #444;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const EmojiInput = styled(Input)`
  width: 4rem;
  text-align: center;
  font-size: 1.5rem;
`;

export const ColorInput = styled.input`
  width: 4rem;
  height: 3rem;
  padding: 0.25rem;
  background: #2a2a2a;
  border: 2px solid #444;
  border-radius: 8px;
  cursor: pointer;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 6px;
  }
`;

export const AddButton = styled.button`
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #1a1a1a;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
