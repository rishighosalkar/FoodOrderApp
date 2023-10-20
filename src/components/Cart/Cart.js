import { useContext, useEffect, useState } from 'react';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CheckOut from './CheckOut';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PaymentMethod from './PaymentMethod';
import { useDispatch } from 'react-redux';

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const fetchUserData = () => {
    const userData = JSON.parse(Cookies.get('userAddress'));
    if(userData != null)
      setUser(userData);
    console.log('UserData checkout', user);
  }

  useEffect(() => {
    // fetchUserData();
    const userData = JSON.parse(Cookies.get('userAddress'));
    if(userData != null)
      setUser(userData);
    console.log('UserData checkout', user);
  }, [])

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1});
  };

  const orderHandler = () => {
    setIsCheckOut(true);
  }

  const checkOrderConfirmation = () => {
    dispatch({type: 'ORDERCONFIRMATION'});
  }
  const paymentHandler = () => {
    const isOrderConfirmed = checkOrderConfirmation();
    //setIsPayment(true);
    setIsCheckOut(false);
  }
  const submitOrderHandler = (paymentDetails) => {
    // fetch('https://food-order-app-24c9e-default-rtdb.firebaseio.com/orders.json',{
    //   method: 'POST',
    //   body: JSON.stringify({
    //     user: userData,
    //     orderedItems: cartCtx.items
    //   })
    // })
    // cartCtx.clearCart();
    
    navigate('/payment', {
      state: {
        paymentDetails: paymentDetails,
        userDetails: user,
        amount: totalAmount
      }
    });
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item, index) => (
        <CartItem
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onAdd={cartItemAddHandler.bind(null, item)}
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
      {isCheckOut && <CheckOut onConfirm={paymentHandler} onCancel={props.onClose} user={user}/>}
      {isPayment && <PaymentMethod onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
      {!isCheckOut && !isPayment && <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>}
    </Modal>
  );
};

export default Cart;
