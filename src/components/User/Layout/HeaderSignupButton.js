import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classes from './HeaderLoginButton.module.css';

const HeaderSignupButton = (props) => {
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

    return (
      <>
        <button className={btnClasses} onClick={props.onClick}>Signup</button>
      </>
    )
}

export default HeaderSignupButton;