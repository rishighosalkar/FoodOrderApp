import { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import RestaurantSummary from "./RestaurantSummary";
import MealItem from "../MealItem/MealItem";
import Card from "../UI/Card";
import classes from './RestaurantMeals.module.css';

const RestaurantMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const location = useLocation();

    const fetchMeals = async (restaurantId) => {
        const url = 'https://localhost:7053/meals/getMealsResId?restaurantId='+restaurantId;
        console.log('FetchMeals function url: ', url);
        const resMeals = await axios(url)
                                .catch(e => console.log(e));
        
        const responseData = resMeals.data.meals;
        const loadedMeals = [];
        console.log('resData', responseData);
        for(const key in responseData)
        {
            // console.log('resdata[key]',responseData[key].name);
            loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
            restaurantId: responseData[key].restaurantId,
            restaurantName: responseData[key].restaurantName
            })
        }
        setMeals(loadedMeals);
        // console.log('Meals', meals);
        setIsLoading(false);
    }
    
    useEffect(()=>{
        // console.log('Restaurant Id in restaurant page : ', location.state.restaurantId);
        fetchMeals(location.state.restaurantId)
                    .catch( (e) => setIsLoading(false))
    }, []);

    if(isloading)
    {
        return <section className={classes.mealsLoading}>
        <p>Loading...</p>
        </section>
    }

    const mealsList = meals.map((meal) => (
        <MealItem
          id={meal.id}
          key={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
          restaurantId={meal.restaurantId}
          restaurantName={meal.restaurantName}
          isForRestaurant={true}
        />
      ));
    return (
        <Fragment>
            <RestaurantSummary restaurantName = {location.state.restaurantName}/>
            <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
            </section>
        </Fragment>
    )
}

export default RestaurantMeals;