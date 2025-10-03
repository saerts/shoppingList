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
  z-index: 2000;
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

export const Dialog = styled.div`
  background: #2a2a2a;
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  animation: scaleIn 0.2s ease-out;

  @keyframes scaleIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px 0;
`;

export const Message = styled.p`
  font-size: 16px;
  color: #ccc;
  margin: 0 0 24px 0;
  line-height: 1.5;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const CancelButton = styled.button`
  padding: 12px 24px;
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

export const ConfirmButton = styled.button<{ $variant: 'danger' | 'primary' }>`
  padding: 12px 24px;
  background: ${props => props.$variant === 'danger' ? '#FF6B6B' : '#FFD700'};
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
    outline: 2px solid ${props => props.$variant === 'danger' ? '#FF6B6B' : '#FFD700'};
    outline-offset: 2px;
  }
`;
