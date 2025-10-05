import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: #1a1a1a;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 20px;
  border-bottom: 1px solid #2a2a2a;
`;

export const BackButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: #FFD700;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: 2px solid #FFD700;
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

export const HeaderSubtitle = styled.p`
  font-size: 14px;
  color: #888;
  margin: 4px 0 0 0;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px 20px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FilterPill = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background: ${props => props.$active ? '#FFD700' : '#2a2a2a'};
  color: ${props => props.$active ? '#1a1a1a' : '#fff'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: 2px solid #FFD700;
    outline-offset: 2px;
  }
`;

export const Content = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

export const AddButton = styled.button`
  margin: 20px;
  margin-top: auto;
  padding: 16px;
  background: #FFD700;
  color: #1a1a1a;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: 2px solid #FFD700;
    outline-offset: 2px;
  }
`;
