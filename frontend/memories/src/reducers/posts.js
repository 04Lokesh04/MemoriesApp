import { createSlice } from "@reduxjs/toolkit";
import { createPost, deletePost, getPost, getPosts, likePost, updatePosts, getPostBySearch, commentPost } from "../actions/posts";

const initialState={
    isLoading:false,
    posts:[],
    post:null,
    currentPage:1,
    numberOfPages:1,
}
const postsSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{
        startLoading:(state)=>{
            state.isLoading=true 
        },
        endLoading:(state)=>{
            state.isLoading=false
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getPosts.fulfilled, (state, action)=>{
            console.log("in reducres",action.payload.data)
            state.posts=action.payload.data;
            state.currentPage=action.payload.currentPage;
            state.numberOfPages=action.payload.numberOfPages;
            
        })
        .addCase(createPost.fulfilled, (state, action)=>{
            state.posts.push(action.payload)
        })

        .addCase(updatePosts.fulfilled, (state, action)=>{
            state.posts=state.posts.map((post)=> post._id===action.payload._id? action.payload:post)
        })

        .addCase(deletePost.fulfilled, (state, action)=>{
            state.posts=state.posts.filter((p)=>p._id!==action.payload)
        })

        .addCase(likePost.fulfilled, (state, action)=>{
            state.posts=state.posts.map((post)=> post._id===action.payload._id? action.payload:post)
        })

        .addCase(getPostBySearch.fulfilled, (state, action)=>{
            state.posts=action.payload
        })
        .addCase(getPost.fulfilled, (state, action)=>{
            state.post=action.payload
        })
        .addCase(commentPost.fulfilled, (state, action)=>{
            state.posts=state.posts.map((post)=>
            post._id===action.payload._id ? action.payload:post)
        })
    },
})
export const {startLoading, endLoading}=postsSlice.actions
export default postsSlice.reducer