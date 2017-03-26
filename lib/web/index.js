import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';
import './style.css';

let state = window.__INITIAL_STATE; 
ReactDOM.render(<App {...state.data} />, document.getElementById('root'));

