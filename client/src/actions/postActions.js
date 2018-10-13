import axios from 'axios';
import { GET_POSTS, ADD_POST, DELETE_POST, POSTS_LOADING, GET_USER_POSTS, UPDATE_POST } from './types';

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
            payload: res.data
        }));
};

export const addPost = (post) => dispatch => {
    axios
        .post('/posts/newPost', post)
        .then(res => dispatch({
            type: ADD_POST,
            payload: res.data
        }));
};

export const updatePost = (id, post) => dispatch => {
    axios
        .put(`/posts/${id}`, post)
        .then(res => dispatch({
            type: UPDATE_POST,
            payload: res.data
        }));
}

export const setPostsLoading = () => {
    return {
        type: POSTS_LOADING
    };
};
