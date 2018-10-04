import React, { Component } from 'react';
import { Provider } from 'react-redux';
import NavBar from './AppNavbar';
import Login from './Login';
import store from '../store';

class LoginPage extends Component {

    render() {
        return(
            <Provider store={store}>
                <div>
                    <NavBar />
                    <Login />
                </div>
            </Provider>
        )
    }
}

export default LoginPage;