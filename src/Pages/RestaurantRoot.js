import { Outlet } from "react-router-dom";
import RestaurantMainNavigation from "./RestaurantMainNavigation";

const RestaurantRootLayout = () => {
    return(
        <>
            <RestaurantMainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default RestaurantRootLayout;