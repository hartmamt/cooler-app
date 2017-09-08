/*
This file defines the main Redux Store. It will be required by all "smart" components in the app,
in our case Home and Hero.
*/

var Redux = require('redux'),
  coolerReducer = require('./reducers/cooler'),
  initialState = require('./initialState');

var appReducer = Redux.combineReducers({
  cooler: coolerReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_DIAGRAM') {
    state = undefined;
  }

  return appReducer(state, action);
};

module.exports = Redux.createStore(
  rootReducer,
  initialState(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
