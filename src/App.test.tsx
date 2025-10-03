import { describe, it, expect } from 'vitest';
import { render, screen } from './utils/testUtils';
import App from './App';

describe('App', () => {
  it('renders the Shopping List App heading', () => {
    render(<App />);
    expect(screen.getByText('Shopping List App')).toBeInTheDocument();
  });
});
