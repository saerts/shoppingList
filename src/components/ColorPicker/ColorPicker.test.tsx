import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColorPicker } from './ColorPicker';

describe('ColorPicker', () => {
  it('renders all color options', () => {
    render(<ColorPicker value="#FFD600" onChange={vi.fn()} />);

    expect(screen.getByLabelText('Select Yellow color')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Blue color')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Green color')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Red color')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Purple color')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Orange color')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<ColorPicker value="#FFD600" onChange={vi.fn()} label="Choose color" />);
    expect(screen.getByText('Choose color')).toBeInTheDocument();
  });

  it('marks selected color as checked', () => {
    render(<ColorPicker value="#FFD600" onChange={vi.fn()} />);

    const yellowOption = screen.getByLabelText('Select Yellow color');
    expect(yellowOption).toHaveAttribute('aria-checked', 'true');
  });

  it('marks non-selected colors as unchecked', () => {
    render(<ColorPicker value="#FFD600" onChange={vi.fn()} />);

    const blueOption = screen.getByLabelText('Select Blue color');
    expect(blueOption).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onChange when color is clicked', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();

    render(<ColorPicker value="#FFD600" onChange={mockOnChange} />);

    await user.click(screen.getByLabelText('Select Blue color'));
    expect(mockOnChange).toHaveBeenCalledWith('#4A90E2');
  });

  it('handles case-insensitive color matching', () => {
    render(<ColorPicker value="#ffd600" onChange={vi.fn()} />);

    const yellowOption = screen.getByLabelText('Select Yellow color');
    expect(yellowOption).toHaveAttribute('aria-checked', 'true');
  });
});
