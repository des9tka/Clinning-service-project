import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {order_service} from "../../services";

const initialState = {
    orders: [],
    order: null,
    error: null,
    nextPage: null,
    prevPage: null,
}

const setOrderById = createAsyncThunk(
    'orderSlice/setUser',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await order_service.getById(id)
            console.log(data);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const orderSlice = createSlice({
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
    },
    // extraReducers: builder =>
    //     builder
    //         .addCase(setOrderById.pending, (state, action) => {
    //             state.loading = true
    //             console.log('pending')
    //         })
    //         .addCase(setOrderById.fulfilled, (state, action) => {
    //             state.order = action.payload
    //             state.loading = false
    //             console.log('fulfilled')
    //
    //         })
    //         .addCase(setOrderById.rejected, (state, action) => {
    //             state.error = action.payload
    //             state.loading = false
    //             console.log('rejected')
    //
    //         })


})

const {reducer: orderReducer, actions: {setOrders, setOrder, setNextPage, setPrevPage}} = orderSlice;

const orderActions = {
    setOrders,
    setOrder,
    setPrevPage,
    setNextPage,
    setOrderById
}

export {
    orderActions,
    orderReducer
}

