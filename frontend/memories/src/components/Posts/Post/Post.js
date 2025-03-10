import "./post.css"
import React, { useState } from "react";
import {Card, CardActions, CardContent, ButtonBase, CardMedia, Button, Typography} from "@mui/material"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {formatDistanceToNow} from "date-fns"
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";
const Post =({post, setCurrentId})=>{
    const dispatch=useDispatch()
    const user= JSON.parse(localStorage.getItem('profile'))
    const userId = user?.result?._id;
    const [likes, setLikes] = useState(post?.likes);
    const hasLikedPost = post.likes.find((like) => like === userId);
    const navigate=useNavigate()

    const handleLike= async ()=>{
        await dispatch(likePost(post._id))
        if (hasLikedPost){
            setLikes(likes.filter((id)=>id !== userId))
        }
        else{
            setLikes([...likes,userId])
        }
    }

    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === userId)
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;Like</>;
      };

    const openPost=()=>{
        navigate(`/posts/${post._id}`)
    }
    
    return (
        <Card className="postcard" raised elevation={6} sx={{display:"flex", flexDirection:"column", borderRadius: "15px"}}>
            <div className="cardActions" onClick={openPost}>
                <CardMedia className="postmedia" image={post.selectedFile} title={post.title} />
                <div className="overlay">
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{formatDistanceToNow(new Date(post.createdAt))}</Typography>
                </div>
                {(user?.result?._id===post.creator) && (
                <div className="overlay2">
                    <Button style={{color:"white"}} size="small" onClick={(e)=>{
                        e.stopPropagation() 
                        setCurrentId(post._id)}}>
                        <MoreHorizIcon fontSize="default"/>
                    </Button>
                </div>)}
                <div className="details">
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=>`#${tag} `)}</Typography>
                </div>
                <Typography className="title"  variant="h5" gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
            </div>
            <CardActions className="cardButtonActions">
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes/>
                </Button>
                {(user?.result?._id===post.creator) && (
                    <Button size="small" color="warning" onClick={()=>dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small"/> Delete
                </Button>
                )}
            </CardActions>
 
        </Card>
    )
}

export default Post