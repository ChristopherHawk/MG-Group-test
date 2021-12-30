import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import DataProvider from './context/UserData/userState';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
   <DataProvider>
    <App />
    </DataProvider>
    </BrowserRouter>,
  document.getElementById('root')
);
