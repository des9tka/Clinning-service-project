import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    order: null,
    error: null,
    nextPage: null,
    prevPage: null
}

const orderSlice =  createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload
        },
        setOrder: (state, action) => {
            state.order = action.payload
        },
        setNextPage: (state, action) => {
            state.nextPage = action.payload
        },
        setPrevPage: (state, action) => {
            state.prevPage = action.payload
        }
    }
})

const {reducer: orderReducer, actions: {setOrders, setOrder, setNextPage, setPrevPage}} = orderSlice;

const orderActions = {
    setOrders,
    setOrder,
    setPrevPage,
    setNextPage
}

export {
    orderActions,
    orderReducer
}

