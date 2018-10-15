import {ADD_COMMENT, DELETE_COMMENT, GET_POST_COMMENTS, GET_COMMENTS } from '../actions/types';

const initialState = {
    message : "",
    comments: [],
    postComments: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_COMMENT:
            console.log("PAYLOAD");
            console.log(action.payload.comment);
            return {
                ...state,
                message: action.payload.message,
                comments: [action.payload.comment, ...state.comments]
            };
        case DELETE_COMMENT:
            return {
                ...state,
                message: action.payload.message
            };
        case GET_POST_COMMENTS:
            return {
                ...state,
                postComments: action.payload
            }
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.payload
            }
        default:
            return state;
    }
}