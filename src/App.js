import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import LoginSignUp from './components/User/LoginSignup/LoginSignupPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './Pages/Root';
import Homepage from './Pages/Homepage';
import RestaurantMeals from './components/RestaurantMeals/RestaurantMeals';
import RestaurantSignup from './components/Restaurant/Signup/RestaurantSignup';
import RestaurantRootLayout from './Pages/RestaurantRoot';
import RestaurantMainNavigation from './Pages/RestaurantMainNavigation';
import RestaurantHomepage from './Pages/RestaurantHomePage';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Homepage />
        },
        {
          path: 'login',
          element: <LoginSignUp />
        },
        {
          path: 'restaurant-meals',
          element: <RestaurantMeals />
        },
        {
          path: 'meals',
          element: <Meals />
        },
        {
          path: 'cart',
          element: <Cart />
        },
        
      ]
    },
    {
      path: '/restaurant',
      element: <RestaurantRootLayout />,
      children: [
        {
          index: true,
          element: <RestaurantHomepage />
        },
        {
          path: 'restaurant-signup',
          element: <RestaurantSignup />
        },
        {
          path: 'restaurant-meals',
          element: <RestaurantMeals />
        }
      ]
    }
  ]);

  return (
    <CartProvider>
      {/* {cartIsShown && (!loginIsShown) && <Cart onClose={hideCartHandler} />}
      {loginIsShown && (!cartIsShown) && <Login onClose={hideLoginHandler} />}
      {loginSignupIsShown && (!cartIsShown) && <LoginSignUp onClose={hideLoginSignupHandler} />}
      <Header onShowCart={showCartHandler} onShowLogin={showLoginHandler} onShowLoginSignup={showLoginSignupHandler} />
      <main>
        <Meals />
      </main> */}
      <RouterProvider router={router} />
    </CartProvider>
  );
}


export default App;
