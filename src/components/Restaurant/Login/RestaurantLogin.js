import { useState, useEffect } from "react";
import Modal from "../../UI/Modal";
import RestaurantLoginForm from "./RestaurantLoginForm";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RestaurantLogin = (props) => {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // useEffect(() => {
    //     fetchData();
    // }, [])

    const confirmHandler = (data) => {
        
        const newUser = {
            email: data.username,
            password: data.password
        }

        axios.post('https://localhost:7053/restaurant/login', newUser)
            .then(res => {
                //console.log('Restaurant data: ', res.data.restaurantData)
                dispatch({type: 'RESTAURANTLOGIN'});
                props.onClose()
                localStorage.setItem('RestaurantId', res.data.restaurantData.restaurantId)
                localStorage.setItem('RestaurantName', res.data.restaurantData.restaurantName)
                localStorage.setItem('RestaurantToken', res.data.accessToken)
                // navigate('/restaurant');
                navigate('restaurant-meals', {
                    state:{
                      restaurantId: res.data.restaurantData.restaurantId,
                      restaurantName: res.data.restaurantData.restaurantName
                    }
                  });
            })
            .catch(e => console.log(e));

            //localStorage.setItem('userId', data.name)
            props.onClose();
    };

    return (
        <Modal onClose = {props.onClose}>
            <RestaurantLoginForm onConfirm={confirmHandler} onClose={props.onClose} users={users}/>
        </Modal>
    );
}

export default RestaurantLogin;