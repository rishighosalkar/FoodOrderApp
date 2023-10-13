import { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from "../components/User/Layout/Header";
import Login from "../components/User/Login/Login";
import Cart from "../components/Cart/Cart";
import Signup from '../components/User/Signup/Signup';

const MainNavigation = () => {
    const [cartIsShown, setCartIsShown] = useState(false);
    const [loginIsShown, setLoginIsShown] = useState(false);
    const [signupIsShown, setSignupIsShown] = useState(false);
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

    const showSignupHandler = () => {
        setSignupIsShown(true);
    }

    const hideSignupHandler = () => {
        setSignupIsShown(false);
    }

    return (
        <>
            {cartIsShown && (!loginIsShown) && <Cart onClose={hideCartHandler} />}
            {loginIsShown && (!cartIsShown) && <Login onClose={hideLoginHandler} />}
            {signupIsShown && (!cartIsShown) && <Signup onClose={hideSignupHandler} />}
            <Header onShowCart={showCartHandler} onShowLogin={showLoginHandler} onShowSignup={showSignupHandler} />

        </>
    )
}

export default MainNavigation;