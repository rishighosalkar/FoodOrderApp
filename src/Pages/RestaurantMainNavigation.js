import { useState } from 'react';
import { useSelector } from 'react-redux';
import RestaurantHeader from '../components/Restaurant/Layout/RestaurantHeader';
import RestaurantLogin from '../components/Restaurant/Login/RestaurantLogin';
import RestaurantSignup from '../components/Restaurant/Signup/RestaurantSignup';
import AddMeals from '../components/Restaurant/Meals/AddMeals';
import Toast from '../components/UI/Toast';
import { onMessageListener} from '../firebase';
import ConfirmOrder from '../components/Restaurant/ConfirmOrder/ConfirmOrder';


const RestaurantMainNavigation = () => {
    const [loginIsShown, setLoginIsShown] = useState(false);
    const [signupIsShown, setSignupIsShown] = useState(false);
    const [addMealsIsShown, setAddMealsIsShown] = useState(false);
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({isSuccess: false, message: ''});
    const [order, setOrder] = useState();
    
    //fetchToken(setTokenFound);

    onMessageListener().then(payload => {
      setNotification({isSuccess: payload.notification.isSuccess, message: payload.notification.message})
      setShow(true);
      setOrder(payload.notification.cartDetails);
      console.log('Notification Payload',payload);
    }).catch(err => console.log('failed: ', err));

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

    const showOrderToastHandler = () => {
        setAddMealsIsShown(true);
    }

    const hideOrderToastHandler = () => {
        setAddMealsIsShown(false);
    }
    
    return (
        <>
            {addMealsIsShown && <AddMeals onClose={hideAddMealHandler} />}
            {signupIsShown && <RestaurantSignup onClose={hideSignupHandler}/>}
            {loginIsShown && <RestaurantLogin onClose={hideLoginHandler} />}
            {/* {show && <Toast notification={notification} />} */}
            {show && <ConfirmOrder items={order} onClose={hideOrderToastHandler} />}
            <RestaurantHeader onShowLogin={showLoginHandler} onShowSignup={showSignupHandler} onShowAddMeals={showAddMealHandler} 
                            isLoggedIn={isRestuarantLoggedIn}/>

        </>
    )
}

export default RestaurantMainNavigation;