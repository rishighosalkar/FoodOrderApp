import { useState, useEffect } from "react";
import Modal from "../../UI/Modal";
import axios from "axios";
import RestaurantSignupForm from "./RestaurantSignupForm";
import { useNavigate } from "react-router-dom";

const RestaurantSignup = (props) =>{

    const [subCategory, setSubCategory] = useState([]);
    const navigate = useNavigate();
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

    const confirmHandler = async(newRestaurant) => {

        console.log('New restaurant details: ', newRestaurant);
        const res = await axios.post('https://localhost:7053/restaurant/registerRestaurant', newRestaurant,{
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
          })
            .catch(e => console.log(e));
            
        if(res.data.statusCode === 200){
            console.log('Response data', res.data);
            // localStorage.setItem('userId', res.data.userId)
            // localStorage.setItem('token', res.data.accessToken)
            //dispatch({type: 'login'});
            props.onClose();
        }
        else if(res.data.statusCode === 409){
            alert('Restaurant already exist');
        }
        else{
            alert('500 Internal Server Error');
        }
        
    };

    return (       
        <Modal onClose = {props.onClose}>
            <RestaurantSignupForm onConfirm={confirmHandler} onClose={props.onClose} subCategory={subCategory}/>
        </Modal>
        // <RestaurantSignupForm onConfirm={confirmHandler} onClose={hideRestaurantSignupHandler} subCategory={subCategory}/>

    );
}

export default RestaurantSignup;