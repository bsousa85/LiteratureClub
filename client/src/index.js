import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/AppNavbar';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store, persistor} from './store';
import { PersistGate } from 'redux-persist/integration/react';

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
