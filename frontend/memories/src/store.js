import {configureStore} from '@reduxjs/toolkit'
import postReducers from "./reducers/posts"
import authReducer from "./reducers/auth"
const store=configureStore({
    reducer:{
        posts:postReducers,
        auth:authReducer,
    }
})

export default store