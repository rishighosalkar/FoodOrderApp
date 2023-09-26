import { useState, useEffect } from "react";
import Modal from "../../UI/Modal";
import axios from "axios";
import { useDispatch } from "react-redux";
import SignupForm from "./RestaurantSignupForm";
import { useNavigate } from "react-router-dom";

const RestaurantSignup = (props) =>{

    const [restaurant, setRestaurant] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fetchData = async () => {
        const response = await axios.get('https://localhost:7053/subcategory/get-all')
        .catch(e => console.log(e));
        
      const responseData = response.data.subcategoryList;

      const loadedSubCategories = [];

      for(const key in responseData)
      {
        loadedSubCategories.push({
          id: responseData[key].id,
          type: responseData[key].type,
        })
      }

      setSubCategory(loadedSubCategories);
    }
    useEffect(() => {
        fetchData();
    }, []);

    const confirmHandler = (newRestaurant) => {

        alert('Restaurant Sign Up Page');
        setRestaurant(newRestaurant);
        const rest = {
            "restaurantUsername": "vegSizzles",
            "restaurantPassword": "VegSIzzles123",
            "restaurantName": "Veg SIzzzle's",
            "restaurantDescription": "Pure Veg",
            "startTime": "08:00:00",
            "endTime": "23:00:00",
            "restaurantMeals": [
              {
                "name": "Veg Biryani",
                "description": "Tasty Spicy",
                "price": 300,
                "categoryId": 1,
                "subcategoryId": 4
              }
            ],
            "address": {
              "streetAddress": "Shop No 2, Meadows",
              "city": "Thane",
              "state": "Maharashtra",
              "postalCode": "400610",
              "country": "India"
            }
          }
        console.log('New restaurant details: ', newRestaurant);
        axios.post('https://localhost:7053/restaurant/registerRestaurant', newRestaurant,{
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
          })
            .then(res => {
                console.log('Response data', res.data);
                if(res.data.statusCode === 409)
                    alert('Restaurant already exist');
                else{
                    console.log(res.data)
                    // localStorage.setItem('userId', res.data.userId) 
                    // localStorage.setItem('token', res.data.accessToken)
                    //dispatch({type: 'login'});
                    navigate('/')
                    //props.onClose();
                }
            })
            .catch(e => console.log(e));
        
    };
    const hideRestaurantSignupHandler = () => {
        navigate('/');
    }
    return (       
        <Modal onClose = {hideRestaurantSignupHandler}>
            <SignupForm onConfirm={confirmHandler} onClose={hideRestaurantSignupHandler} subCategory={subCategory}/>
        </Modal>
    );
}

export default RestaurantSignup;