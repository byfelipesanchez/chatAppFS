import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Switch, Route, useHistory, withRouter, Link } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

// const Todos = () => {
//   return (
//     <div>
//       <h3>
//         todo
//       </h3>
//     </div>
//   );
//}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// export default Todos;
