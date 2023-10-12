import classes from './RestaurantList.module.css';

const RestaurantList = (props) => {

  return (
    <li className={classes.restaurant}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
      </div>
    </li>
  );
};

export default RestaurantList;
