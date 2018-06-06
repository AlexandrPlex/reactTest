import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Main} from './App/main';
import {appStore} from './Store/Store';

ReactDOM.render(
  <Provider store={appStore}>
    <Main/>
  </Provider>,
  document.getElementById('app')
);
