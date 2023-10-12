import { useState } from "react";
import RestaurantLogin from "../Login/RestaurantLogin";
import RestaurantSignup from "../Signup/RestaurantSignup";

const Common = (props) => {
    const [isCLicked, setIsCLicked] = useState(false);
    const [loginIsShown, setLoginIsShown] = useState(false);
    const [signupIsShown, setSignupIsShown] = useState(false);

    const showLoginHandler = () => {
    setLoginIsShown(true);
    }

    const hideLoginHandler = () => {
    setLoginIsShown(false);
    }

    const showSignupHandler = () => {
    setSignupIsShown(true);
    }

    const hideSignupHandler = () => {
    setSignupIsShown(false);
    }
    
    const onClickHandler = (mode) => {
        if(mode === 'login')
            setIsCLicked(false);
        else
            setIsCLicked(true);
    }
    
    return(
        <>
            <div >
                <span onClick={onClickHandler('login')}>Login</span>
                <span> | </span>
                <span onClick={onClickHandler('signup')}>Sign Up</span>
            </div>
            {!isCLicked ? loginIsShown && <RestaurantLogin onClose={hideLoginHandler} /> : signupIsShown && <RestaurantSignup onClose={hideSignupHandler}/>}
        </>
    )
}

export default Common;