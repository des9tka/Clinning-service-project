import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    users: [],
    user: null,
    error: null,
    nextPage: null,
    prevPage: null
}

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
    }
})

const {reducer: userReducer, actions: {setUsers, setUser, setNextPage, setPrevPage, setError}} = userSlice;

const userActions = {
    setUsers,
    setUser,
    setNextPage,
    setPrevPage,
    setError
}

export {
    userActions,
    userReducer
}