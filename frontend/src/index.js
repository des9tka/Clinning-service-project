import React from 'react';
import ReactDOM from 'react-dom/client';
import {unstable_HistoryRouter as BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {history} from "./services";
import {setupStore} from "./redux";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

import App from './App';
import './style_component/main.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = setupStore();
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY)
console.log(process.env.MYSQL_HOST)

root.render(
    <BrowserRouter history={history}>
        <Provider store={store}>
            <Elements stripe={stripePromise}>
                <App/>
            </Elements>
        </Provider>
    </BrowserRouter>
);

