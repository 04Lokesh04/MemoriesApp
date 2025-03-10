import React, { useEffect, useState } from "react";
import'./navbar.css'
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import memoriesLogo from '../../images/memoriesLogo.png'
import memoriesText from '../../images/memoriesText.png'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import {logout} from '../../reducers/auth'
import { jwtDecode as decode } from 'jwt-decode';
const Navbar=()=>{
  const [user, setUSer]=useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const location=useLocation()

  const loguserout=()=>{
    dispatch(logout())
    navigate("/auth")
    setUSer(null)
  }

  useEffect(()=>{
    const token=user?.token 
    if (token){
        const decodetoken=decode(token)

        if (decodetoken.exp *1000 < new Date().getTime()) logout()

      
    }
    setUSer(JSON.parse(localStorage.getItem('profile')))
  },[location])

  return(

    <AppBar className="appBar1" sx={{display:"flex", flexDirection:"row",}} position='static' color='inherit'>
        <Link to="/" className='brandContainer'>
          <img src={memoriesText} alt="icon" height="45px" />
          <img className="image" src={memoriesLogo} alt='memories Logo' height="40px"/>
        </Link>
        <Toolbar className="toolbar">
          {user?.result ?(<div className="profile">
                    <Avatar className="purple" alt={user.result.name} src={user.result.imageUrl} >{user.result.name.charAt(0)}</Avatar>
                    <Typography className="userName" variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" className="logout" color="secondary" onClick={loguserout} >logout</Button>
                </div>):(
                  <Button className="" variant="contained" color="primary" component={Link} to="/auth">Signin</Button>
                )}
        </Toolbar>
      </AppBar>
)}
export default Navbar