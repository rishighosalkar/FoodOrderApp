import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './HeaderLoginButton.module.css';
import { useNavigate } from 'react-router-dom';

const RestaurantLoginButton = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRestarantLoggedIn = useSelector(state => state.isRestarantLoggedIn);
    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);

    const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`;
    
    useEffect(()=>{
        if(!isRestarantLoggedIn)
          return;
        setButtonIsHighlighted(true);
        const timer = setTimeout(()=>{
          setButtonIsHighlighted(false);
        }, 300);
    
        return ()=>{
          clearTimeout(timer);
        }
      }, [isRestarantLoggedIn])

    const onLoginHandler = () => {
      props.onClick();

    }

    const onLogoutHandler = () => {
      // alert('You want to logout?');
      dispatch({type: 'RESTAURANTLOGOUT'});
      localStorage.removeItem('RestaurantId');
      localStorage.removeItem('RestaurantToken');
      localStorage.removeItem('RestaurantName')
      navigate('/restaurant');
    }

    return (
      <>
        {isRestarantLoggedIn ? <button className={btnClasses} onClick={onLogoutHandler}>Log Out</button> : 
                    <button className={btnClasses} onClick={onLoginHandler}>Login</button>}
      </>
    )
}

export default RestaurantLoginButton;