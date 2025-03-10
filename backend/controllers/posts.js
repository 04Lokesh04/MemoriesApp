import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"

export const getPosts=async (req, res)=>{
    const {page}=req.query 

    try{
        const LIMIT=8
        const startIndex=(Number(page)-1)* LIMIT
        const total= await PostMessage.countDocuments({})
        const posts= await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex)

        res.status(200).json(
            {data:posts, currentPage:Number(page), numberOfPages:Math.ceil(total/LIMIT)}
        )
        

    }catch(err){
        res.status(404).json({error:err.message})
    }
}

export const getPost=async(req, res)=>{
    const {id}=req.params

    try {

        const post=await PostMessage.findById(id)
        console.log(post)
        res.status(200).json(post)        
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const getPostsBySearch=async(req, res)=>{
    const {searchQuery, tags}=req.query
    try {

        const title=new RegExp(searchQuery, 'i')
        
        const posts= await PostMessage.find({$or:[{title}, {tags:{$in:tags.split(',')}}]})
        res.status(200).json({data:posts})
        
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const createPost= async(req, res)=>{
    const post= req.body
    try{
        console.log("hitted backend create")
        const newPost=new PostMessage({...post, creator:req.userId, createdAt: new Date().toISOString() })

        await newPost.save()
        console.log("post saved")
        console.log(newPost)
        res.status(200).json(newPost)

    }catch(err){
        res.status(409).json({error:err.message})
         
    }
}

export const updatePost=async(req,res)=>{
    const {id:_id}=req.params
    const post=req.body 

    try{
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post available with this id")
        console.log("update hit")
        const updatedPost=await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new:true})
        if (!updatePost){
            return res.status(404).json({ message: "No post available with this ID" });
        }
        console.log(updatePost)
        res.status(200).json(updatedPost)
    }catch(error){
        res.status(404).json(error)
    }
}

export const deletePost=async(req, res)=>{
    const {id}=req.params 
    console.log(typeof(id))

   try{ 
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("No post available with this id")
        }
        await PostMessage.findByIdAndDelete(id)
        res.status(200).json({message:"post deleted successfully"})

    }catch(error){
        res.status(404).json({error:error.message})
    }
}

export const likePost=async(req, res)=>{
    const{id}=req.params
    if (!req.userId) return res.json({"message":"unauthenticated"})
    try{ 
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("No post available with this id")
        }
        const post=await PostMessage.findById(id)
        const index= post.likes.findIndex((id)=>id===String(req.userId))

        if (index === -1){
            post.likes.push(req.userId)
        }else{
            post.likes=post.likes.filter((id)=>id !== String(req.userId))
        }
        
        const likedPost= await PostMessage.findByIdAndUpdate(id, post, {new:true})
        res.status(200).json(likedPost)

    }catch(error){
        res.status(404).json({error:error.message})
    }
}

export const commentPost=async (req, res)=>{
    const {id}=req.params
    const {value}=req.body 

    try{
        const post= await PostMessage.findById(id)
        post.comments.push(value)
        const updatedPost=await PostMessage.findByIdAndUpdate(id, post, {new:true})
        res.status(200).json(updatedPost)
    }catch(error){
        res.status(404).json({message:error.message})
    }
}