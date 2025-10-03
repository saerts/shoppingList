import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import { AddButton } from './AddButton';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('AddButton', () => {
  it('renders with default text', () => {
    renderWithTheme(<AddButton onClick={vi.fn()} />);
    expect(screen.getByText('+ Add new item')).toBeInTheDocument();
  });

  it('renders with custom text', () => {
    renderWithTheme(<AddButton onClick={vi.fn()} text="Custom Text" />);
    expect(screen.getByText('Custom Text')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<AddButton onClick={onClick} />);

    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders with icon when provided', () => {
    const TestIcon = () => <span data-testid="test-icon">+</span>;
    renderWithTheme(<AddButton onClick={vi.fn()} icon={<TestIcon />} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('has correct aria-label', () => {
    renderWithTheme(<AddButton onClick={vi.fn()} text="Add Item" />);
    expect(screen.getByLabelText('Add Item')).toBeInTheDocument();
  });

  it('is keyboard accessible', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<AddButton onClick={onClick} />);

    const button = screen.getByRole('button');
    button.focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
