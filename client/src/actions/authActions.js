import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, DELETE_USER, LOGIN_ERROR, CHECK_USER } from './types';
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
                })
            }
        });
};

export const registerUser = (user) => dispatch => {
    axios
        .post('users/signup', user)
        .then(res => dispatch({
            type: REGISTER_USER,
            payload: res.data
        }));
        
};

export const logoutUser = () => dispatch => {
    dispatch({
        type: LOGOUT_USER
    })
}

export const deleteUser = (id) => dispatch => {
    axios
        .delete(`users/delete/${id}`)
        .then(res => dispatch({
            type: DELETE_USER,
            payload: id
        }));
}

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
}
