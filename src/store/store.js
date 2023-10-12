import {createStore} from 'redux';

// const state = {
//     isLoggedIn: false,
//     isRestarantPage: false
// }


const Reducer = (state = {
                        isLoggedIn: false,
                        isRestarantLoggedIn: false
                    }, action) => {
    if(action.type === 'login'){
        return {
            isLoggedIn: true
        }
    }
    if(action.type === 'logout'){
        localStorage.removeItem('userId');
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
    return state;
}

const store = createStore(Reducer);

export default store;