import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {order_service, user_service} from "../../services";

const initialState = {
    users: [],
    user: null,
    self: null,
    error: null,
    nextPage: null,
    prevPage: null,
    loading: false,
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

const setUserByOrderId = createAsyncThunk(
    'userSlice/setUserByOrderId',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await user_service.getUserByOrderId(id)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

const setBestEmployee = createAsyncThunk(
    'userSlice/setBestEmployee',
    async (_, {rejectWithValue}) => {
        try {
            const data = await user_service.bestEmployees()
            return data
        } catch (e) {
            console.log(e)
            return rejectWithValue(e.response.data)
        }
    }
)

const setOrderEmployeesByOrderId = createAsyncThunk(
    'userSlice/setOrderEmployeesByOrderId',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await order_service.getOrderEmployeesById(id)
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
        },
        setSelf: (state, action) => {
            state.self = action.payload
        },
        removeUser: (state, action) => {
            state.users = state.users.splice(state.users.findIndex(user => user.id === action.payload), 1)
        },
        setLoading: (state, action) => {
            state.loading = action.payload
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


            .addCase(setOrderEmployeesByOrderId.pending, (state, action) => {
                state.loading = true
            })
            .addCase(setOrderEmployeesByOrderId.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.users = action.payload
            })
            .addCase(setOrderEmployeesByOrderId.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(setUserByOrderId.pending, (state, action) => {
                state.loading = true
            })
            .addCase(setUserByOrderId.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.user = action.payload
            })
            .addCase(setUserByOrderId.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


            .addCase(setSelfUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(setSelfUser.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.self = action.payload.data
            })
            .addCase(setSelfUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(setBestEmployee.pending, (state, action) => {
                state.loading = true
            })
            .addCase(setBestEmployee.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.users = action.payload.data
            })
            .addCase(setBestEmployee.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
})

const {reducer: userReducer, actions: {setUsers, setUser, setNextPage, setPrevPage, setError, setSelf, removeUser, setLoading}} = userSlice;

const userActions = {
    setUsers,
    setUser,
    setNextPage,
    setPrevPage,
    setError,
    setSelf,
    removeUser,
    setLoading,
    setUserById,
    setAllUsers,
    setSelfUser,
    setOrderEmployeesByOrderId,
    setBestEmployee,
    setUserByOrderId
}

export {
    userActions,
    userReducer
}