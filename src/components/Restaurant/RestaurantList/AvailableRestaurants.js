import Card from '../../UI/Card';
import RestaurantList from './RestaurantList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './AvailableRestaurants.module.css'

const AvailableRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(()=>{
    const fetchMeals = async ()=>{
      const res = await axios.get('https://localhost:7053/restaurant/getRestaurantList')
                            .catch(e => console.log(e));

      const responseData = res.data.restaurants;
      const loadedRestaurants = [];

      for(const key in responseData)
      {
        loadedRestaurants.push({
            key: key,
            id: responseData[key].restaurantId,
            name: responseData[key].restaurantName,
            description: responseData[key].restaurantDescription,
        })
      }
      
      setRestaurants(loadedRestaurants);
      setIsLoading(false);
    }

    fetchMeals().catch((e)=>{
      setIsLoading(false);
      setHttpError(e.message);
    });
    
  }, [])

  if(isloading)
  {
    return <section className={classes.restaurantsLoading}>
      <p>Loading...</p>
    </section>
  }

  if(httpError){
    return <section className={classes.restaurantsError}>
      <p>{httpError}</p>
    </section>
  }
  const restaurantList = restaurants.map((restaurant) => (
    <RestaurantList
      key={restaurant.key}
      id={restaurant.id}
      name={restaurant.name}
      description={restaurant.description}
    />
  ));

  return (
    <section className={classes.restaurants}>
      <Card>
        <ul>{restaurantList}</ul>
      </Card>
    </section>
  );
};

export default AvailableRestaurants;
