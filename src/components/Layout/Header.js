import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderLoginButton from './HeaderLoginButton';
import { useSelector } from 'react-redux';

const Header = (props) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>TastyMeals</h1>
        <div className={classes.buttons}>
          <HeaderCartButton onClick={props.onShowCart} />
          <HeaderLoginButton onClick={props.onShowLogin} />
        </div>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;
