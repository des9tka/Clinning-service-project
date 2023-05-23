import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {order_service} from "../../services";

const initialState = {
    orders: [],
    order: null,
    error: null,
    loading: false,
    nextPage: null,
    prevPage: null,
}

const setAllOrders = createAsyncThunk(
    'orderSlice/setAllOrders',
    async ({page, status, search}, {rejectWithValue}) => {
        try {
            const data = order_service.getAll(page, status, search)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const setOrderById = createAsyncThunk(
    'orderSlice/setOrderById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await order_service.getById(id)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const setEmployeeOrders = createAsyncThunk(
    'orderSlice/setEmployeeOrders',
    async ({query}, {rejectWithValue}) => {
        try {
            const data = await order_service.employee_orders(query.get('page'))
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
        },
        removeOrder: (state, action) => {
            state.orders = state.orders.filter(order => order.id !== action.payload)
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(setAllOrders.pending, (state, action) => {
                state.loading = true
            })
            .addCase(setAllOrders.fulfilled, (state, action) => {
                state.nextPage = action.payload.data.next_page
                state.prevPage = action.payload.data.prev_page
                state.orders = action.payload.data.data
                state.loading = false
            })
            .addCase(setAllOrders.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            .addCase(setOrderById.pending, (state, action) => {
                state.loading = true
            })
            .addCase(setOrderById.fulfilled, (state, action) => {
                state.order = action.payload
                state.loading = false
            })
            .addCase(setOrderById.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            .addCase(setEmployeeOrders.pending, (state, action) => {
                state.loading = true
            })
            .addCase(setEmployeeOrders.fulfilled, (state, action) => {
                state.orders = action.payload.data.data
                state.nextPage = action.payload.data.next_page
                state.prevPage = action.payload.data.prev_page
                state.loading = false
            })
            .addCase(setEmployeeOrders.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
})

const {reducer: orderReducer, actions: {setOrders, setOrder, setNextPage, setPrevPage, removeOrder, setLoading}} = orderSlice;

const orderActions = {
    setOrders,
    setOrder,
    setPrevPage,
    setNextPage,
    removeOrder,
    setLoading,
    setAllOrders,
    setOrderById,
    setEmployeeOrders,
}

export {
    orderActions,
    orderReducer
}

