import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
// import HeaderLoginButton from './HeaderLoginButton';
import HeaderLoginSignupButton from './HeaderLoginSignupButton';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  
  return (
    <Fragment>
      <header className={classes.header}>
        <NavLink to="/" 
          className= {classes.active}
          end>
          <h1>TastyMeals</h1>
        </NavLink>
        <div className={classes.buttons}>
          <HeaderCartButton onClick={props.onShowCart} />
          {/* <HeaderLoginButton onClick={props.onShowLogin} /> */}
          <HeaderLoginSignupButton onClick={props.onShowLoginSignup} />
        </div>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;
