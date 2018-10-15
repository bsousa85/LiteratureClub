import { GET_POSTS, GET_USER_POSTS, ADD_POST, ADD_POST_ERROR, DELETE_POST, POSTS_LOADING, UPDATE_POST,
     UPDATE_POST_ERROR, UPDATE_LIKES, RESET_REDIRECT, RESET_ERRORMESSAGE, RESET_MESSAGE, RESET_LIKED } from '../actions/types';


const initialState = {
    posts: [],
    userPosts: [],
    loading: false,
    message: "",
    errorMessage: "",
    redirect: false,
    liked: false
};

export default function(state=initialState, action) {
    switch(action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                userPosts: state.userPosts.filter(post => post._id !== action.payload),
                message: action.payload.message
            }
        case ADD_POST:
            return {
                ...state,
                message: action.payload.message,
                redirect: true
            }
        case ADD_POST_ERROR:
            return {
                ...state,
                errorMessage: action.payload.message
            }
        case POSTS_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_USER_POSTS:
            return {
                ...state,
                userPosts: action.payload,
                loading: false
            }
        case UPDATE_POST:
            return {
                ...state,
                message: action.payload.message,
                redirect: true
            }
        case UPDATE_POST_ERROR:
            return {
                ...state,
                errorMessage: action.payload.message
            }
        case UPDATE_LIKES:
            return {
                ...state,
                message: action.payload.message,
                liked: true
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
        case RESET_LIKED:
            return {
                ...state,
                liked: false
            }
        default:
            return state;
    }
}