import { useState, useRef } from "react";
import classes from './Login.module.css';

const isEmpty = value => value.trim() === '';

const LoginForm = (props) => {
    const [formValidity, setFormValidity] = useState({
        username: true,
        password: true,
    });
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredUserame = usernameInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const enteredUsernameIsValid = !isEmpty(enteredUserame);
        const enteredPasswordIsValid = !isEmpty(enteredPassword);

        setFormValidity({
            username: enteredUserame,
            password: enteredPassword,
        })
        const formIsValid = enteredUsernameIsValid && enteredPasswordIsValid;
        if(!formIsValid)
        {return}
        
        props.onConfirm({
            username: enteredUserame,
            password: enteredPassword,
        })
    };

    const nameControlClass = `${classes.control } ${formValidity.name ? '': classes.invalid}`
    const addressControlClass = `${classes.control } ${formValidity.address ? '': classes.invalid}`

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClass}>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' ref={usernameInputRef}/>
                {!formValidity.username && <p>Please enter a valid name</p>}
            </div>
            <div className={addressControlClass}>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' ref={passwordInputRef}/>
                {!formValidity.password && <p>Please enter a valid address</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onClose}>
                Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default LoginForm;