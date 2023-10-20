import { useLocation } from "react-router-dom";
import CardPayment from "./CardPayment";
import Card from "../UI/Card";

const Payment = () => {
    const location = useLocation();
    const paymentDetails = location.state.paymentDetails;
    const userDetails = location.state.userDetails;
    const amount = location.state.amount;

    return (
        <Card>
            {paymentDetails}
            <CardPayment paymentDetails={paymentDetails} userDetails={userDetails} amount={amount}/>
        </Card>
    )
}

export default Payment;