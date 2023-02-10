import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './HeaderLoginButton.module.css';

const HeaderLoginButton = (props) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);

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
        if(isLoggedIn)
            dispatch({type: 'logout'});
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