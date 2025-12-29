import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hello world text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello World from React!/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders version info', () => {
  render(<App />);
  const versionElement = screen.getByText(/Version:/i);
  expect(versionElement).toBeInTheDocument();
});
