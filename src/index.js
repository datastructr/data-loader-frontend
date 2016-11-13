import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

import { Provider } from 'react-redux';
import configureStore from './store';

// addins
import 'material-design-lite/dist/material.css';
import 'bootstrap/dist/css/bootstrap.css';

const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);