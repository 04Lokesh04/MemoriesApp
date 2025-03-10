import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const signin=async(req, res)=>{
    const {email, password}=req.body

    try{
        
        const existingUser= await User.findOne({email})
        
        if (!existingUser) return res.status(404).json({message:"User doesn't exist"})
        
        const ispasswordCorrect= await bcrypt.compare(password, existingUser.password)
        
        if (!ispasswordCorrect) return res.status(404).json({message:"User doesn't exist"})
        
        const token= jwt.sign({email:existingUser.email, id:existingUser._id}, process.env.MY_SECRET, {expiresIn:'1d'})
        
        res.status(200).json({result:existingUser, token})

    }catch(error){
        
        res.status(500).json({message:"Something went wrong"})
    }

}

export const signup=async(req, res)=>{
    const {email, password, firstName, lastName, confirmPassword }=req.body
    
    try {

        const existingUser= await User.findOne({email})

        if (existingUser) return res.status(400).json({message:"User already exist"})

        if (password !== confirmPassword){
            res.status(400).json({message:"passwords don't match"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const result= await User.create({email, password:hashedPassword, name: `${firstName} ${lastName}`})
        
        const token= jwt.sign({email:result.email, id:result._id}, process.env.MY_SECRET, {expiresIn:'1d'})

        res.status(200).json({result, token})

        
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}