// import { useState, useEffect } from "react";
import Modal from "../../UI/Modal";
import RestaurantLoginForm from "./RestaurantLoginForm";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RestaurantLogin = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // useEffect(() => {
    //     fetchData();
    // }, [])

    const confirmHandler = async(data) => {
        
        const newUser = {
            email: data.username,
            password: data.password
        }

        const res = await axios.post('https://localhost:7053/restaurant/login', newUser)
            .catch(e => console.log(e));

        if(res.data.statusCode === 200){

            dispatch({type: 'RESTAURANTLOGIN'});
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
            props.onClose();
        }
        else{
            alert('Logon denied');
        }
    };

    return (
        <Modal onClose = {props.onClose}>
            <RestaurantLoginForm onConfirm={confirmHandler} onClose={props.onClose} />
        </Modal>
    );
}

export default RestaurantLogin;