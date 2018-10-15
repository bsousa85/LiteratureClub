import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, DELETE_USER, LOGIN_ERROR, CHECK_USER, UPDATE_USER, RESET_REDIRECT,
RESET_MESSAGE, RESET_ERRORMESSAGE } from '../actions/types';


const initialState = {
    username: "",
    message: "",
    userID: "",
    errorMessage: "",
    authenticated: false,
    redirect: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOGIN_USER:
            localStorage.setItem(action.payload.user, action.payload.token);
            return {
                ...state,
                message: action.payload.message,
                username: action.payload.user,
                userID: action.payload.userID,
                authenticated : true,
                redirect: true
            }
        case LOGIN_ERROR:
            return {
                ...state,
                errorMessage: action.payload.message,
                authenticated : false
            }
        case REGISTER_USER:
            return {
                ...state,
                message: action.payload,
                redirect: true
            }
        case LOGOUT_USER:
            localStorage.clear();
            return {
                ...state,
                authenticated : false,
            }
        case DELETE_USER:
            return {
                ...state
            }
        case UPDATE_USER:
            return {
                ...state,
                message: action.payload.message
            }
        case CHECK_USER:
            return {
                ...state,
                authenticated : true
            }
        case RESET_REDIRECT:
            return {
                ...state,
                redirect: false
            }
        case RESET_MESSAGE:
            return {
                ...state,
                message: ""
            }
        case RESET_ERRORMESSAGE:
            return {
                ...state,
                errorMessage: ""
            }
        default:
            return state;
    }
}