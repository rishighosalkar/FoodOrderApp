import { Fragment } from 'react';

import MealsSummary from '../../Meals/MealsSummary';
import AvailableRestaurants from './AvailableRestaurants';

const Restaurants = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableRestaurants />
    </Fragment>
  );
};

export default Restaurants;
