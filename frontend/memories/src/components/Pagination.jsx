import React from "react";
import './pagination.css'
import {Pagination, PaginationItem} from "@mui/material"
import {Link} from "react-router-dom"
import { getPosts } from "../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const Paginate=({page})=>{
    const dispatch=useDispatch()
    const {numberOfPages}=useSelector((state)=>state.posts)
    console.log(numberOfPages)
    useEffect(()=>{
        if (page){
            console.log("pagination hit")
            dispatch(getPosts(page))
            
        }
    }, [dispatch,page])
    return (
        <Pagination
        classes={{ul:"ul"}}
        count={numberOfPages}
        page={Number(page)||1}
        variant="outlined"
        color="primary"
        renderItem={(item)=>(
            <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
        )}
        />
    )
}

export default Paginate