import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import { SupermarketList } from './SupermarketList';
import type { Supermarket, ShoppingItem } from '../../types';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const mockSupermarkets: Supermarket[] = [
  { id: '1', name: 'Market A', color: '#FFD600' },
  { id: '2', name: 'Market B', color: '#FF5722' },
  { id: '3', name: 'Market C', color: '#4CAF50' },
];

const mockItems: ShoppingItem[] = [
  { id: '1', name: 'Item 1', supermarketId: '1', completed: false, createdAt: new Date() },
  { id: '2', name: 'Item 2', supermarketId: '1', completed: false, createdAt: new Date() },
  { id: '3', name: 'Item 3', supermarketId: '1', completed: true, createdAt: new Date() },
  { id: '4', name: 'Item 4', supermarketId: '2', completed: false, createdAt: new Date() },
  { id: '5', name: 'Item 5', supermarketId: '3', completed: true, createdAt: new Date() },
];

describe('SupermarketList', () => {
  it('renders all supermarkets', () => {
    renderWithTheme(
      <SupermarketList supermarkets={mockSupermarkets} items={mockItems} onSelectSupermarket={vi.fn()} />
    );

    expect(screen.getByText('Market A')).toBeInTheDocument();
    expect(screen.getByText('Market B')).toBeInTheDocument();
    expect(screen.getByText('Market C')).toBeInTheDocument();
  });

  it('displays correct uncompleted item counts', () => {
    renderWithTheme(
      <SupermarketList supermarkets={mockSupermarkets} items={mockItems} onSelectSupermarket={vi.fn()} />
    );

    // Market A has 2 uncompleted items
    expect(screen.getByText('(2)')).toBeInTheDocument();
    // Market B has 1 uncompleted item
    expect(screen.getByText('(1)')).toBeInTheDocument();
    // Market C has 0 uncompleted items, so no count shown
    expect(screen.queryByText('(0)')).not.toBeInTheDocument();
  });

  it('calls onSelectSupermarket when a card is clicked', async () => {
    const onSelectSupermarket = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(
      <SupermarketList supermarkets={mockSupermarkets} items={mockItems} onSelectSupermarket={onSelectSupermarket} />
    );

    await user.click(screen.getByText('Market A'));
    expect(onSelectSupermarket).toHaveBeenCalledWith(mockSupermarkets[0]);
  });

  it('renders empty list when no supermarkets', () => {
    const { container } = renderWithTheme(
      <SupermarketList supermarkets={[]} items={[]} onSelectSupermarket={vi.fn()} />
    );

    const listContainer = container.firstChild;
    expect(listContainer).toBeEmptyDOMElement();
  });

  it('handles items array being empty', () => {
    renderWithTheme(
      <SupermarketList supermarkets={mockSupermarkets} items={[]} onSelectSupermarket={vi.fn()} />
    );

    expect(screen.getByText('Market A')).toBeInTheDocument();
    expect(screen.queryByText(/\(\d+\)/)).not.toBeInTheDocument();
  });
});
