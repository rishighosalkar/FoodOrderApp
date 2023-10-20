import { useState, useRef } from "react";
import classes from './Order.module.css';

const isEmpty = value => value.trim() === '';

const OrderForm = (props) => {
    const [formValidity, setFormValidity] = useState({
        username: true,
        email:true,
        password: true,
        confirmPassword: true,
        phone: true,
        streetAddress: true,
        city: true,
        state: true,
        postalCode: true,
        country: true
    });

    const usernameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    const phoneInputRef = useRef();
    const streetAddressInputRef = useRef();
    const cityInputRef = useRef();
    const stateInputRef = useRef();
    const postalCodeInputRef = useRef();
    const countryInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredUserame = usernameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const enteredStreetAddress = streetAddressInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredState = stateInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current.value;
        const enteredCountry = countryInputRef.current.value;

        const enteredUsernameIsValid = !isEmpty(enteredUserame);
        const enteredEmailIsValid = !isEmpty(enteredEmail);
        const enteredPhoneIsValid = !isEmpty(enteredPhone);
        const enteredStreetAddressIsValid = !isEmpty(enteredStreetAddress);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredStateIsValid = !isEmpty(enteredState);
        const enteredPostalCodeIsValid = !isEmpty(enteredPostalCode);
        const enteredPasswordIsValid = !isEmpty(enteredPassword);
        const enteredConfirmPasswordIsValid = !isEmpty(enteredConfirmPassword);
        const enteredCountryIsValid = !isEmpty(enteredCountry);

        setFormValidity({
            username: enteredUserame,
            email: enteredEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
            phone: enteredPhone,
            streetAddress: enteredStreetAddress,
            city: enteredCity,
            state: enteredState,
            postalCode: enteredPostalCode,
            country: enteredCountry
        })
        const formIsValid = enteredUsernameIsValid && enteredPasswordIsValid && enteredConfirmPasswordIsValid && enteredEmailIsValid && enteredPhoneIsValid
                            && enteredStreetAddressIsValid && enteredCityIsValid && enteredStateIsValid && enteredPostalCodeIsValid
                            && enteredCountryIsValid;
        if(!formIsValid)
        {return}
        const address = {
            streetAddress: enteredStreetAddress,
            city: enteredCity,
            state: enteredState,
            postalCode: enteredPostalCode,
            country: enteredCountry
        }
        const user = {
            username: enteredUserame,
            email: enteredEmail,
            password: enteredPassword,
            phone: enteredPhone,
            address: address,
            orders: [], 
            carts: []
        }

        props.onConfirm(user)
    };

    const nameControlClass = `${classes.control } ${formValidity.name ? '': classes.invalid}`;
    const addressControlClass = `${classes.control } ${formValidity.address ? '': classes.invalid}`;

    return(
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClass}>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' ref={usernameInputRef}/>
                {!formValidity.username && <p>Please enter a valid name</p>}
            </div>
            <div className={nameControlClass}>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' ref={emailInputRef}/>
                {!formValidity.email && <p>Please enter a valid email</p>}
            </div>
            <div className={nameControlClass}>
                <label htmlFor='phone'>Phone No.</label>
                <input type='tel' id='phone' ref={phoneInputRef}/>
                {!formValidity.phone && <p>Please enter a valid phone number</p>}
            </div>
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
            <div className={classes.actions}>
                <button type='button' onClick={props.onClose}>
                Cancel
                </button>
                <button className={classes.submit}>Order</button>
            </div>
        </form>
    )
}

export default OrderForm;