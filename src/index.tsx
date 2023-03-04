import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import CubeNationsClient from './App';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StrictMode>
    {/* <div style={{height: '100vh'}}><CubeNationsClient/></div> */}
    <div style={{height: '100vh'}}><CubeNationsClient playerID="0"/></div>
    <div style={{height: '100vh'}}><CubeNationsClient playerID="1"/></div>
  </StrictMode>
)
