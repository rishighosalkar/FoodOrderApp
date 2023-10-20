import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import CardPaymentForm from "./CardPaymentForm";

const stripePromise = loadStripe('');

const CardPayment = (props) => {
    return (
        <div>
            <h1>Card Payment</h1>
            <Elements stripe={stripePromise}>
                <CardPaymentForm paymentDetails={props.paymentDetails} userDetails={props.userDetails} amount={props.amount}/>
            </Elements>
        </div>
    )
}

export default CardPayment;