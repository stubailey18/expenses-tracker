import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// this is the app's entry point
// this scrips is used by the bundler to determine what to bundle
// it is this script that renders to the DOM
// you're unlikely to render directly to the DOM anywhere else

// <App /> is a custom HTML element (a component)
// the creation of custom elements is NOT a React thing, it's a JS thing

// <React.StrictMode> enables various checks in development mode
// e.g. it will result in some functions being executed twice
// it has NO effect in production mode

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
