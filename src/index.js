import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__;

import App from './components/App';

const store = createStore(reducer, reduxDevtools && reduxDevtools());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
