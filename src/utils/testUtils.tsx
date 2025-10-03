import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

interface AllTheProvidersProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { customRender as render };
