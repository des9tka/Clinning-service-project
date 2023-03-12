import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {orderReducer, serviceReducer, userReducer} from "./slices";


const rootReducer = combineReducers({
    orderReducer,
    serviceReducer,
    userReducer
});


const setupStore = () => configureStore({
    reducer: rootReducer
});

export {
    setupStore
}
