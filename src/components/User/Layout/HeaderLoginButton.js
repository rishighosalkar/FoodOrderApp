import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './HeaderLoginButton.module.css';
import CartContext from '../../../store/cart-context';
import Cookies from 'js-cookie';

const HeaderLoginButton = (props) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);

    const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`;

    const clearAllCookies = () => {
      // Use Cookies.remove to remove individual cookies
      // To clear all cookies, you can iterate through all cookies and remove them
      const allCookies = Cookies.get();
      for (const cookieName in allCookies) {
        Cookies.remove(cookieName);
      }
    }
  
    useEffect(()=>{
        if(!isLoggedIn)
          return;
        setButtonIsHighlighted(true);
        const timer = setTimeout(()=>{
          setButtonIsHighlighted(false);
        }, 300);
    
        return ()=>{
          clearTimeout(timer);
        }
      }, [isLoggedIn])
    const onLoginHandler = () => {
        if(isLoggedIn)
        {
            dispatch({type: 'LOGOUT'});
            cartCtx.clearCart(); 
            clearAllCookies();    
            window.location.reload();      
        }
        else
            props.onClick();

    }
    return (
        <button className={btnClasses} onClick={onLoginHandler}>
            {isLoggedIn ? <span>Log Out</span> : <span>Log In</span>}
        </button>
    )
}

export default HeaderLoginButton;