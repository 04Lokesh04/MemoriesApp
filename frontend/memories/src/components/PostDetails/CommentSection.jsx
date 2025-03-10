import React, { useRef, useState } from "react";
import { Typography , TextField, Button} from "@mui/material"; 
import { useDispatch } from "react-redux";
import {commentPost} from "../../actions/posts"
import './postdetails.css'
const CommentSection=({post})=>{
    const user=JSON.parse(localStorage.getItem('profile'))
    const [comments, setComments]=useState(post?.comments||[])
    const [comment, setComment]=useState("")
    const dispatch=useDispatch()
    const commentsRef=useRef()

    const handleClick = async()=>{
        const finalComment=`${user.result.name}:${comment}`
        const newComments=await dispatch(commentPost({value:finalComment,postId:post._id}))
        console.log(newComments.payload)
        setComments(newComments.payload || [])
        setComment("")

        commentsRef.current.scrollIntoView({behavior:"smooth"})
    }

    return (
        <div>
            <div className="commentsOuterContainer">
                <div className="commentsInnerContainer">
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((c,i)=>(
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong >{c.split(": ")[0]}</strong>
                            {c.split(":")[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef}/>
                </div>
                {user?.result?.name &&(
                     <div style={{width:"70%"}}>
                     <Typography gutterBottom variant="h6">Write a comment</Typography>
                     <TextField fullWidth rows={4} variant="outlined" label="comment"
                     multiline
                     value={comment}
                     onChange={(e)=>setComment(e.target.value)}/>
                     <Button style={{marginTop:"10px"}} fullWidth disabled={!comment} color="primary" variant="contained" onClick={handleClick}>Comment</Button>
                 </div>
                )}
               
            </div>
        </div>
    )
}

export default CommentSection