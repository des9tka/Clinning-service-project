import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {user_service} from "../../services";

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
    async ({query, searcher}, rejectWithValue) => {
        try {
            const data = await user_service.getAll(query.get('page'), searcher)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const setSelfUser = createAsyncThunk(
    'userSlice/setSelfUser',
    async (_, {rejectWithValue}) => {
        try {
            const data = await user_service.getSelf()
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

            .addCase(setSelfUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(setSelfUser.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.user = action.payload.data
            })
            .addCase(setSelfUser.rejected, (state, action) => {
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
    setAllUsers,
    setSelfUser
}

export {
    userActions,
    userReducer
}