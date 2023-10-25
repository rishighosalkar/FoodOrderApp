import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import CardPaymentForm from "./CardPaymentForm";

const stripePromise = loadStripe('pk_test_51O2bSLSFo8atn64ZNmMTOv5N2f8DxATZ2kpzU2MgiFhbpGDWj54ho5Dy4EdXu4dO4qB8LRaC72K2UzW8aCOzBoWd00vlwp6f02');

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