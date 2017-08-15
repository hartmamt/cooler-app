import React, { Component } from 'react';
import { injectState } from 'freactal';
import appState from './state';
import { Stage } from 'react-konva';
import Cooler from './components/Cooler';
import logo from './logo.svg';
import './App.css';

const wrapComponentWithState = appState;

const App = wrapComponentWithState(
  injectState(({ state, effects }) =>
    <div className="App">
      <Stage width={1000} height={1000}>
        <Cooler state={state} />
      </Stage>
    </div>
  )
);

export default App;
