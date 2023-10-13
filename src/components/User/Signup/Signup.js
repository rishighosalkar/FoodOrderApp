import { useState, useEffect } from "react";
import Modal from "../../UI/Modal";
import axios from "axios";
// import { useDispatch } from "react-redux";
import SignupForm from "./SignupForm";
import Login from "../Login/Login";
import classes from './Signup.module.css';
// import { useNavigate } from "react-router-dom";

const Signup = (props) =>{
    const [showLogin, setShowLogin] = useState(false);
    
    useEffect(() => {
        //fetchData();
    }, []);

    const confirmHandler = async(newUser) => {

        const res = await axios.post('https://localhost:7053/user/signup', newUser)
            .catch(e => console.log(e));

        if(res.data.statusCode === 200){
            console.log(res.data.userData)
            localStorage.setItem('userId', res.data.userId)
            localStorage.setItem('token', res.data.accessToken)
            //dispatch({type: 'login'});
            //props.onClose();
        }
        else if(res.data.statusCode === 409){
            alert('User already exist');
        }
        else{
            alert('500 Internal Server Error');
        }
        
    };

    return (
        <Modal onClose = {props.onClose}>
            <div className={classes.header}>
                <span onClick={()=>{setShowLogin(true)}} className={classes.headerAction}>Login</span>
                <span> | </span>
                <span className={classes.headerAction}>Sign Up</span>
            </div>
            {!showLogin ? <SignupForm onConfirm={confirmHandler} onClose={props.onClose}/>
                        : <Login onClose={props.onClose}/>}
        </Modal>
    );
}

export default Signup;