import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {BrowserRouter} from "react-router-dom";

import App from './containers/App/App';
import './styles/main.scss';
import {createRoot} from "react-dom/client";

axios.defaults.baseURL = import.meta.env.VITE_API_ROOT;


createRoot(document.getElementById('root')!).render(<React.StrictMode>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
</React.StrictMode>)
