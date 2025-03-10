import './form.css'
import React, { useEffect, useState } from "react";
import {TextField, Button, Typography, Paper} from '@mui/material'
import {useDispatch} from 'react-redux'
import { createPost, updatePosts } from '../../actions/posts';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Form =({currentId, setCurrentId})=>{
    const dispatch=useDispatch()
    const [postData, setPostData]=useState({
        title:"", message:"", tags:"", selectedFile:""
    })
    const post=useSelector((state)=>currentId?state.posts.posts.find((p)=>p._id===currentId):null)
    const user=JSON.parse(localStorage.getItem('profile'))
    const navigate=useNavigate()
    useEffect(()=>{
        if (post){
            setPostData(post)
        }
    }, [post])
    const handleSubmit=(e)=>{
        e.preventDefault()
        if (currentId){
            console.log("form ", currentId)
            dispatch(updatePosts({id:currentId, post:{...postData, name:user?.result?.name}}))

        }
        else{
            dispatch(createPost({ postdata: { ...postData, name: user?.result?.name }, navigate }));
        }
        clear()
    }

    const clear=()=>{
        setCurrentId(null)
        setPostData({
            title:"", message:"", tags:"", selectedFile:""
        })
    }

    const handleimage=(event)=>{
        const file=event.target.files[0]
        if (file) {
            const reader= new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend=()=>{
                setPostData({...postData, selectedFile:reader.result})
                console.log(reader.result)
            }
        }
    }

    if (!user?.result?.name){
        return (
            <Paper className='paper'>
                <Typography variant='h6' align='center'>
                    Please Sign In to create your own memories and like other's memories
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className="paper" elevation={6} >
            <form autoComplete="off" noValidate className="form" onSubmit={handleSubmit}>
                <Typography  variant="h6">{currentId?'Editing':'Creating'} a Memory</Typography>
                <TextField margin="dense" name="title" variant="outlined" label="title" fullWidth
                value={postData.title}
                onChange={(e)=>setPostData({...postData,title:e.target.value})} />
                <TextField margin="dense" name="message" variant="outlined" label="message" fullWidth
                value={postData.message}
                onChange={(e)=>setPostData({...postData,message:e.target.value})} />
                <TextField margin="dense" name="tags" variant="outlined" label="tags" fullWidth
                value={postData.tags}
                onChange={(e)=>setPostData({...postData,tags:e.target.value.split(",")})} />
                
                <div  className="fileInput">
                    <input type="file"
                    accept='image/*'
                     onChange={handleimage}
                    />
                </div>

                <Button className='buttonSubmit' variant='contained' color='primary' size='small' type='submit' fullWidth sx={{ marginBottom: '10px' }}>Submit</Button>
                <Button className='buttonclear' variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
                
            </form>
        </Paper>
    )
}

export default Form