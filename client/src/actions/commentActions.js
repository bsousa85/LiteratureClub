import axios from 'axios';
import { ADD_COMMENT, DELETE_COMMENT, GET_POST_COMMENTS, GET_COMMENTS } from './types';

export const getComments = () => dispatch => {
    axios
        .get('/comments')
        .then(res => dispatch({
            type: GET_COMMENTS,
            payload: res.data
        }));
};

export const addComment = (comment) => dispatch => {
    axios
        .post('/comments/addComment', comment)
        .then(res => {
            console.log("DATA");
            console.log(res.data);
            dispatch({
                type: ADD_COMMENT,
                payload: res.data
            });
        });
};

export const deleteComment = (id) => dispatch => {
    axios  
        .delete(`/comments/delete/${id}`)
        .then(res => dispatch({
                type: DELETE_COMMENT,
                payload: res.data
            }));
};

export const getPostComments = (id) => dispatch => {
    axios
        .get(`/comments/post/${id}`)
        .then(res => dispatch({
            type: GET_POST_COMMENTS,
            payload: res.data
        }));
};