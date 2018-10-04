import React, { Component } from 'react'
import { Provider } from 'react-redux';
import NavBar from './AppNavbar';
import Register from './Register';
import store from '../store';

export class RegisterPage extends Component {
  

  render() {
    return (
        //<Provider store={store}>
          <div>
            <NavBar />
            <Register />
          </div>
        //</Provider>
    )
  }
}

export default RegisterPage;
