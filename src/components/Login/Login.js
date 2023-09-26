import { useState, useEffect } from "react";
import Modal from "../UI/Modal";
import LoginForm from "./LoginForm";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from './Login.module.css'; 

const Login = (props) => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fetchData = async () => {
        const response = await fetch('https://food-order-app-24c9e-default-rtdb.firebaseio.com/users.json')
                .then();
      if(!response.ok){
        throw new Error('Something went wrong');
      }
      const responseData = await response.json();

      const loadedUsers = [];

      for(const key in responseData)
      {
        loadedUsers.push({
          id: key,
          username: responseData[key].username,
          password: responseData[key].password,
        })
      }

      setUsers(loadedUsers);
    }
    useEffect(() => {
        fetchData();
    }, [])
    const confirmHandler = (data) => {
        if(!data.isExisting)
        {
            // const newUser = {
            //     username: data.username,
            //     password: data.password
            // }
            // axios.post('https://food-order-app-24c9e-default-rtdb.firebaseio.com/users.json', newUser)
            //     .then(res => {
            //         console.log(res.data.name)
            //         dispatch({type: 'login'});
            //         props.onClose()
            //         localStorage.setItem('userId', res.data.name)
            //     })
            //     .catch(e => console.log(e));
            const newUser = {
                email: data.username,
                password: data.password
            }
            axios.post('https://localhost:7053/user/login', newUser)
                .then(res => {
                    console.log(res.data.userData)
                    dispatch({type: 'login'});
                    props.onClose()
                    localStorage.setItem('userId', res.data.userId)
                    localStorage.setItem('token', res.data.accessToken)
                })
                .catch(e => console.log(e));
        }
        else if(data.isPasswordCorrect)
        {
            localStorage.setItem('userId', data.name)
            dispatch({type: 'login'});
            props.onClose();
        }
        else
            alert('incorrect password');
    };

    const navigateToRestaurantSignup = () => {
        navigate('restaurant-signup', {
            state : {
                onClose: props.onClose,
            }
        });
    }
    return (
        <Modal onClose = {props.onClose}>
            <LoginForm onConfirm={confirmHandler} onClose={props.onClose} users={users}/>
            <div>
                <span>Want to register your restaurant?</span><span onClick={navigateToRestaurantSignup} className={classes.clickhere}>Click here</span>
            </div>
        </Modal>
    );
}

export default Login;