import { useState } from "react";
import Modal from "../../UI/Modal";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import classes from './LoginSignup.module.css';

const LoginSignUp = (props) => {
    const [showSignUp, setShowSignUp] = useState(false);
    //const onCloseHandler = location.state === null ? props.onClose : location.state.onClose;
    const onClickHandler = () => {
        //const currentVal = showSignUp;
        setShowSignUp(true);
    }

    return (
        <Modal onClose = {props.onClose}>
            <div className={classes.header}>
                <span className={classes.action}>Login</span>
                <span> | </span>
                <span onClick={onClickHandler} className={classes.action}>Sign Up</span>
            </div>
            {showSignUp ? <Signup onClose={props.onClose} /> : <Login onClose={props.onClose} />}
        </Modal> 
    );
 }

 export default LoginSignUp;