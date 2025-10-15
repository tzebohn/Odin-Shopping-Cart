import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './contexts/CartProvider'
import App from './App';
import { MenuProvider } from './contexts/MenuProvider';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <MenuProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </MenuProvider>
      </BrowserRouter>
    );

    screen.debug(); // Just prints the HTML structure to console
  });
});