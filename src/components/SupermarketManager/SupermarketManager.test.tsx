import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SupermarketManager } from './SupermarketManager';
import { ShoppingListProvider } from '../../context/ShoppingListContext';

const renderWithProvider = (component: React.ReactElement) => {
  return render(<ShoppingListProvider>{component}</ShoppingListProvider>);
};

describe('SupermarketManager', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('does not render when isOpen is false', () => {
    renderWithProvider(<SupermarketManager isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByText('Manage Supermarkets')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    renderWithProvider(<SupermarketManager isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('Manage Supermarkets')).toBeInTheDocument();
  });

  it('shows empty message when no supermarkets exist', () => {
    renderWithProvider(<SupermarketManager isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('No supermarkets yet. Add your first one!')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const mockClose = vi.fn();

    renderWithProvider(<SupermarketManager isOpen={true} onClose={mockClose} />);
    await user.click(screen.getByLabelText('Close'));
    expect(mockClose).toHaveBeenCalled();
  });

  it('shows add form when Add New Supermarket button is clicked', async () => {
    const user = userEvent.setup();

    renderWithProvider(<SupermarketManager isOpen={true} onClose={vi.fn()} />);
    await user.click(screen.getByText('+ Add New Supermarket'));
    expect(screen.getByPlaceholderText('Supermarket name')).toBeInTheDocument();
  });

  it('adds a new supermarket', async () => {
    const user = userEvent.setup();

    renderWithProvider(<SupermarketManager isOpen={true} onClose={vi.fn()} />);

    await user.click(screen.getByText('+ Add New Supermarket'));
    await user.type(screen.getByPlaceholderText('Supermarket name'), 'Walmart');
    await user.click(screen.getByText('Add'));

    expect(screen.getByText('Walmart')).toBeInTheDocument();
  });

  it('shows error when trying to add empty name', async () => {
    const user = userEvent.setup();

    renderWithProvider(<SupermarketManager isOpen={true} onClose={vi.fn()} />);

    await user.click(screen.getByText('+ Add New Supermarket'));
    await user.click(screen.getByText('Add'));

    expect(screen.getByText('Please enter a supermarket name')).toBeInTheDocument();
  });

  it('cancels adding a supermarket', async () => {
    const user = userEvent.setup();

    renderWithProvider(<SupermarketManager isOpen={true} onClose={vi.fn()} />);

    await user.click(screen.getByText('+ Add New Supermarket'));
    await user.type(screen.getByPlaceholderText('Supermarket name'), 'Walmart');

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancelButton);

    expect(screen.queryByPlaceholderText('Supermarket name')).not.toBeInTheDocument();
  });

  it('opens edit form when edit button is clicked', async () => {
    const user = userEvent.setup();

    renderWithProvider(<SupermarketManager isOpen={true} onClose={vi.fn()} />);

    // Add a supermarket first
    await user.click(screen.getByText('+ Add New Supermarket'));
    await user.type(screen.getByPlaceholderText('Supermarket name'), 'Walmart');
    await user.click(screen.getByRole('button', { name: 'Add' }));

    // Edit it
    await user.click(screen.getByRole('button', { name: 'Edit Walmart' }));
    expect(screen.getByDisplayValue('Walmart')).toBeInTheDocument();
  });

  it('updates a supermarket', async () => {
    const user = userEvent.setup();

    renderWithProvider(<SupermarketManager isOpen={true} onClose={vi.fn()} />);

    // Add a supermarket
    await user.click(screen.getByText('+ Add New Supermarket'));
    await user.type(screen.getByPlaceholderText('Supermarket name'), 'Walmart');
    await user.click(screen.getByRole('button', { name: 'Add' }));

    // Edit it
    await user.click(screen.getByRole('button', { name: 'Edit Walmart' }));
    const input = screen.getByDisplayValue('Walmart');
    await user.clear(input);
    await user.type(input, 'Target');
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText('Target')).toBeInTheDocument();
    expect(screen.queryByText('Walmart')).not.toBeInTheDocument();
  });

  it('shows delete confirmation dialog', async () => {
    const user = userEvent.setup();

    renderWithProvider(<SupermarketManager isOpen={true} onClose={vi.fn()} />);

    // Add a supermarket
    await user.click(screen.getByText('+ Add New Supermarket'));
    await user.type(screen.getByPlaceholderText('Supermarket name'), 'Walmart');
    await user.click(screen.getByRole('button', { name: 'Add' }));

    // Click delete
    await user.click(screen.getByRole('button', { name: 'Delete Walmart' }));
    expect(screen.getByText('Delete Supermarket')).toBeInTheDocument();
  });

  it('deletes a supermarket after confirmation', async () => {
    const user = userEvent.setup();

    renderWithProvider(<SupermarketManager isOpen={true} onClose={vi.fn()} />);

    // Add a supermarket
    await user.click(screen.getByText('+ Add New Supermarket'));
    await user.type(screen.getByPlaceholderText('Supermarket name'), 'Walmart');
    await user.click(screen.getByRole('button', { name: 'Add' }));

    // Delete it
    await user.click(screen.getByRole('button', { name: 'Delete Walmart' }));

    // Use getByRole to get the specific Delete button
    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    await user.click(deleteButton);

    expect(screen.queryByText('Walmart')).not.toBeInTheDocument();
  });

  it('cancels deletion', async () => {
    const user = userEvent.setup();

    renderWithProvider(<SupermarketManager isOpen={true} onClose={vi.fn()} />);

    // Add a supermarket
    await user.click(screen.getByText('+ Add New Supermarket'));
    await user.type(screen.getByPlaceholderText('Supermarket name'), 'Walmart');
    await user.click(screen.getByRole('button', { name: 'Add' }));

    // Try to delete but cancel
    await user.click(screen.getByRole('button', { name: 'Delete Walmart' }));

    // Use getByRole to get the specific Cancel button from the dialog
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancelButton);

    expect(screen.getByText('Walmart')).toBeInTheDocument();
  });

  it('displays item count for each supermarket', async () => {
    const user = userEvent.setup();

    renderWithProvider(<SupermarketManager isOpen={true} onClose={vi.fn()} />);

    // Add a supermarket
    await user.click(screen.getByText('+ Add New Supermarket'));
    await user.type(screen.getByPlaceholderText('Supermarket name'), 'Walmart');
    await user.click(screen.getByRole('button', { name: 'Add' }));

    expect(screen.getByText('0 items')).toBeInTheDocument();
  });
});
