import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux'//importing a component so its react-redux
//think of the Provider as a parent, it provides for you, provides the app with all the info it needs 
import {createStore} from 'redux';
import rootReducer from './reducers'

import App from './components/app';

const store = createStore(rootReducer);
//redux store is your state.. a little more complicated than just an object
//as a whole it's where your data is at

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
