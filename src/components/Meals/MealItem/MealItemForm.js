import { useState, useRef } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import { useDispatch, useSelector } from 'react-redux';

const MealItemForm = (props) => {

  const dispatch = useDispatch();

  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const submitHandler = e => {
    e.preventDefault();
    if(isLoggedIn){
      const enteredAmount = amountInputRef.current.value;
      const enteredAmountNumber = +enteredAmount;

      if (
        enteredAmount.trim().length === 0 ||
        enteredAmountNumber < 1 ||
        enteredAmountNumber > 5
      ) {
        setAmountIsValid(false);
        return;
      }

      props.onAddToCart(enteredAmountNumber);
    }
    else{
      alert('Please login');
    }
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
