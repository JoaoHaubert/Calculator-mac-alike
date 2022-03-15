import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calculator from './main/Calculator'

ReactDOM.render(
  <React.StrictMode>

    <div>
      
      <h2>Calculator</h2>
      <Calculator/>

    </div>

  </React.StrictMode>,
  document.getElementById('root')
);

