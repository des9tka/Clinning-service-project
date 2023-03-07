import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {orderReducer} from "./slices";


const rootReducer = combineReducers({
    orderReducer
});


const setupStore = () => configureStore({
    reducer: rootReducer
});

export {
    setupStore
}
