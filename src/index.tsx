import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CubeNationsClient from './App';

ReactDOM.render(
  <StrictMode>
    {/* <div style={{height: '100vh'}}><CubeNationsClient/></div> */}
    <div style={{height: '100vh'}}><CubeNationsClient playerID="0"/></div>
    <div style={{height: '100vh'}}><CubeNationsClient playerID="1"/></div>
  </StrictMode>,
  document.getElementById('root')
)
