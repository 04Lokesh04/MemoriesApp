import './posts.css'
import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import {Grid, CircularProgress} from "@mui/material"
const Posts =({setCurrentId})=>{

    const {posts, isLoading}=useSelector((state)=>state.posts)
    console.log(posts)
    
    console.log("Redux State in Posts Component:", posts);

    if (isLoading) return <CircularProgress />;
    if (!posts || posts.length === 0) return <p>No posts found.</p>;
    return (
        !posts.length ? <CircularProgress />:(
            <Grid className="mainContanier" container alignItems={"stretch"} spacing={3}>
                {posts.map((post)=>(
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts