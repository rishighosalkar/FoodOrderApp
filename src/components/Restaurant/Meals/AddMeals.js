import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../UI/Modal";
import AddMealsForm from "./AddMealsForm";
import { useNavigate } from "react-router-dom";

const AddMeals = (props) => {

    const navigate = useNavigate();

    const [subCategory, setSubCategory] = useState([]);

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

    const onConfirmHandler = (newMeal) => {
        console.log('New Meal: ', newMeal);

        axios.post('https://localhost:7053/meals/add-meal', newMeal)
            .then(res => {
                <Modal onClose={props.onClose}>
                    <div>
                        <div>Meal {res.data.meal.name} added for restaurant {res.data.meal.restaurantName}</div>
                        <button onClick={props.onClick}>OK</button>
                    </div>
                </Modal>
                navigate('/restaurant/restaurant-meals', {
                    state:{
                      restaurantId: res.data.restaurantData.restaurantId,
                      restaurantName: res.data.restaurantData.restaurantName
                    }
                  });
                // props.onClose();
            })
            .catch(e => {
                alert(e);
            })
    }

    return(
        <Modal onClose={props.onClose}>
            <AddMealsForm onConfirm={onConfirmHandler} onClose={props.onClose} subCategory={subCategory}/>
        </Modal>
    )
}

export default AddMeals;