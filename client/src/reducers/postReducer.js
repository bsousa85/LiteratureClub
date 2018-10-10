import { GET_POSTS, ADD_POST, DELETE_POST, POSTS_LOADING } from '../actions/types';


const initialState = {
    posts: [],
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
                ...state
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
        default:
            return state;
    }
}