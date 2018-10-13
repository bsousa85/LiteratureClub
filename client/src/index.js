import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/AppNavbar';
import createPost from './components/createPost';
import userPage  from './components/userPage';
import editPost from './components/editPost';
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
                    <Route path="/Register" component={Register} />
                    <Route path="/newPost" component={createPost} />
                    <Route path="/userPage" component={userPage} />
                    <Route path="/editPost" component={editPost} />
                </div>
            </BrowserRouter>
        </PersistGate>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
