import { useState } from 'react';
import { useSelector } from 'react-redux';
import RestaurantHeader from '../components/Restaurant/Layout/RestaurantHeader';
import RestaurantLogin from '../components/Restaurant/Login/RestaurantLogin';
import RestaurantSignup from '../components/Restaurant/Signup/RestaurantSignup';
import AddMeals from '../components/Restaurant/Meals/AddMeals';

const RestaurantMainNavigation = () => {

    const [loginIsShown, setLoginIsShown] = useState(false);
    const [signupIsShown, setSignupIsShown] = useState(false);
    const [addMealsIsShown, setAddMealsIsShown] = useState(false);

    const isRestuarantLoggedIn = useSelector(state => state.isRestarantLoggedIn);

    const showLoginHandler = () => {
        setLoginIsShown(true);
    }

    const hideLoginHandler = () => {
        setLoginIsShown(false);
    }

    const showSignupHandler = () => {
        if(isRestuarantLoggedIn)
            setSignupIsShown(false);
        else
            setSignupIsShown(true);
    }

    const hideSignupHandler = () => {
        setSignupIsShown(false);
    }

    const showAddMealHandler = () => {
        setAddMealsIsShown(true);
    }

    const hideAddMealHandler = () => {
        setAddMealsIsShown(false);
    }
    
    return (
        <>
            {addMealsIsShown && <AddMeals onClose={hideAddMealHandler} />}
            {signupIsShown && <RestaurantSignup onClose={hideSignupHandler}/>}
            {loginIsShown && <RestaurantLogin onClose={hideLoginHandler} />}
            <RestaurantHeader onShowLogin={showLoginHandler} onShowSignup={showSignupHandler} onShowAddMeals={showAddMealHandler} 
                            isLoggedIn={isRestuarantLoggedIn}/>

        </>
    )
}

export default RestaurantMainNavigation;