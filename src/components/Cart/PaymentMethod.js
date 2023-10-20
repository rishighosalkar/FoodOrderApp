import { useRef, useState } from 'react';
import classes from './CheckOut.module.css';

const PaymentMethod = (props) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const paymentMethodInputRef = useRef();

    const onCheckChanged = (event) => {
        // event.preventDefault();
        console.log('Payment method',event.target.value);
        setPaymentMethod(event.target.value)
        
    }

    const confirmHandler = (event) => {
        event.preventDefault();
        if(!paymentMethod)
        {return}
        props.onConfirm(paymentMethod);
    };

    const nameControlClass = `${classes.control } ${paymentMethod ? '': classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
        <div className={nameControlClass}>
            <label htmlFor='payment'>Please select a payment method</label>
        </div>
        <div className={nameControlClass}>
            <label htmlFor='cardPayment'>Credit / Debit card</label>
            <input type='radio'  name='paymentMethod' checked={paymentMethod === 'CARDPAYMENT'} value='CARDPAYMENT' 
            onChange={onCheckChanged}
            />
            {!paymentMethod && <p>Please select a payment method</p>}
        </div>
        <div className={nameControlClass}>
            <label htmlFor='upiPayment'>UPI Payment(Phone Pay)</label>
            <input type='radio' name='paymentMethod' value='UPIPAYMENT' checked={paymentMethod === 'UPIPAYMENT'}
             onChange={onCheckChanged}
             />
            {!paymentMethod && <p>Please select a payment method</p>}
        </div>
        <div className={nameControlClass}>
            <label htmlFor='cod'>Cash On Delivery</label>
            <input type='radio' name='paymentMethod' value='COD' checked={paymentMethod === 'COD'}
            onChange={onCheckChanged}
            />
             {!paymentMethod && <p>Please select a payment method</p>}
        </div>
        <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>
            Cancel
            </button>
            <button className={classes.submit}>Confirm Order</button>
        </div>
        </form>
    );
};

export default PaymentMethod;