import {ADD_COMMENT, DELETE_COMMENT } from '../actions/types';

const initialState = {
    message : ""
};

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_COMMENT:
            return {
                ...state,
                message: action.payload.message
            };
        case DELETE_COMMENT:
            return {
                ...state,
                message: action.payload.message
            };
        default:
            return state;
    }
}