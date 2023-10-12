import { Fragment } from 'react';
import mealsImage from '../../../assets/meals.jpg';
import classes from './Header.module.css';
import RestaurantLoginButton from './RestaurantLoginButton';
import { NavLink } from 'react-router-dom';
import RestaurantSignupButton from './RestaurantSignupButton';
import RestaurantAddMealsButton from './RestaurantAddMealsButton';

const RestaurantHeader = (props) => {

  return (
    <Fragment>
      <header className={classes.header}>
        <NavLink to="/restaurant" 
          className= {classes.active}
          end>
          <h1>TastyMeals</h1>
        </NavLink>
        <div className={classes.buttons}>
          {props.isLoggedIn && <RestaurantAddMealsButton onClick={props.onShowAddMeals} />}
          {!props.isLoggedIn && <RestaurantSignupButton onClick={props.onShowSignup} />}
          <RestaurantLoginButton onClick={props.onShowLogin} />
        </div>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default RestaurantHeader;
