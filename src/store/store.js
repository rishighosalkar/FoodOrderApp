import {createStore} from 'redux';

// const state = {
//     isLoggedIn: false,
//     isRestarantPage: false
// }


const Reducer = (state = {
                        isLoggedIn: false,
                        isRestarantLoggedIn: false,
                        receivedOrder: false
                    }, action) => {
    if(action.type === 'LOGIN'){
        return {
            isLoggedIn: true
        }
    }
    if(action.type === 'LOGOUT'){
        localStorage.removeItem('UserId');
        localStorage.removeItem('token');
        return {
            isLoggedIn: false
        }
    }
    if(action.type === 'RESTAURANTLOGIN'){
        return {
            isRestarantLoggedIn: true
        }
    }

    if(action.type === 'RESTAURANTLOGOUT'){
        return {
            isRestarantLoggedIn: false
        }
    }

    if(action.type === 'ORDERCONFIRMATION'){
        alert(action.type);
        const existingState = state;
        existingState.receivedOrder = true;
        return existingState;
    }
    return state;
}

const store = createStore(Reducer);

export default store;