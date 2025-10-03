import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmDialog } from './ConfirmDialog';

describe('ConfirmDialog', () => {
  it('does not render when isOpen is false', () => {
    render(
      <ConfirmDialog
        isOpen={false}
        title="Confirm"
        message="Are you sure?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.queryByText('Confirm')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(
      <ConfirmDialog
        isOpen={true}
        title="Confirm Action"
        message="Are you sure you want to proceed?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument();
  });

  it('renders default button text', () => {
    render(
      <ConfirmDialog
        isOpen={true}
        title="Confirm Action"
        message="Message"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('renders custom button text', () => {
    render(
      <ConfirmDialog
        isOpen={true}
        title="Delete Item"
        message="Message"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
        confirmText="Delete"
        cancelText="Keep"
      />
    );

    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Keep' })).toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', async () => {
    const user = userEvent.setup();
    const mockConfirm = vi.fn();

    render(
      <ConfirmDialog
        isOpen={true}
        title="Confirm"
        message="Message"
        onConfirm={mockConfirm}
        onCancel={vi.fn()}
        confirmText="Yes"
      />
    );

    await user.click(screen.getByText('Yes'));
    expect(mockConfirm).toHaveBeenCalled();
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const mockCancel = vi.fn();

    render(
      <ConfirmDialog
        isOpen={true}
        title="Confirm"
        message="Message"
        onConfirm={vi.fn()}
        onCancel={mockCancel}
      />
    );

    await user.click(screen.getByText('Cancel'));
    expect(mockCancel).toHaveBeenCalled();
  });

  it('calls onCancel when Escape key is pressed', async () => {
    const user = userEvent.setup();
    const mockCancel = vi.fn();

    render(
      <ConfirmDialog
        isOpen={true}
        title="Confirm"
        message="Message"
        onConfirm={vi.fn()}
        onCancel={mockCancel}
      />
    );

    await user.keyboard('{Escape}');
    expect(mockCancel).toHaveBeenCalled();
  });

  it('calls onCancel when overlay is clicked', async () => {
    const user = userEvent.setup();
    const mockCancel = vi.fn();

    const { container } = render(
      <ConfirmDialog
        isOpen={true}
        title="Confirm"
        message="Message"
        onConfirm={vi.fn()}
        onCancel={mockCancel}
      />
    );

    const overlay = container.firstChild as HTMLElement;
    await user.click(overlay);
    expect(mockCancel).toHaveBeenCalled();
  });

  it('does not call onCancel when dialog content is clicked', async () => {
    const user = userEvent.setup();
    const mockCancel = vi.fn();

    render(
      <ConfirmDialog
        isOpen={true}
        title="Confirm Action"
        message="Message"
        onConfirm={vi.fn()}
        onCancel={mockCancel}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Confirm' }));
    // Only onConfirm should be called, not onCancel
    expect(mockCancel).not.toHaveBeenCalled();
  });

  it('has proper ARIA attributes', () => {
    render(
      <ConfirmDialog
        isOpen={true}
        title="Confirm Action"
        message="Are you sure?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toHaveAttribute('aria-labelledby', 'dialog-title');
    expect(dialog).toHaveAttribute('aria-describedby', 'dialog-message');
  });
});
