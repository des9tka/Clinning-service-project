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
    async ({query, searcher}, {rejectWithValue}) => {
        try {
            const data = await order_service.employee_orders(query.get('page'), searcher)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const setAllowEmployeesOrders = createAsyncThunk(
    'orderSlice/setAllowEmployeesOrders',
    async ({page}, {rejectWithValue}) => {
        const data = await order_service.getAll(page, 3)
        return data
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
    extraReducers: builder =>
        builder
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

            .addCase(setAllowEmployeesOrders.pending, (state, action) => {
                state.loading = true
            })
            .addCase(setAllowEmployeesOrders.fulfilled, (state, action) => {
                state.nextPage = action.payload.data.next_page
                state.prevPage = action.payload.data.prev_page
                state.orders = action.payload.data.data
                state.loading = false
            })
            .addCase(setAllowEmployeesOrders.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
})

const {reducer: orderReducer, actions: {setOrders, setOrder, setNextPage, setPrevPage}} = orderSlice;

const orderActions = {
    setOrders,
    setOrder,
    setPrevPage,
    setNextPage,
    setOrderById,
    setEmployeeOrders,
    setAllowEmployeesOrders
}

export {
    orderActions,
    orderReducer
}

