import { useContext, useState } from "react";
import Modal from "../../UI/Modal";
import LoginForm from "./LoginForm";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from './Login.module.css'; 
import Signup from "../Signup/Signup";
import CartContext from "../../../store/cart-context";
import Cookies from "js-cookie";

const Login = (props) => {
    const [showSignUp, setShowSignUp] = useState(false);
    const loadedCart = [];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartCtx = useContext(CartContext);

    const fetchCartData = async() => {
        const config = {
            headers:{
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
          };
        const url = 'https://localhost:7053/cart?userId=' +  localStorage.getItem('UserId');
        const res = await axios.get(url, config);
    
        if(res.data.statusCode === 200)
        {
            const resCart = res.data.cartItems;
      
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
                  
        }
    }

    const confirmHandler = async(data) => {
       const newUser = {
            email: data.username,
            password: data.password
        }
        var res = await axios.post('https://localhost:7053/user/login', newUser)
                            .catch(e => console.log(e));
        
        if(res.data.statusCode === 200)
        {
            dispatch({type: 'LOGIN'});
            localStorage.setItem('UserId', res.data.userData.userId);
            localStorage.setItem('token', res.data.accessToken);
            const user = res.data.userData;
            Cookies.set('userData', JSON.stringify(user));
            await fetchCartData();
            alert('Cart length: '+ loadedCart.length)
            if(loadedCart.length > 0)
            {
                Cookies.set('cartData', JSON.stringify(loadedCart), {expires: 1});
                const cartData = JSON.parse(Cookies.get('cartData'));
                cartData.map((item, index) => (
                    cartCtx.addItem({
                        id: item.cartId,
                        name: item.mealName,
                        amount: item.quantity,
                        price: item.totalPrice,
                    })              
                ))
            }
            props.onClose()
        }
        else if(res.data.statusCode === 404)
        {
            alert('Incorrect username/password!');
        }
        else{
            alert('Internal server error');
        }
    };

    const navigateToRestaurantSignup = () => {
        dispatch({type: 'MovedToRestaurant'})
        navigate('/restaurant', {
            state : {
                onClose: props.onClose,
            }
        });
    }

    const switchToSignUp = () => {
        setShowSignUp(true);
    }
    return (
        <Modal onClose = {props.onClose}>
            <div className={classes.header}>
                <span className={classes.headerAction}>Login</span>
                <span> | </span>
                <span onClick={switchToSignUp} className={classes.headerAction}>Sign Up</span>
            </div>
            {!showSignUp ? <LoginForm onConfirm={confirmHandler} onClose={props.onClose} /> 
                         : <Signup onClose={props.onClose} />}
            <div>
                <span>Want to register your restaurant?</span><span onClick={navigateToRestaurantSignup} className={classes.clickhere}>Click here</span>
            </div>
        </Modal>
    );
}

export default Login;