import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {unstable_HistoryRouter as BrowserRouter} from "react-router-dom";

import './style_component/main.css'
import {history} from "./services";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter history={history}>
        <App />
    </BrowserRouter>
);

