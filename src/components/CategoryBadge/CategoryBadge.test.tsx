import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategoryBadge } from './CategoryBadge';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';

const mockCategory = {
  id: 'produce',
  name: 'Produce',
  icon: '🥬',
  color: '#4CAF50',
};

describe('CategoryBadge', () => {
  it('should render category icon and name', () => {
    render(
      <ThemeProvider theme={theme}>
        <CategoryBadge category={mockCategory} />
      </ThemeProvider>
    );

    expect(screen.getByText('🥬')).toBeInTheDocument();
    expect(screen.getByText('Produce')).toBeInTheDocument();
  });

  it('should render with small size by default', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <CategoryBadge category={mockCategory} />
      </ThemeProvider>
    );

    const badge = container.querySelector('button');
    expect(badge).toBeInTheDocument();
  });

  it('should render with medium size', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <CategoryBadge category={mockCategory} size="medium" />
      </ThemeProvider>
    );

    const badge = container.querySelector('button');
    expect(badge).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <ThemeProvider theme={theme}>
        <CategoryBadge category={mockCategory} onClick={handleClick} />
      </ThemeProvider>
    );

    const badge = screen.getByRole('button');
    await user.click(badge);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not be clickable when onClick is not provided', () => {
    render(
      <ThemeProvider theme={theme}>
        <CategoryBadge category={mockCategory} />
      </ThemeProvider>
    );

    const badge = screen.getByRole('button');
    expect(badge).toBeInTheDocument();
  });
});
