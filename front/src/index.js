import React from 'react';
import ReactDOM from 'react-dom/client';

import 'services/fontAwesomeLibrary';

import 'assets/styles/app.scss';

import App from './App';
import Providers from './Providers';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Providers>
    <App />
  </Providers>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
