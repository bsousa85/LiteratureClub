import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/AppNavbar';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, indexRoute } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store, persistor} from './store';
import { connect } from 'react-redux';
import { checkUserStatus } from './actions/authActions';
import { PersistGate } from 'redux-persist/integration/react';

// export class Index extends Component {

//     constructor(props) {
//         super(props);
//     }

//     componentDidMount() {
//         const token = localStorage.getItem(this.props.user);
//         this.props.checkUserStatus(token);
//     }

//     render() {
//         return null;
//     }


// }

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <div>
                    <NavBar />
                    <Route path="/" exact component={Home} />
                    <Route path="/Login" component={Login} />
                    <Route path="/Register"  component={Register} />
                </div>
            </BrowserRouter>
        </PersistGate>
    </Provider>, document.getElementById('root'));
registerServiceWorker();

// Index.PropTypes = {
//     checkUserStatus: PropTypes.func.isRequired
// }

// const mapStateToProps = state => ({
//     user: state.auth.username
// })

// export default connect(mapStateToProps, {checkUserStatus})(Index);