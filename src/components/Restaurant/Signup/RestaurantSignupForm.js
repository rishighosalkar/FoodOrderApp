import { useState, useRef } from "react";
import classes from './Signup.module.css';
import Collapse from "../../UI/Collapse";
const isEmpty = value => value.trim() === '';

const RestaurantSignupForm = (props) => {
    const [formValidity, setFormValidity] = useState({
        username: true,
        email: true,
        name: true,
        description: true,
        startTime: true,
        endTime: true,
        password: true,
        confirmPassword: true,
        phone: true,
        streetAddress: true,
        city: true,
        state: true,
        postalCode: true ,
        country: true   
    });

    const usernameInputRef = useRef();
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    const phoneInputRef = useRef();
    const streetAddressInputRef = useRef();
    const cityInputRef = useRef();
    const stateInputRef = useRef();
    const postalCodeInputRef = useRef();
    const countryInputRef = useRef();
    const descInputRef = useRef();
    const startTimeInputRef = useRef();
    const endTimeInputRef = useRef();
    
    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredUsername = usernameInputRef.current.value;
        const enteredName = nameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredDesc = descInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const enteredStreetAddress = streetAddressInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredState = stateInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current.value;
        const enteredCountry = countryInputRef.current.value;
        const enteredStartTime = startTimeInputRef.current.value;
        const enteredEndTime = endTimeInputRef.current.value;
        
        //alert('Meal Subcategory Category Value: ' + enteredmealSubCategory);
        const enteredUsernameIsValid = !isEmpty(enteredUsername);
        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredEmailIsValid = !isEmpty(enteredEmail);
        const enteredDescIsValid = !isEmpty(enteredDesc);
        const enteredPhoneIsValid = !isEmpty(enteredPhone);
        const enteredStreetAddressIsValid = !isEmpty(enteredStreetAddress);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredStateIsValid = !isEmpty(enteredState);
        const enteredPostalCodeIsValid = !isEmpty(enteredPostalCode);
        const enteredPasswordIsValid = !isEmpty(enteredPassword);
        const enteredConfirmPasswordIsValid = !isEmpty(enteredConfirmPassword);
        const enteredCountryIsValid = !isEmpty(enteredCountry);

        setFormValidity({
            username: enteredUsername,
            email: enteredEmail,
            name: enteredName,
            description: enteredDesc,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
            phone: enteredPhone,
            streetAddress: enteredStreetAddress,
            city: enteredCity,
            state: enteredState,
            postalCode: enteredPostalCode,
            country: enteredCountry
        })
        const formIsValid = enteredUsernameIsValid && enteredNameIsValid && enteredPasswordIsValid && enteredConfirmPasswordIsValid && enteredEmailIsValid && enteredPhoneIsValid
                            && enteredStreetAddressIsValid && enteredCityIsValid && enteredStateIsValid && enteredPostalCodeIsValid
                            && enteredCountryIsValid && enteredDescIsValid;
        if(!formIsValid)
        {return}
        const address = {
            streetAddress: enteredStreetAddress,
            city: enteredCity,
            state: enteredState,
            postalCode: enteredPostalCode,
            country: enteredCountry
        }
        const meals = []

        const newRestaurant = {
            restaurantUsername: enteredUsername,
            restaurantEmail: enteredEmail,
            restaurantPhone: enteredPhone,
            restaurantPassword: enteredPassword,
            restaurantName: enteredName,
            restaurantDescription: enteredDesc,
            startTime: enteredStartTime,
            endTime: enteredEndTime,
            restaurantMeals: meals,
            address: address
        }

        props.onConfirm(newRestaurant)
    };

    const nameControlClass = `${classes.control } ${formValidity.name ? '': classes.invalid}`
    const addressControlClass = `${classes.control } ${formValidity.address ? '': classes.invalid}`
    return (
        <form className={classes.form}  onSubmit={confirmHandler}>
            <Collapse heading='Restaurant Details'>
            <div className={nameControlClass}>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' ref={usernameInputRef}/>
                    {!formValidity.username && <p>Please enter a valid name</p>}
                </div>
                <div className={nameControlClass}>
                    <label htmlFor='name'>Restaurant Name</label>
                    <input type='text' id='name' ref={nameInputRef}/>
                    {!formValidity.name && <p>Please enter a valid name</p>}
                </div>
                <div className={nameControlClass}>
                    <label htmlFor='email'>Restaurant Email</label>
                    <input type='email' id='email' ref={emailInputRef}/>
                    {!formValidity.email && <p>Please enter a valid email</p>}
                </div>
                <div className={nameControlClass}>
                    <label htmlFor='phone'>Phone No.</label>
                    <input type='tel' id='phone' ref={phoneInputRef}/>
                    {!formValidity.phone && <p>Please enter a valid phone number</p>}
                </div>
                <div className={nameControlClass}>
                    <label htmlFor='startTime'>Start Time</label>
                    <input type='text' id='startTime' ref={startTimeInputRef}/>
                    {!formValidity.startTime && <p>Please enter valid time</p>}
                </div>
                <div className={nameControlClass}>
                    <label htmlFor='endTime'>End Time</label>
                    <input type='text' id='endTime' ref={endTimeInputRef}/>
                    {!formValidity.endTime && <p>Please enter valid time</p>}
                </div>
                <div className={nameControlClass}>
                    <label htmlFor='desc'>Restaurant Description</label>
                    <input type='text' id='desc' ref={descInputRef}/>
                    {!formValidity.description && <p>Please enter a valid name</p>}
                </div>
                <div className={addressControlClass}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' ref={passwordInputRef}/>
                    {!formValidity.password && <p>Please enter a valid password</p>}
                </div>
                <div className={addressControlClass}>
                    <label htmlFor='confirmpassword'>Confirm Password</label>
                    <input type='password' id='confirmpassword' ref={confirmPasswordInputRef}/>
                    {!formValidity.confirmPassword && <p>Please enter a valid password</p>}
                </div>
            </Collapse>
            <Collapse heading='Address' >
                <div className={nameControlClass}>
                    <label htmlFor='streetAddress'>Street Address</label>
                    <input type='text' id='streetAddress' ref={streetAddressInputRef}/>
                    {!formValidity.streetAddress && <p>Please enter a valid address</p>}
                </div>
                <div className={nameControlClass}>
                    <label htmlFor='postalCode'>Postal Code</label>
                    <input type='number' id='postalCode' ref={postalCodeInputRef}/>
                    {!formValidity.postalCode && <p>Please enter a valid postalCode</p>}
                </div>
                <div className={nameControlClass}>
                    <label htmlFor='city'>City</label>
                    <input type='text' id='city' ref={cityInputRef}/>
                    {!formValidity.city && <p>Please enter a valid city</p>}
                </div>
                <div className={nameControlClass}>
                    <label htmlFor='state'>State</label>
                    <input type='text' id='state' ref={stateInputRef}/>
                    {!formValidity.state && <p>Please enter a valid state</p>}
                </div>
                <div className={nameControlClass}>
                    <label htmlFor='country'>Country</label>
                    <input type='text' id='country' ref={countryInputRef}/>
                    {!formValidity.country && <p>Please enter a valid Country</p>}
                </div>
            </Collapse>   
            <div className={classes.actions}>
                <button type='button' onClick={props.onClose}>
                Cancel
                </button>
                <button className={classes.submit}>Register</button>
            </div>
        </form>
    )
}

export default RestaurantSignupForm;