import {createStore} from 'redux';

const loginReducer = (state = {isLoggedIn: false}, action) => {
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
    return state;
}

const store = createStore(loginReducer);

export default store;