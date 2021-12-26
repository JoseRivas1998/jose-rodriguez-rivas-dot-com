import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {BrowserRouter} from "react-router-dom";

import App from './containers/App/App';
import './styles/main.scss';

axios.defaults.baseURL = process.env.REACT_APP_API_ROOT;


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
