import React, { useEffect }  from "react";
import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {formatDistanceToNow} from 'date-fns'
import './postdetails.css'
import {getPost, getPostBySearch} from '../../actions/posts'
import {Link} from "react-router-dom"
import CommentSection from "./CommentSection";
const PostDetails=()=>{
    const {post, posts, isLoading}=useSelector((state)=>state.posts)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {id}=useParams()

    useEffect(()=>{
        console.log(id)
        dispatch(getPost(id))
    },[id])

    useEffect(()=>{
        if (post){
            dispatch(getPostBySearch({search:"none", tags:post?.tags.join(',')}))
        }
    }, [post])

    if (!post) return null;

    if (isLoading){
        return <Paper className="loadingPaper" elevation={6}>
                <CircularProgress size="7em"/>
        </Paper>
    }

    const recomnendedPosts=posts.filter((p)=>post._id !==p._id)

    const openPost=(_id)=>navigate(`/posts/${_id}`)

    return (
        <Paper className="paper-container" elevation={6}>
        <div className="card">
            <div className="detailssection">
                <Typography variant="h3" component="h2">{post.title}</Typography>
                <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
                    {post.tags.map((tag) => (
                    <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }} key={tag}>
                        {` #${tag} `}
                    </Link>
                    ))}
                </Typography>
                <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                <Typography variant="h6">
                    Created by:
                    <Link to={`/creators/${post.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                    {` ${post.name}`}
                    </Link>
                </Typography>
                <Typography variant="body1">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </Typography>
                <Divider className="divider" />
                <Divider className="divider" />
                <CommentSection post={post}/>
                <Divider className="divider" />
            </div>
            <div className="imageSection">
                <img className="media" src={post.selectedFile} alt={post.title} />
            </div>
        </div>
            {recomnendedPosts.length >0 && (
                <div className="section">
                    <Typography gutterBottom variant="h5" sx={{marginLeft:"20px"}}>You might also like</Typography>
                    <Divider />
                    <div className="recommendedPosts">
                        {recomnendedPosts.map(({title, message, name, likes, selectedFile, _id})=>(
                            <div  style={{margin:'20px', cursor:"pointer"}} onClick={()=>openPost(_id) } key={_id}>
                                <Typography gutterBottom variant="h6">{title}</Typography>
                                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                <Typography gutterBottom variant="subtitle1">Likes: {likes}</Typography>
                                <img src={selectedFile} width="200px" />
                            </div>
                        )
              
                        )}
                    </div>
                </div>
            )}
        </Paper>

    )

}

export default PostDetails