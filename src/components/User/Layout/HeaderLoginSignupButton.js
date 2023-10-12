import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './HeaderLoginButton.module.css';
import CartContext from '../../../store/cart-context';

const HeaderLoginSignupButton = (props) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);

    const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`;
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
      props.onClick();

    }

    const onLogoutHandler = () => {
      cartCtx.clearCart();
      dispatch({type: 'logout'});
    }

    return (
      <>
        {isLoggedIn ? <button className={btnClasses} onClick={onLogoutHandler}>Log Out</button> : 
                    <button className={btnClasses} onClick={onLoginHandler}>Login/Signup</button>}
      </>
    )
}

export default HeaderLoginSignupButton;