/*
This file defines the main Redux Store. It will be required by all "smart" components in the app,
in our case Home and Hero.
*/

var Redux = require('redux'),
  coolerReducer = require('./reducers/cooler'),
  initialState = require('./initialState');

var rootReducer = Redux.combineReducers({
  cooler: coolerReducer,
});

module.exports = Redux.createStore(rootReducer, initialState());
