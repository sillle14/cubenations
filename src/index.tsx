import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CubeNationsClient from './App';

ReactDOM.render(
  <React.StrictMode>
    <CubeNationsClient playerID="0"/>
    <CubeNationsClient playerID="1"/>
  </React.StrictMode>,
  document.getElementById('root')
)
