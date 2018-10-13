import { GET_POSTS, GET_USER_POSTS, ADD_POST, DELETE_POST, POSTS_LOADING, UPDATE_POST } from '../actions/types';


const initialState = {
    posts: [],
    userPosts: [],
    loading: false,
    message: ""
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
                message: action.payload.message
            }
        case ADD_POST:
            return {
                ...state,
                //posts: [action.payload, ...state.posts]
                message: action.payload.message
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
            message: action.payload.message
        }
        default:
            return state;
    }
}