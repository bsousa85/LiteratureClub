import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, DELETE_USER, LOGIN_ERROR, CHECK_USER } from '../actions/types';


const initialState = {
    username: "",
    message: "",
    errorMessage: "",
    authenticated: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOGIN_USER:
            localStorage.setItem(action.payload.user, action.payload.token);
            return {
                ...state,
                message: action.payload.message,
                username: action.payload.user,
                authenticated : true
            }
        case LOGIN_ERROR:
            return {
                ...state,
                errorMessage: action.payload,
                authenticated : false
            }
        case REGISTER_USER:
            return {
                ...state,
                message: action.payload
            }
        case LOGOUT_USER:
            localStorage.clear();
            return {
                ...state,
                authenticated : false
            }
        case DELETE_USER:
            return {
                ...state
            }
        case CHECK_USER:
            return {
                ...state,
                authenticated : true
            }
        default:
            return state;
    }
}