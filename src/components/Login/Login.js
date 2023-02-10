import { useState, useRef, useEffect } from "react";
import Modal from "../UI/Modal";
import LoginForm from "./LoginForm";
import axios from "axios";
import { useDispatch } from "react-redux";

const isEmpty = value => value.trim() === '';
const isNotSixChar = value => value.trim().length !== 6;

const Login = (props) => {
    const [users, setUsers] = useState([]);
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
            const newUser = {
                username: data.username,
                password: data.password
            }
            axios.post('https://food-order-app-24c9e-default-rtdb.firebaseio.com/users.json', newUser)
                .then(res => {
                    console.log(res.data.name)
                    dispatch({type: 'login'});
                    props.onClose()
                    localStorage.setItem('userId', res.data.name)
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

    return (
        <Modal onClose = {props.onClose}>
            <LoginForm onConfirm={confirmHandler} onClose={props.onClose} users={users}/>
        </Modal>
    );
}

export default Login;