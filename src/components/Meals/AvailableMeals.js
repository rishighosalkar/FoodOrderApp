import Card from '../UI/Card';
import MealItem from '../MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

/*const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];*/

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(()=>{
    const fetchMeals = async ()=>{
      const res = await axios.get('https://localhost:7053/meals/getAllMeals')
                            .catch(e => console.log(e));
      // const response = await fetch('https://food-order-app-24c9e-default-rtdb.firebaseio.com/meals.json')
      //           .then();
      // if(!response.ok){
      //   throw new Error('Something went wrong');
      // }
      // const responseData = await response.json();

      const responseData = res.data.meals;
      const loadedMeals = [];

      for(const key in responseData)
      {
        loadedMeals.push({
          id: responseData[key].id,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          restaurantId: responseData[key].restaurantId,
          restaurantName: responseData[key].restaurantName
        })
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    }

    fetchMeals().catch((e)=>{
      setIsLoading(false);
      setHttpError(e.message);
    });
    
  }, [])

  if(isloading)
  {
    return <section className={classes.mealsLoading}>
      <p>Loading...</p>
    </section>
  }

  if(httpError){
    return <section className={classes.mealsError}>
      <p>{httpError}</p>
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
      isForRestaurant={false}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
