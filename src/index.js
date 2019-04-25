import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux'//importing a component so its react-redux
//think of the Provider as a parent, it provides for you, provides the app with all the info it needs 
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers'
import think from './components/middleware/think';
import App from './components/app';
import types from './actions/types';
import {checkAuth} from './actions'


const store = createStore(rootReducer, applyMiddleware(think));
//redux store is your state.. a little more complicated than just an object
//as a whole it's where your data is at
if (localStorage.getItem('signedIn')==='true'){
    store.dispatch({
        type: types.SIGN_IN,
        email:'loading'
    })
    checkAuth()(store.dispatch);
}



ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
