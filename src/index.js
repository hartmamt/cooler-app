import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Cooler from './components/Cooler';
import store from './state/store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Cooler />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
