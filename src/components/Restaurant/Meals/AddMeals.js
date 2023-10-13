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

    const onConfirmHandler = async (newMeal) => {
        console.log('New Meal: ', newMeal);

        const result = await axios.post('https://localhost:7053/meals/add-meal', newMeal)
            .catch(e => {
                alert(e);
        });
        
        //alert(result.data.statusCode);
        if(result.data.statusCode === 200){
          alert('Restaurant Id: ',result.data.meal.restaurantId);
          navigate('/restaurant/restaurant-meals', {
            state:{
              restaurantId: localStorage.getItem('RestaurantId'),
              restaurantName: localStorage.getItem('RestaurantName')//result.data.restaurantName
            }
          });
        }
        else if(result.data.statusCode === 409){
          // <Modal onClose={props.onClose}>
          //   <div>
          //       <div>Meal was not added</div>
          //       <button onClick={props.onClose}>OK</button>
          //   </div>
          // </Modal> 
          alert('Meal with name already exist');
        }
    }

    return(
        <Modal onClose={props.onClose}>
            <AddMealsForm onConfirm={onConfirmHandler} onClose={props.onClose} subCategory={subCategory}/>
        </Modal>
    )
}

export default AddMeals;