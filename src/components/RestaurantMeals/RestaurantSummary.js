import classes from './RestaurantSummary.module.css';

const RestaurantSummary = (props) => {
    return (
        <section className={classes.summary}>
          <h2>Delicious Food, Delivered To You By 
              <div>{props.restaurantName}</div>
          </h2>
          <p>
            Choose your favorite meal from our broad selection of available meals
            and enjoy a delicious lunch or dinner at home.
          </p>
        </section>
      );
}

export default RestaurantSummary;