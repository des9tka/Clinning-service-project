import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {c_service_service} from "../../services";

const initialState = {
    services: [],
    service: null,
    error: null,
    nextPage: null,
    prevPage: null,
    loading: false
}

const setAllServices = createAsyncThunk(
    'serviceSlice/setServices',
    async ({query}, rejectWithValue) => {
        try {
            const data = c_service_service.getAll(query.get('page'))
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const setServiceById = createAsyncThunk(
    'serviceSlice/setServiceById',
    async ({id}, rejectWithValue) => {
        try {
            const data = c_service_service.getById(id)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

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
    },
    extraReducers: builder =>
        builder
            .addCase(setAllServices.pending, (state, action) => {
                state.loading = true
            })
            .addCase(setAllServices.fulfilled, (state, action) => {
                state.services = action.payload.data.data
                state.loading = false
                state.error = null
                state.prevPage = action.payload.data.prev_page
                state.nextPage = action.payload.data.next_page
            })
            .addCase(setAllServices.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

            .addCase(setServiceById.pending, (state, action) => {
                state.loading = true
            })
            .addCase(setServiceById.fulfilled, (state, action) => {
                state.service = action.payload.data
                state.loading = false
                state.error = null
            })
            .addCase(setServiceById.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
})

const {reducer: serviceReducer, actions: {setServices, setService, setNextPage, setPrevPage}} = serviceSlice;

const serviceActions = {
    setServices,
    setService,
    setNextPage,
    setPrevPage,
    setAllServices,
    setServiceById
}


export {
    serviceActions,
    serviceReducer
}
