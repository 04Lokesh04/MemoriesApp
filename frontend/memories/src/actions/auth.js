import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index"

export const signin=createAsyncThunk('auth/signin', async({formData, navigate},{dispatch})=>{
    try{
        const {data}=await api.signin(formData)
        navigate("/")
        return data
    }catch(error){
        console.log(error)
    }
})

export const signup=createAsyncThunk('auth/signup', async({formData, navigate},{dispatch})=>{
    try{
        
        const {data}=await api.signup(formData)
        navigate("/")
        return data
    }catch(error){
        console.log(error)
    }
})