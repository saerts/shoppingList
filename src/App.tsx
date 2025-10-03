import { ThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { ShoppingListProvider, useShoppingList } from './context/ShoppingListContext';
import { Header } from './components/Header';
import { SupermarketList } from './components/SupermarketList';
import { AddButton } from './components/AddButton';
import { ShoppingListDetail } from './pages/ShoppingListDetail';
import type { Supermarket } from './types';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const ContentContainer = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing.xl};
`;

const AddButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(to top, ${({ theme }) => theme.colors.background.primary} 70%, transparent);
  max-width: 600px;
  margin: 0 auto;
`;

function AppContent() {
  const { items, supermarkets, addSupermarket } = useShoppingList();
  const [currentView, setCurrentView] = useState<'home' | 'detail'>('home');
  const [selectedSupermarketId, setSelectedSupermarketId] = useState<string | undefined>();

  // Initialize with test data on first load if empty
  useEffect(() => {
    if (supermarkets.length === 0) {
      addSupermarket('Colruyt', '#FFD600');
      addSupermarket('Delhaize', '#D32F2F');
      addSupermarket('Carrefour', '#2196F3');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectSupermarket = (supermarket: Supermarket) => {
    setSelectedSupermarketId(supermarket.id);
    setCurrentView('detail');
  };

  const handleBack = () => {
    setCurrentView('home');
    setSelectedSupermarketId(undefined);
  };

  const handleAddSupermarket = () => {
    console.log('Add supermarket clicked');
    // TODO: Open modal or navigate to add supermarket view
  };

  if (currentView === 'detail' && selectedSupermarketId) {
    return <ShoppingListDetail supermarketId={selectedSupermarketId} onBack={handleBack} />;
  }

  return (
    <AppContainer>
      <Header title="Shopping Lists" />
      <ContentContainer>
        <SupermarketList
          supermarkets={supermarkets}
          items={items}
          onSelectSupermarket={handleSelectSupermarket}
        />
      </ContentContainer>
      <AddButtonContainer>
        <AddButton text="+ Add new supermarket" onClick={handleAddSupermarket} />
      </AddButtonContainer>
    </AppContainer>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ShoppingListProvider>
        <AppContent />
      </ShoppingListProvider>
    </ThemeProvider>
  );
}

export default App;
