import { useState, useEffect } from "react";
import Modal from "../UI/Modal";
import axios from "axios";
import { useDispatch } from "react-redux";
import SignupForm from "./SignupForm";
// import { useNavigate } from "react-router-dom";

const Signup = (props) =>{
    const [users, setUsers] = useState([]);
    //const navigate = useNavigate();
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
        //fetchData();
    }, []);

    const confirmHandler = (newUser) => {

        axios.post('https://localhost:7053/user/signup', newUser)
            .then(res => {
                console.log('Response data', res.data);
                if(res.data.statusCode === 409)
                    alert('User already exist');
                else{
                    console.log(res.data.userData)
                    localStorage.setItem('userId', res.data.userId)
                    localStorage.setItem('token', res.data.accessToken)
                    //dispatch({type: 'login'});
                    //navigate('')
                    props.onClose();
                }
            })
            .catch(e => console.log(e));
        
    };

    return (
        <Modal onClose = {props.onClose}>
            <SignupForm onConfirm={confirmHandler} onClose={props.onClose} users={users}/>
        </Modal>
    );
}

export default Signup;