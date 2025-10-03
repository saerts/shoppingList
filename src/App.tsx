import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { ShoppingListProvider, useShoppingList } from './context/ShoppingListContext';

function AppContent() {
  const { items, supermarkets } = useShoppingList();

  console.log('Shopping Items:', items);
  console.log('Supermarkets:', supermarkets);

  return (
    <div>
      <h1>Shopping List App</h1>
      <p>Items: {items.length}</p>
      <p>Supermarkets: {supermarkets.length}</p>
    </div>
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
