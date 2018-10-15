import axios from 'axios';
import { GET_POSTS, ADD_POST, ADD_POST_ERROR, DELETE_POST, POSTS_LOADING, GET_USER_POSTS, UPDATE_POST,
     UPDATE_POST_ERROR, UPDATE_LIKES, RESET_REDIRECT, RESET_ERRORMESSAGE, RESET_MESSAGE, RESET_LIKED } from './types';

export const getPosts = () => dispatch => {
    dispatch(setPostsLoading());
    axios
        .get('/posts/')
        .then(res => dispatch({
                type: GET_POSTS,
                payload: res.data
            }));
};

export const getUserPosts = (user) => dispatch => {
    dispatch(setPostsLoading());
    axios
        .get(`/posts/${user}`)
        .then(res => dispatch({
                type: GET_USER_POSTS,
                payload: res.data
            }));
};

export const deletePost = (id) => dispatch => {
    axios 
        .delete(`/posts/delete/${id}`)
        .then(res => dispatch({
            type: DELETE_POST,
            payload: id
        }));
};

export const addPost = (post) => dispatch => {
    axios
        .post('/posts/newPost', post)
        .then(res => {
            if(res.data.success) {
                dispatch({
                    type: ADD_POST,
                    payload: res.data
                });
            }
            else {
                dispatch({
                    type: ADD_POST_ERROR,
                    payload: res.data
                });
            }
        });
};

export const updatePost = (id, post) => dispatch => {
    axios
        .put(`/posts/${id}`, post)
        .then(res => {
            if(res.data.success) {
                dispatch({
                    type: UPDATE_POST,
                    payload: res.data
                });
            }
            else {
                dispatch({
                    type: UPDATE_POST_ERROR,
                    payload: res.data
                });
            }
        });
};

export const incrementLikes = (id, post) => dispatch => {
    axios
        .put(`/posts/${id}`, post)
        .then(res => dispatch({
            type: UPDATE_LIKES,
            payload: res.data
        }));
}

export const decrementLikes = (id, post) => dispatch => {
    axios
        .put(`/posts/like/${id}`, post)
        .then(res => dispatch({
            type: UPDATE_LIKES,
            payload: res.data
        }));
}

export const setPostsLoading = () => {
    return {
        type: POSTS_LOADING
    };
};

export const resetPostRedirect = () => dispatch => {
    dispatch({
        type: RESET_REDIRECT
    });
};

export const resetPostMessage = () => dispatch => {
    dispatch({
        type: RESET_MESSAGE
    });
};

export const resetPostErrorMessage = () => dispatch => {
    dispatch({
        type: RESET_ERRORMESSAGE
    });
};

export const resetLiked = () => dispatch => {
    dispatch({
        type: RESET_LIKED
    });
};
