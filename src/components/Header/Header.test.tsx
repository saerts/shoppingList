import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import { Header } from './Header';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Header', () => {
  it('renders the title', () => {
    renderWithTheme(<Header title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders back button when showBackButton is true', () => {
    renderWithTheme(<Header title="Test" showBackButton />);
    expect(screen.getByLabelText('Go back')).toBeInTheDocument();
  });

  it('does not render back button when showBackButton is false', () => {
    renderWithTheme(<Header title="Test" showBackButton={false} />);
    expect(screen.queryByLabelText('Go back')).not.toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', async () => {
    const onBack = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<Header title="Test" showBackButton onBack={onBack} />);

    await user.click(screen.getByLabelText('Go back'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('renders menu button', () => {
    renderWithTheme(<Header title="Test" />);
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('calls onMenuClick when menu button is clicked', async () => {
    const onMenuClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<Header title="Test" onMenuClick={onMenuClick} />);

    await user.click(screen.getByLabelText('Open menu'));
    expect(onMenuClick).toHaveBeenCalledTimes(1);
  });
});
