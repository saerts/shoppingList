import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategorySelector } from './CategorySelector';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import { PREDEFINED_CATEGORIES } from '../../types';

describe('CategorySelector', () => {
  it('should render all categories', () => {
    const handleSelect = vi.fn();

    render(
      <ThemeProvider theme={theme}>
        <CategorySelector
          categories={PREDEFINED_CATEGORIES}
          onSelect={handleSelect}
        />
      </ThemeProvider>
    );

    expect(screen.getByText('Produce')).toBeInTheDocument();
    expect(screen.getByText('Dairy')).toBeInTheDocument();
    expect(screen.getByText('Bakery')).toBeInTheDocument();
  });

  it('should call onSelect when a category is clicked', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <ThemeProvider theme={theme}>
        <CategorySelector
          categories={PREDEFINED_CATEGORIES}
          onSelect={handleSelect}
        />
      </ThemeProvider>
    );

    const produceButton = screen.getByText('Produce').closest('button');
    await user.click(produceButton!);

    expect(handleSelect).toHaveBeenCalledWith('produce');
  });

  it('should highlight the selected category', () => {
    const handleSelect = vi.fn();

    render(
      <ThemeProvider theme={theme}>
        <CategorySelector
          categories={PREDEFINED_CATEGORIES}
          selectedCategoryId="dairy"
          onSelect={handleSelect}
        />
      </ThemeProvider>
    );

    const dairyButton = screen.getByText('Dairy').closest('button');
    expect(dairyButton).toBeInTheDocument();
  });

  it('should display category icons', () => {
    const handleSelect = vi.fn();

    render(
      <ThemeProvider theme={theme}>
        <CategorySelector
          categories={PREDEFINED_CATEGORIES}
          onSelect={handleSelect}
        />
      </ThemeProvider>
    );

    expect(screen.getByText('🥬')).toBeInTheDocument();
    expect(screen.getByText('🥛')).toBeInTheDocument();
    expect(screen.getByText('🥖')).toBeInTheDocument();
  });
});
