import { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from "../components/Layout/Header";
import Login from "../components/Login/Login";
import LoginSignUp from "../components/LoginSignup/LoginSignupPage";
import Cart from "../components/Cart/Cart";

const MainNavigation = () => {
    const [cartIsShown, setCartIsShown] = useState(false);
    const [loginIsShown, setLoginIsShown] = useState(false);
    const [loginSignupIsShown, setLoginSignupIsShown] = useState(false);
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

    const showLoginSignupHandler = () => {
    setLoginSignupIsShown(true);
    }

    const hideLoginSignupHandler = () => {
    setLoginSignupIsShown(false);
    }

    return (
        <>
            {cartIsShown && (!loginIsShown) && <Cart onClose={hideCartHandler} />}
            {loginIsShown && (!cartIsShown) && <Login onClose={hideLoginHandler} />}
            {loginSignupIsShown && (!cartIsShown) && <LoginSignUp onClose={hideLoginSignupHandler} />}
            <Header onShowCart={showCartHandler} onShowLogin={showLoginHandler} onShowLoginSignup={showLoginSignupHandler} />
        </>
    )
}

export default MainNavigation;