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
