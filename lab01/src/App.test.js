import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the modern web studio hero content', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /modern web studio/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /launch preview/i })).toBeInTheDocument();
});
