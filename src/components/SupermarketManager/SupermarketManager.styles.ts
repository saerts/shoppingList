import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1500;
  padding: 20px;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Modal = styled.div`
  background: #2a2a2a;
  border-radius: 20px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid #444;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

export const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: #888;
  font-size: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  line-height: 1;
  transition: color 0.2s ease;

  &:hover {
    color: #fff;
  }

  &:focus {
    outline: 2px solid #FFD700;
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const Content = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`;

export const SupermarketList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

export const SupermarketItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #1a1a1a;
  border-radius: 12px;
  gap: 12px;
`;

export const SupermarketInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

export const SupermarketColor = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$color};
  flex-shrink: 0;
`;

export const SupermarketName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
`;

export const ItemCount = styled.div`
  font-size: 14px;
  color: #888;
  margin-top: 2px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const EditButton = styled.button`
  padding: 8px 16px;
  background: transparent;
  color: #FFD700;
  border: 1px solid #FFD700;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #FFD700;
    color: #1a1a1a;
  }

  &:focus {
    outline: 2px solid #FFD700;
    outline-offset: 2px;
  }
`;

export const DeleteButton = styled.button`
  padding: 8px 16px;
  background: transparent;
  color: #FF6B6B;
  border: 1px solid #FF6B6B;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #FF6B6B;
    color: #fff;
  }

  &:focus {
    outline: 2px solid #FF6B6B;
    outline-offset: 2px;
  }
`;

export const AddForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background: #1a1a1a;
  border-radius: 12px;
`;

export const Input = styled.input`
  padding: 12px;
  background: #2a2a2a;
  border: 2px solid #444;
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: #666;
  }

  &:focus {
    border-color: #FFD700;
  }
`;

export const FormActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  background: transparent;
  color: #888;
  border: 1px solid #444;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #fff;
    border-color: #666;
  }

  &:focus {
    outline: 2px solid #FFD700;
    outline-offset: 2px;
  }
`;

export const SaveButton = styled.button`
  padding: 10px 20px;
  background: #FFD700;
  color: #1a1a1a;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: 2px solid #FFD700;
    outline-offset: 2px;
  }
`;

export const AddNewButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #FFD700;
  color: #1a1a1a;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: 2px solid #FFD700;
    outline-offset: 2px;
  }
`;

export const EmptyMessage = styled.div`
  text-align: center;
  color: #888;
  font-size: 16px;
  padding: 40px 20px;
`;
