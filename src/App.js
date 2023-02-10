import { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import Login from './components/Login/Login';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [loginIsShown, setLoginIsShown] = useState(false);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const showCartHandler = () => {
    if(!isLoggedIn)
    {
      alert('Login first');
      return;
    }
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showLoginHandler = () => {
    setLoginIsShown(true);
  }

  const hideLoginHandler = () => {
    setLoginIsShown(false);
  }

  return (
    <CartProvider>
      {cartIsShown && (!loginIsShown) && <Cart onClose={hideCartHandler} />}
      {loginIsShown && (!cartIsShown) && <Login onClose={hideLoginHandler} />}
      <Header onShowCart={showCartHandler} onShowLogin={showLoginHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
