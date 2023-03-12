import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {unstable_HistoryRouter as BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

import './style_component/main.css'
import {history} from "./services";
import {setupStore} from "./redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = setupStore();
root.render(
    <BrowserRouter history={history}>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);

