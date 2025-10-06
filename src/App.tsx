import { ThemeProvider } from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { ShoppingListProvider, useShoppingList } from './context/ShoppingListContext';
import { Header } from './components/Header';
import { SupermarketList } from './components/SupermarketList';
import { AddButton } from './components/AddButton';
import { ShoppingListDetail } from './pages/ShoppingListDetail';
import { SupermarketManager } from './components/SupermarketManager/SupermarketManager';
import { Logo } from './components/Logo';
import type { Supermarket } from './types';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.primary};
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const HeroTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

const HeroSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  margin: 0 0 ${({ theme }) => theme.spacing.xl} 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin: 0 auto ${({ theme }) => theme.spacing.lg} auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  max-width: 600px;
  text-align: center;
`;

const EmptyStateContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  max-width: 600px;
  margin: 0 auto;
`;

const EmptyStateText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin: 0 0 ${({ theme }) => theme.spacing.xl} 0;
`;

const AddButtonContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  margin-top: auto;
`;

function AppContent() {
  const { items, supermarkets, addSupermarkets } = useShoppingList();
  const [currentView, setCurrentView] = useState<'home' | 'detail'>('home');
  const [selectedSupermarketId, setSelectedSupermarketId] = useState<string | undefined>();
  const [showManager, setShowManager] = useState(false);
  const initializedRef = useRef(false);

  // Initialize with test data on first load if empty (disabled in test environments)
  useEffect(() => {
    const isTest = (navigator as any).webdriver;
    if (supermarkets.length === 0 && !initializedRef.current && !isTest) {
      initializedRef.current = true;
      addSupermarkets([
        { name: 'Colruyt', color: '#FFD600' },
        { name: 'Delhaize', color: '#D32F2F' },
        { name: 'Carrefour', color: '#2196F3' },
      ]);
    }
  }, [supermarkets.length, addSupermarkets]);

  const handleSelectSupermarket = (supermarket: Supermarket) => {
    setSelectedSupermarketId(supermarket.id);
    setCurrentView('detail');
  };

  const handleBack = () => {
    setCurrentView('home');
    setSelectedSupermarketId(undefined);
  };

  const handleAddSupermarket = () => {
    setShowManager(true);
  };

  if (currentView === 'detail' && selectedSupermarketId) {
    return <ShoppingListDetail supermarketId={selectedSupermarketId} onBack={handleBack} />;
  }

  return (
    <>
      <AppContainer>
        <Header title="Shopping Lists" />
        <HeroSection>
          <Logo size="large" showText={false} />
          <HeroTitle>Your Shopping Lists</HeroTitle>
          <HeroSubtitle>Organize your shopping by supermarket and never forget an item again</HeroSubtitle>
        </HeroSection>
        <ContentContainer>
          {supermarkets.length > 0 ? (
            <>
              <SectionTitle>My Supermarkets</SectionTitle>
              <SupermarketList
                supermarkets={supermarkets}
                items={items}
                onSelectSupermarket={handleSelectSupermarket}
              />
            </>
          ) : (
            <EmptyStateContainer>
              <EmptyStateText>Get started by adding your first supermarket below</EmptyStateText>
            </EmptyStateContainer>
          )}
        </ContentContainer>
        <AddButtonContainer>
          <AddButton text="+ Add new supermarket" onClick={handleAddSupermarket} />
        </AddButtonContainer>
      </AppContainer>
      <SupermarketManager isOpen={showManager} onClose={() => setShowManager(false)} />
    </>
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
