import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './contexts/CartProvider'
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    );

    screen.debug(); // Just prints the HTML structure to console
  });
});