import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './Pages/Root';
import Homepage from './Pages/Homepage';
import RestaurantMeals from './components/RestaurantMeals/RestaurantMeals';
import RestaurantSignup from './components/Restaurant/Signup/RestaurantSignup';
import RestaurantRootLayout from './Pages/RestaurantRoot';
import RestaurantHomepage from './Pages/RestaurantHomePage';
import Login from './components/User/Login/Login';
import Signup from './components/User/Signup/Signup';
import Order from './components/User/Order/Order';
import Payment from './components/Payment/Payment';

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
          element: <Login />
        },
        {
          path: 'signup',
          element: <Signup />
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
        {
          path: 'order',
          element: <Order />
        },
        {
          path: 'payment',
          element: <Payment />
        }
        
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
      <RouterProvider router={router} />
    </CartProvider>
  );
}


export default App;
