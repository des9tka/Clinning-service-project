import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    services: [],
    service: null,
    error: null,
    nextPage: null,
    prevPage: null
}

const serviceSlice = createSlice({
    name: 'serviceSlice',
    initialState,
    reducers: {
        setServices: (state, action) => {
            state.services = action.payload
        },
        setService: (state, action) => {
            state.service = action.payload
        },
        setNextPage: (state, action) => {
            state.nextPage = action.payload
        },
        setPrevPage: (state, action) => {
            state.prevPage = action.payload
        }
    }
})

const {reducer: serviceReducer, actions: {setServices, setService, setNextPage, setPrevPage}} = serviceSlice;

const serviceActions = {
    setServices,
    setService,
    setNextPage,
    setPrevPage
}

export {
    serviceActions,
    serviceReducer
}
