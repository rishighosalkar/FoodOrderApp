import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import { BiRupee } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();
  const price = `${props.price.toFixed(2)}`;

  const addToCartHandler = async(amount) => {
    const cart = {
      'userId': parseInt(localStorage.getItem('UserId')),
      'mealId': props.id,
      'mealName': props.name,
      'quantity': amount,
      'totalPrice': props.price,
      'addedAt': new Date().toISOString()
    }

    console.log('Cart: ',cart);
    const config = {
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    };

    var res = await axios.post('https://localhost:7053/cart/add', cart, config)
                          .catch(e => alert(e));
    
    if(res.data.statusCode === 200)
    {
      
      const resCart = res.data.cartItems;
      if(cartCtx.items.length === 0)
      {
        const loadedCart = [];

        for(const key in resCart)
        {
          loadedCart.push({
            cartId: resCart[key].cartId,
            userId: resCart[key].userId,
            mealId: resCart[key].mealId,
            mealName: resCart[key].mealName,
            quantity: resCart[key].quantity,
            totalPrice: resCart[key].totalPrice,
            addedAt: resCart[key].addedAt
          });
        }
        Cookies.set('cartData', JSON.stringify(loadedCart), {expires: 1});
      }
      else{
        const loadedCart = JSON.parse(Cookies.get('cartData'));
        for(const key in resCart)
        {
          loadedCart.push({
            cartId: resCart[key].cartId,
            userId: resCart[key].userId,
            mealId: resCart[key].mealId,
            mealName: resCart[key].mealName,
            quantity: resCart[key].quantity,
            totalPrice: resCart[key].totalPrice,
            addedAt: resCart[key].addedAt
          });
        }
        Cookies.set('cartData', JSON.stringify(loadedCart), {expires: 1});
      }
      cartCtx.addItem({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price,
      });
      alert('Meal added to the cart!');
    }
    else{
      alert("Error while addind meal to cart!");
    }
  };

  const redirectToRestaurant = () => {
    console.log('Restaurant Id in meal item home page: ', props.restaurantId);
    navigate('restaurant-meals', {
      state:{
        restaurantId: props.restaurantId,
        restaurantName: props.restaurantName
      }
    })
  }
  return (
    <li className={classes.meal}>
      <div>
        {!props.isForRestaurant && <div onClick={redirectToRestaurant} className={classes.restaurantName}>
          <h3>{props.restaurantName}</h3>
        </div>}
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}><BiRupee />{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler}/>
      </div>
    </li>
  );
};

export default MealItem;
