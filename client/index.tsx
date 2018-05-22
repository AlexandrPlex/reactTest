import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {App} from './App/App';
import {appStore} from './Store/Store';

ReactDOM.render(
  <Provider store={appStore}>
    <App/>
  </Provider>,
  document.getElementById('app')
);
