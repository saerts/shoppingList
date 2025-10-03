import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import { FilterPills } from './FilterPills';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('FilterPills', () => {
  it('renders all filter options', () => {
    renderWithTheme(<FilterPills activeFilter="all" onFilterChange={vi.fn()} />);

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Uncompleted')).toBeInTheDocument();
  });

  it('marks the active filter correctly', () => {
    renderWithTheme(<FilterPills activeFilter="completed" onFilterChange={vi.fn()} />);

    const completedPill = screen.getByText('Completed');
    expect(completedPill).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onFilterChange when a pill is clicked', async () => {
    const onFilterChange = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(<FilterPills activeFilter="all" onFilterChange={onFilterChange} />);

    await user.click(screen.getByText('Completed'));
    expect(onFilterChange).toHaveBeenCalledWith('completed');
  });

  it('calls onFilterChange when Enter key is pressed', async () => {
    const onFilterChange = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(<FilterPills activeFilter="all" onFilterChange={onFilterChange} />);

    const pill = screen.getByText('Uncompleted');
    pill.focus();
    await user.keyboard('{Enter}');
    expect(onFilterChange).toHaveBeenCalledWith('uncompleted');
  });

  it('calls onFilterChange when Space key is pressed', async () => {
    const onFilterChange = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(<FilterPills activeFilter="all" onFilterChange={onFilterChange} />);

    const pill = screen.getByText('Completed');
    pill.focus();
    await user.keyboard(' ');
    expect(onFilterChange).toHaveBeenCalledWith('completed');
  });

  it('has correct ARIA attributes', () => {
    renderWithTheme(<FilterPills activeFilter="all" onFilterChange={vi.fn()} />);

    const container = screen.getByRole('group');
    expect(container).toHaveAttribute('aria-label', 'Filter items');

    const pills = screen.getAllByRole('radio');
    expect(pills).toHaveLength(3);
  });

  it('updates active state when activeFilter prop changes', () => {
    const { rerender } = renderWithTheme(<FilterPills activeFilter="all" onFilterChange={vi.fn()} />);

    expect(screen.getByText('All')).toHaveAttribute('aria-checked', 'true');

    rerender(
      <ThemeProvider theme={theme}>
        <FilterPills activeFilter="completed" onFilterChange={vi.fn()} />
      </ThemeProvider>
    );

    expect(screen.getByText('All')).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByText('Completed')).toHaveAttribute('aria-checked', 'true');
  });
});
