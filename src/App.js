import React, { Component } from 'react';
import { injectState } from 'freactal';
import appState from './state';
import Cooler from './components/Cooler';

const wrapComponentWithState = appState;

const App = wrapComponentWithState(
  injectState(({ state, effects }) =>
    <div className="App">
      <Cooler />
    </div>
  )
);

export default App;
