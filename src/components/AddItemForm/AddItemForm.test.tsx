import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddItemForm } from './AddItemForm';

describe('AddItemForm', () => {
  it('renders input field', () => {
    render(
      <AddItemForm
        supermarketId="1"
        onAdd={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.getByPlaceholderText('Enter item name')).toBeInTheDocument();
  });

  it('auto-focuses input on mount', () => {
    render(
      <AddItemForm
        supermarketId="1"
        onAdd={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText('Enter item name');
    expect(input).toHaveFocus();
  });

  it('calls onAdd with trimmed value when form is submitted', async () => {
    const user = userEvent.setup();
    const mockAdd = vi.fn();

    render(
      <AddItemForm
        supermarketId="1"
        onAdd={mockAdd}
        onCancel={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText('Enter item name');
    await user.type(input, '  Milk  ');
    await user.click(screen.getByText('Add'));

    expect(mockAdd).toHaveBeenCalledWith('Milk', '1');
  });

  it('clears input after successful submission', async () => {
    const user = userEvent.setup();
    const mockAdd = vi.fn();

    render(
      <AddItemForm
        supermarketId="1"
        onAdd={mockAdd}
        onCancel={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText('Enter item name') as HTMLInputElement;
    await user.type(input, 'Milk');
    await user.click(screen.getByText('Add'));

    expect(input.value).toBe('');
  });

  it('submits on Enter key press', async () => {
    const user = userEvent.setup();
    const mockAdd = vi.fn();

    render(
      <AddItemForm
        supermarketId="1"
        onAdd={mockAdd}
        onCancel={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText('Enter item name');
    await user.type(input, 'Milk{Enter}');

    expect(mockAdd).toHaveBeenCalledWith('Milk', '1');
  });

  it('calls onCancel when Escape key is pressed', async () => {
    const user = userEvent.setup();
    const mockCancel = vi.fn();

    render(
      <AddItemForm
        supermarketId="1"
        onAdd={vi.fn()}
        onCancel={mockCancel}
      />
    );

    const input = screen.getByPlaceholderText('Enter item name');
    await user.type(input, '{Escape}');

    expect(mockCancel).toHaveBeenCalled();
  });

  it('calls onCancel when Cancel button is clicked', async () => {
    const user = userEvent.setup();
    const mockCancel = vi.fn();

    render(
      <AddItemForm
        supermarketId="1"
        onAdd={vi.fn()}
        onCancel={mockCancel}
      />
    );

    await user.click(screen.getByText('Cancel'));

    expect(mockCancel).toHaveBeenCalled();
  });

  it('disables submit button when input is empty', () => {
    render(
      <AddItemForm
        supermarketId="1"
        onAdd={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    const submitButton = screen.getByText('Add');
    expect(submitButton).toBeDisabled();
  });

  it('disables submit button when input contains only whitespace', async () => {
    const user = userEvent.setup();

    render(
      <AddItemForm
        supermarketId="1"
        onAdd={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText('Enter item name');
    await user.type(input, '   ');

    const submitButton = screen.getByText('Add');
    expect(submitButton).toBeDisabled();
  });

  it('does not call onAdd when submitting empty value', async () => {
    const user = userEvent.setup();
    const mockAdd = vi.fn();

    render(
      <AddItemForm
        supermarketId="1"
        onAdd={mockAdd}
        onCancel={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText('Enter item name');
    await user.type(input, '   ');

    // Try to submit via Enter (button is disabled, so clicking it won't work)
    await user.type(input, '{Enter}');

    expect(mockAdd).not.toHaveBeenCalled();
  });
});
