import { createSlice } from "@reduxjs/toolkit";
import { signin, signup } from "../actions/auth";

const initialState={authData:null}

const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state)=>{
            localStorage.clear()
            state.authData=null
        }
    },

    extraReducers:(builder)=>{
        builder
        .addCase(signin.fulfilled, (state, action)=>{
            localStorage.setItem('profile', JSON.stringify({...action.payload}))
            state.authData=action.payload
        })

        .addCase(signup.fulfilled, (state, action)=>{
            localStorage.setItem('profile', JSON.stringify({...action.payload}))
            state.authData=action.payload
        })
    }
})

export const {logout}=authSlice.actions
export default authSlice.reducer
