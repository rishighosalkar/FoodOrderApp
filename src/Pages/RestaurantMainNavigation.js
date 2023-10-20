import { useEffect, useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import RestaurantHeader from '../components/Restaurant/Layout/RestaurantHeader';
import RestaurantLogin from '../components/Restaurant/Login/RestaurantLogin';
import RestaurantSignup from '../components/Restaurant/Signup/RestaurantSignup';
import AddMeals from '../components/Restaurant/Meals/AddMeals';
import Toast from '../components/UI/Toast';

const RestaurantMainNavigation = () => {
    const store = useStore();
    const [loginIsShown, setLoginIsShown] = useState(false);
    const [signupIsShown, setSignupIsShown] = useState(false);
    const [addMealsIsShown, setAddMealsIsShown] = useState(false);
    const [toastAlert, setToastAlert] = useState(false);

    const isRestuarantLoggedIn = useSelector(state => state.isRestarantLoggedIn);
    const showToastAlert = useSelector(state => state.receivedOrder);//store.getState().receivedOrder

    useEffect(()=>{
        alert(isRestuarantLoggedIn);
        alert(showToastAlert);
        if(isRestuarantLoggedIn && showToastAlert)
            setToastAlert(true);
    }, [isRestuarantLoggedIn, showToastAlert]);

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
            {toastAlert && <Toast />}
            <RestaurantHeader onShowLogin={showLoginHandler} onShowSignup={showSignupHandler} onShowAddMeals={showAddMealHandler} 
                            isLoggedIn={isRestuarantLoggedIn}/>

        </>
    )
}

export default RestaurantMainNavigation;