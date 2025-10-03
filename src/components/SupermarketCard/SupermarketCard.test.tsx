import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import { SupermarketCard } from './SupermarketCard';
import type { Supermarket } from '../../types';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const mockSupermarket: Supermarket = {
  id: '1',
  name: 'Test Market',
  color: '#FFD600',
};

describe('SupermarketCard', () => {
  it('renders supermarket name', () => {
    renderWithTheme(<SupermarketCard supermarket={mockSupermarket} itemCount={0} onClick={vi.fn()} />);
    expect(screen.getByText('Test Market')).toBeInTheDocument();
  });

  it('renders item count when greater than 0', () => {
    renderWithTheme(<SupermarketCard supermarket={mockSupermarket} itemCount={5} onClick={vi.fn()} />);
    expect(screen.getByText('(5)')).toBeInTheDocument();
  });

  it('does not render item count when 0', () => {
    renderWithTheme(<SupermarketCard supermarket={mockSupermarket} itemCount={0} onClick={vi.fn()} />);
    expect(screen.queryByText('(0)')).not.toBeInTheDocument();
  });

  it('calls onClick when card is clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<SupermarketCard supermarket={mockSupermarket} itemCount={3} onClick={onClick} />);

    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledWith(mockSupermarket);
  });

  it('calls onClick when Enter key is pressed', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<SupermarketCard supermarket={mockSupermarket} itemCount={3} onClick={onClick} />);

    const card = screen.getByRole('button');
    card.focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledWith(mockSupermarket);
  });

  it('calls onClick when Space key is pressed', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<SupermarketCard supermarket={mockSupermarket} itemCount={3} onClick={onClick} />);

    const card = screen.getByRole('button');
    card.focus();
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledWith(mockSupermarket);
  });

  it('has correct aria-label', () => {
    renderWithTheme(<SupermarketCard supermarket={mockSupermarket} itemCount={3} onClick={vi.fn()} />);
    expect(screen.getByLabelText('Test Market with 3 uncompleted items')).toBeInTheDocument();
  });
});
