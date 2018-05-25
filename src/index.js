import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

/**
* Development guide from:
* https://github.com/udacity/reactnd-contacts-complete
*/
ReactDOM.render(
  // Maintain routing between app links
  <BrowserRouter><App /></BrowserRouter>,
  document.getElementById('root')
);
