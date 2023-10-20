import React, { useState } from "react";
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useStripe, useElements, CardElement, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";

const CardPaymentForm = (props) => {
    const stripe = useStripe();
    const elements = useElements();

    const [errors, setErrors] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!stripe || !elements)
        {
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            amount: props.paymentDetails.amount
        })
        // const {token, error} = await stripe.createToken(elements.getElement(CardElement));

        if(error){
            setErrors(error);
        }
        else{
            // console.log(token);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Card Deatils:
                <CardElement />
                {/* <CardNumberElement />
                <CardCvcElement />
                <CardExpiryElement /> */}
                <div>{props.amount}</div>
            </label>
            <button type="submit">Pay Now</button>
            {errors && <div>{errors}</div>}
        </form>
    )
}

export default CardPaymentForm;