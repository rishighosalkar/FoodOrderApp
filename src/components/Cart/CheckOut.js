import { useRef, useState } from 'react';
import classes from './CheckOut.module.css';

const isEmpty = value => value.trim() === '';
const isNotSixChar = value => value.trim().length !== 6;
const Checkout = (props) => {
    const [formValidity, setFormValidity] = useState({
        name: true,
        address: true,
        city: true,
        pincode: true
    });
    const nameInputRef = useRef();
    const addressInputRef = useRef();
    const pincodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredPincode = pincodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredAddressIsValid = !isEmpty(enteredAddress);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPincodeIsValid = !isNotSixChar(enteredPincode);

        setFormValidity({
            name: enteredNameIsValid,
            address: enteredAddressIsValid,
            city: enteredCityIsValid,
            pincode: enteredPincodeIsValid
        })
        const formIsValid = enteredNameIsValid && enteredAddressIsValid && enteredCityIsValid
                            && enteredPincodeIsValid;
        if(!formIsValid)
        {return}
        props.onConfirm({
            user_id: localStorage.getItem('userId'),
            name: enteredName,
            address: enteredAddress,
            pincode: enteredPincode,
            city: enteredCity
        })
    };

    const nameControlClass = `${classes.control } ${formValidity.name ? '': classes.invalid}`
    const addressControlClass = `${classes.control } ${formValidity.address ? '': classes.invalid}`
    const pincodeControlClass = `${classes.control } ${formValidity.pincode ? '': classes.invalid}`
    const cityControlClass = `${classes.control } ${formValidity.city ? '': classes.invalid}`
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
        <div className={nameControlClass}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameInputRef} value={props.user.userName ? props.user.userName : ''}/>
            {!formValidity.name && <p>Please enter a valid name</p>}
        </div>
        <div className={addressControlClass}>
            <label htmlFor='address'>Address</label>
            <input type='text' id='address' ref={addressInputRef} value={props.user.address.streetAddress ? props.user.address.streetAddress : ''}/>
            {!formValidity.address && <p>Please enter a valid address</p>}
        </div>
        <div className={pincodeControlClass}>
            <label htmlFor='pincode'>Pin Code</label>
            <input type='text' id='pincode' ref={pincodeInputRef} value={props.user.address.postalCode ? props.user.address.postalCode : ''}/>
            {!formValidity.pincode && <p>Please enter a valid pincode</p>}
        </div>
        <div className={cityControlClass}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityInputRef} value={props.user.address.city ? props.user.address.city : ''}/>
            {!formValidity.city && <p>Please enter a valid city</p>}
        </div>
        <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>
            Cancel
            </button>
            <button className={classes.submit}>Confirm</button>
        </div>
        </form>
    );
};

export default Checkout;