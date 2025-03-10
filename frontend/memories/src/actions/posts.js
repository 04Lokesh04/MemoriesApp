import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index"

import { startLoading, endLoading } from "../reducers/posts";
import App from "../App";

export const getPosts= createAsyncThunk('posts/getPosts', async (page, {dispatch})=>{
    try{
        console.log("thunk hit loading")
        dispatch(startLoading())
        const {data:data}=await api.fetchPosts(page)
        console.log("thunk hit end", data)

        dispatch(endLoading())
        return data 
    }catch(err){
        console.log(err)
    }
})

export const getPost= createAsyncThunk('posts/getPost', async (id, {dispatch})=>{
    try{
        dispatch(startLoading())
        console.log("getpost hit", id)
        const {data}=await api.fetchPost(id)
        console.log("thunk hit end", data)
        dispatch(endLoading())
        return data 
    }catch(err){
        console.log(err)
    }
})

export const getPostBySearch=createAsyncThunk('posts/getPostBySearch', async(searchQuery,{dispatch})=>{
    try {
        dispatch(startLoading())
        const {data:{data}}=await api.fetchPostsBySearch(searchQuery)
        dispatch(endLoading())
        return data
    } catch (error) {
        console.log(error)
    }
})

export const createPost=createAsyncThunk('posts/createPosts', async({postdata, navigate}, {dispatch})=>{
    try{
        dispatch(startLoading());
        const {data}=await api.createPost(postdata)
        navigate(`/posts/${data._id}`)
        dispatch(endLoading());
        return data 
    }catch(error){
        console.log(error)
    }
})

export const updatePosts=createAsyncThunk('posts/updatePosts', async({id, post},{dispatch})=>{
    try{
        const {data}= await api.updatePostApi(id, post)
        return data
    }catch (error){
        console.log(error)
    }
})

export const deletePost=createAsyncThunk('posts/deletePost', async(id, {dispatch})=>{
    try{
        await api.deletePost(id)
        return id
    }catch(error){
        console.log(error)
    }
})

export const likePost=createAsyncThunk('posts/likePost', async(id, {dispatch})=>{
    try{
        const {data}= await api.likePost(id)
        return data

    }catch(error){
        console.log(error)
    }
})

export const commentPost=createAsyncThunk('posts/commentPost',async({value, postId}, {dispatch})=>{
    try {

        const {data}=await api.comment(value, postId)
        console.log("comment data:",data.comments)
        return data.comments
    } catch (error) {
        console.log(error)
    }
} )