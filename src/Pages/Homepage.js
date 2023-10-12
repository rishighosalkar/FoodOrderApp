import { useSelector } from "react-redux";
import Meals from "../components/Meals/Meals";
import Restaurants from "../components/Restaurant/RestaurantList/Restaurants";

const Homepage = () => {
    const isRestaurantPage = useSelector(state => state.isRestaurantPage);
    return (
        <>
            {isRestaurantPage ? <Restaurants /> : <Meals />}
        </>
    )
}

export default Homepage;