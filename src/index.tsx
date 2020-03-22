import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from './router';
import store from './store';
import './index.less';

ReactDOM.render((
  <Provider store={store}>
    <Suspense fallback={<div>loading...</div>}>
      <Router />
    </Suspense>
  </Provider>
), document.getElementById('root'));

// @ts-ignore
// const electron = window.require('electron');

// electron.ipcRenderer.send('test-console', 66);
