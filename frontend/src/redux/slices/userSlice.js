import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {user_service} from "../../services";
import {createRef} from "react";

const initialState = {
    users: [],
    user: null,
    error: null,
    nextPage: null,
    prevPage: null,
    loading: false
}

const setUserById = createAsyncThunk(
    'userSlice/setUserById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await user_service.getById(id)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const setAllUsers = createAsyncThunk(
    'userSlice/setAllUsers',
    async ({query}, rejectWithValue) => {
        try {
            const data = await user_service.getAll(query.get('page'))
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setNextPage: (state, action) => {
            state.nextPage = action.payload
        },
        setPrevPage: (state, action) => {
            state.prevPage = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(setUserById.pending, (state, action) => {
                state.loading = true
            })
            .addCase(setUserById.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.user = action.payload
            })
            .addCase(setUserById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(setAllUsers.pending, (state, action) => {
                state.loading = true
            })
            .addCase(setAllUsers.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.users = action.payload.data.data
                state.nextPage = action.payload.data.next_page
                state.prevPage = action.payload.data.prev_page
            })
            .addCase(setAllUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
})

const {reducer: userReducer, actions: {setUsers, setUser, setNextPage, setPrevPage, setError}} = userSlice;

const userActions = {
    setUsers,
    setUser,
    setNextPage,
    setPrevPage,
    setError,
    setUserById,
    setAllUsers
}

export {
    userActions,
    userReducer
}