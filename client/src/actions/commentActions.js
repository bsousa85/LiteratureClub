import axios from 'axios';
import { ADD_COMMENT, DELETE_COMMENT } from './types';

export const addComment = (comment) => dispatch => {
    axios
        .post('/comments/addComment', comment)
        .then(res => {
            dispatch({
                type: ADD_COMMENT,
                payload: res.data
            });
        });
};

export const deleteComment = (id) => dispatch => {
    axios  
        .delete(`/comments/delete/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_COMMENT,
                payload: res.data
            });
        });
};