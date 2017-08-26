import React, { Component } from 'react';
import { injectState } from 'freactal';
import appState from './state';
import { Layer, Rect, Stage, Line, Group, Arrow, Text, Circle } from 'react-konva';
import Cooler from './components/Cooler';
import logo from './logo.svg';
import './App.css';

const wrapComponentWithState = appState;

const App = wrapComponentWithState(({ state, effects }) =>
  <div className="App">
    <Cooler />
  </div>
);

export default App;
