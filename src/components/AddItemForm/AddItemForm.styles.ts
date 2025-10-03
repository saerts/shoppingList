import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: #2a2a2a;
  border-radius: 12px;
`;

export const Input = styled.input`
  padding: 12px;
  background: #1a1a1a;
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

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background: #FFD700;
  color: #1a1a1a;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:focus {
    outline: 2px solid #FFD700;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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
