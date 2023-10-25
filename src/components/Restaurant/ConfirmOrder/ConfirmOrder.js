import { useEffect } from 'react';
import ConfirmOrderItems from './ConfirmOrderItems';
import Modal from '../../UI/Modal';
import classes from './ConfirmOrder.module.css';
import axios from 'axios';

const ConfirmOrder = (props) => {

  const totalAmount = `$${props.totalAmount.toFixed(2)}`;
  const hasItems = props.items.length > 0;

  useEffect(() => {
    
  }, [])


  const orderHandler = () => {
    // setIsCheckOut(true);
  }

  
  const paymentHandler = async() => {
    // dispatch({type: 'ORDERCONFIRMATION'});
    // const token = await fetchToken(setTokenFound);
    // if(token){
    //   const orderData = {
    //     userId: user.userId,
    //     orderDate: new Date().toISOString(),
    //     deliveryAddress: 'test',
    //     totalAmount: parseInt(props.totalAmount),
    //     paymentMethod: 'CARD',
    //     orderStatus: 'PENDING'
    //   }
    //   const notificationParams = {
    //     deviceId: token,
    //     title: 'Received Order',
    //     message: 'Test',
    //     cartDetails: cart
    //   }
    //   console.log('orderData', orderData)
    //   const params = {
    //     order: orderData,
    //     notification: notificationParams,
    //     cart: cart
    //   }

    //   console.log('Parameters', params);

    //   const res = await axios.post('https://localhost:7053/order/add', params)
    //                     .catch(e => console.log(e));

    //   console.log(res.data);
    //   alert('Order status code',res.data.statusCode)
    //   if(res.data.statusCode === 200)
    //   {
    //     console.log(res.data.message);
    //     props.onClose();
    //   }

    // }
  }
  

  const cartItems = (
    <ul className={classes['confirm-items']}>
      {props.items.map((item, index) => (
        <ConfirmOrderItems
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
      />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>
    </Modal>
  );
};

export default ConfirmOrder;
