import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuroraCage, Badge, Button } from './index';

describe('Warm Utilitarian UI Components', () => {
  test('renders Button with stark uppercase typography', () => {
    render(<Button variant="primary">TRIGGER SYSTEM LOG</Button>);
    const btn = screen.getByRole('button', { name: /TRIGGER SYSTEM LOG/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass('font-mono', 'uppercase');
  });

  test('renders Badge with correct status indicator variant', () => {
    render(<Badge variant="ai-active" pulse>DEVIN ACTIVE</Badge>);
    expect(screen.getByText(/DEVIN ACTIVE/i)).toBeInTheDocument();
  });

  test('renders AuroraCage container element', () => {
    render(
      <MemoryRouter>
        <AuroraCage palette="ai-active">
          <div data-testid="cage-content">Aurora Shimmer Content</div>
        </AuroraCage>
      </MemoryRouter>
    );
    expect(screen.getByTestId('cage-content')).toBeInTheDocument();
  });
});
