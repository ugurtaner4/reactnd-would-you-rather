import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { applyMiddleware, compose, createStore } from 'redux';

import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
