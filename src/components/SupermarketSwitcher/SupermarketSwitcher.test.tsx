import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SupermarketSwitcher } from './SupermarketSwitcher';
import type { ShoppingItem, Supermarket } from '../../types';

const mockSupermarkets: Supermarket[] = [
  { id: '1', name: 'Lidl', color: '#0050AA', itemCount: 0 },
  { id: '2', name: 'Aldi', color: '#FF6600', itemCount: 0 },
  { id: '3', name: 'Albert Heijn', color: '#0072CE', itemCount: 0 },
];

const mockItem: ShoppingItem = {
  id: '1',
  name: 'Milk',
  supermarketId: '1',
  completed: false,
  createdAt: new Date(),
};

describe('SupermarketSwitcher', () => {
  it('renders all supermarkets', () => {
    render(
      <SupermarketSwitcher
        item={mockItem}
        supermarkets={mockSupermarkets}
        onSelect={vi.fn()}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText('Lidl')).toBeInTheDocument();
    expect(screen.getByText('Aldi')).toBeInTheDocument();
    expect(screen.getByText('Albert Heijn')).toBeInTheDocument();
  });

  it('highlights current supermarket with check icon', () => {
    render(
      <SupermarketSwitcher
        item={mockItem}
        supermarkets={mockSupermarkets}
        onSelect={vi.fn()}
        onClose={vi.fn()}
      />
    );

    const lidlButton = screen.getByText('Lidl').closest('button');
    expect(lidlButton).toHaveTextContent('✓');
  });

  it('calls onSelect and onClose when supermarket is clicked', async () => {
    const user = userEvent.setup();
    const mockSelect = vi.fn();
    const mockClose = vi.fn();

    render(
      <SupermarketSwitcher
        item={mockItem}
        supermarkets={mockSupermarkets}
        onSelect={mockSelect}
        onClose={mockClose}
      />
    );

    await user.click(screen.getByText('Aldi'));

    expect(mockSelect).toHaveBeenCalledWith('2');
    expect(mockClose).toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const mockClose = vi.fn();

    render(
      <SupermarketSwitcher
        item={mockItem}
        supermarkets={mockSupermarkets}
        onSelect={vi.fn()}
        onClose={mockClose}
      />
    );

    await user.click(screen.getByLabelText('Close'));

    expect(mockClose).toHaveBeenCalled();
  });

  it('calls onClose when overlay is clicked', async () => {
    const user = userEvent.setup();
    const mockClose = vi.fn();

    const { container } = render(
      <SupermarketSwitcher
        item={mockItem}
        supermarkets={mockSupermarkets}
        onSelect={vi.fn()}
        onClose={mockClose}
      />
    );

    // Click the overlay (the outermost div)
    const overlay = container.firstChild as HTMLElement;
    await user.click(overlay);
    expect(mockClose).toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', async () => {
    const user = userEvent.setup();
    const mockClose = vi.fn();

    render(
      <SupermarketSwitcher
        item={mockItem}
        supermarkets={mockSupermarkets}
        onSelect={vi.fn()}
        onClose={mockClose}
      />
    );

    await user.keyboard('{Escape}');

    expect(mockClose).toHaveBeenCalled();
  });

  it('does not close when modal content is clicked', async () => {
    const user = userEvent.setup();
    const mockClose = vi.fn();

    render(
      <SupermarketSwitcher
        item={mockItem}
        supermarkets={mockSupermarkets}
        onSelect={vi.fn()}
        onClose={mockClose}
      />
    );

    await user.click(screen.getByText('Move to supermarket'));

    expect(mockClose).not.toHaveBeenCalled();
  });
});
