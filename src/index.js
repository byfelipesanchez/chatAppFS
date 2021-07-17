import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import createRoutes from './Routing';
import { BrowserRouter as Router, Switch, Route, useHistory, withRouter, Link } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

// const routes = createRoutes();

ReactDOM.render(
  <React.StrictMode>,

    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();

