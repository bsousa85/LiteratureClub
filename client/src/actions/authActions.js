import { LOGIN_USER, REGISTER_USER, REGISTER_ERROR, LOGOUT_USER, DELETE_USER, LOGIN_ERROR, CHECK_USER, UPDATE_USER, RESET_REDIRECT,
RESET_MESSAGE, RESET_ERRORMESSAGE, UPDATE_USER_ERROR } from './types';
import axios from 'axios';

export const loginUser = (user) => dispatch => {
    axios
        .post('users/login', user)
        .then(res => {
            if(res.data.token) {
                dispatch({
                    type: LOGIN_USER,
                    payload: res.data
                });
            }
            else {
                dispatch({
                    type: LOGIN_ERROR,
                    payload: res.data
                });
            }
        });
};

export const registerUser = (user) => dispatch => {
    axios
        .post('users/signup', user)
        .then(res => {
            if(res.data.success) {
                dispatch({
                    type: REGISTER_USER,
                    payload: res.data
                });
            }
            else {
                dispatch({
                    type: REGISTER_ERROR,
                    payload: res.data
                });
            } 
        });
};

export const logoutUser = () => dispatch => {
    dispatch({
        type: LOGOUT_USER
    })
};

export const resetRedirect = () => dispatch => {
    dispatch({
        type: RESET_REDIRECT
    });
};

export const resetMessage = () => dispatch => {
    dispatch({
        type: RESET_MESSAGE
    });
};

export const resetErrorMessage = () => dispatch => {
    dispatch({
        type: RESET_ERRORMESSAGE
    });
};

export const deleteUser = (id) => dispatch => {
    axios
        .delete(`users/delete/${id}`)
        .then(res => dispatch({
            type: DELETE_USER,
            payload: res.data
        }));
};

export const updateUser = (id, user) => dispatch => {
    axios
        .put(`/users/${id}`, user)
        .then(res => {
            if(res.data.success) {
                dispatch({
                    type: UPDATE_USER,
                    payload: res.data
                });
            }
            else {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: res.data
                });
            }
        });
};

export const checkUserStatus = (token) => dispatch => {
    axios
        .post(`users/checkAuth/${token}`, token)
        .then(res => {
            if(res.data.token) {
                dispatch({
                    type: CHECK_USER,
                    payload: res.data
                });
            }
            else {
                dispatch({
                    type: LOGIN_ERROR,
                    payload: res.data
                })
            }
        });
};
