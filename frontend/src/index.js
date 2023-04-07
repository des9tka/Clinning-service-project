import React from 'react';
import ReactDOM from 'react-dom/client';
import {unstable_HistoryRouter as BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {history} from "./services";
import {setupStore} from "./redux";


import App from './App';
import './style_component/main.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = setupStore();

root.render(
    <BrowserRouter history={history}>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);
