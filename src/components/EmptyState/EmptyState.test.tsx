import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders message', () => {
    render(<EmptyState message="No items found" />);
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<EmptyState message="No items" icon="📝" />);
    expect(screen.getByText('📝')).toBeInTheDocument();
  });

  it('does not render icon when not provided', () => {
    render(<EmptyState message="No items" />);
    expect(screen.queryByText('📝')).not.toBeInTheDocument();
  });
});
