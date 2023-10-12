import { useSelector } from "react-redux";
import Restaurants from "../components/Restaurant/RestaurantList/Restaurants";

const RestaurantHomepage = () => {
    // const isRestaurantPage = useSelector(state => state.isRestaurantPage);
    return (
        <>
            <Restaurants />
        </>
    )
}

export default RestaurantHomepage;