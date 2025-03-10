import React, { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from "./input";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import {signup, signin} from "../../actions/auth"
import './auth.css'
const initialState={
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
}
const Auth=()=>{
    const [issignup, setIsSignup]=useState(false)
    const [formData, setFormData]=useState(initialState)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handlesubmit=(e)=>{
        e.preventDefault()
        if(issignup){
            dispatch(signup({formData, navigate}))

        }else{
            dispatch(signin({formData, navigate}))
        }
    }

    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]:e.target.value })
    }

    const [showPassword, setShowPassword]=useState(false)

    const handleShowPassword=()=> setShowPassword((prevShowPassword)=>!prevShowPassword)

    const switchmode=()=>{
        setIsSignup((prevSignUp)=>!prevSignUp)
        setShowPassword(false)
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className="authpaper" elevation={3}>
                <Avatar className="authavatar">
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{issignup ? 'Sign Up':"Sign In"}</Typography>
                <form className="authform" onSubmit={handlesubmit}>
                    <Grid container spacing={2}>
                        {
                            issignup && (
                                <>
                                    <Input name="firstName" label="first Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="last Name" handleChange={handleChange} half/>

                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="password" handleChange={handleChange} type={showPassword ? 'text':'password'} handleShowPassword={handleShowPassword}  />
                        {issignup && <Input name="confirmPassword" label="Reapeat Password" handleChange={handleChange} type={showPassword ? 'text':'password'} handleShowPassword={handleShowPassword} />}
                    </Grid>
                    <Button  type="submit" fullWidth variant="contained" color="primary" className="authsubmit">
                        {issignup? "Sign Up" : "Sign In" }
                    </Button>
                    <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={switchmode}>
                                    {issignup ? "Already have an account? Sign In":"Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                    </Grid>
                </form>
            </Paper>

        </Container>
    )
}

export default Auth