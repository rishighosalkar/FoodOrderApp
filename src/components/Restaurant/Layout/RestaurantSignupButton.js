import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './HeaderLoginButton.module.css';

const RestaurantSignupButton = (props) => {
    const dispatch = useDispatch();
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
    
    return (
        <>
            <button className={btnClasses} onClick={props.onClick}>Signup</button>
        </>
    )
}

export default RestaurantSignupButton;