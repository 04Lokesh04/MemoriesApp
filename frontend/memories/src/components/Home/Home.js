import React from "react";
import { Container, Grow, Grid, useMediaQuery, Paper, AppBar, TextField, Button} from '@mui/material'
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import {useNavigate, useLocation} from "react-router-dom"
import {Chip, Autocomplete} from "@mui/material"
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getPosts, getPostBySearch } from '../../actions/posts';
import './home.css'
import Paginate from "../Pagination" ;

function useQuery(){
  return new URLSearchParams(useLocation().search)
}


const Home=()=>{
    const [search, setSearch]=useState("")
    const [tags, setTags]=useState([])
    const [currentId, setCurrentId]=useState(null)
    const dispatch=useDispatch()
    const isSmallScreen = useMediaQuery('(max-width:600px)')
    const query=useQuery()
    const navigate=useNavigate()
    const page=query.get('page')||1
    const searchQuery=query.get('searchQuery')

    const searchPost=()=>{
        if (search.trim() ||tags){
            dispatch(getPostBySearch({search, tags:tags.join(',')}))
            navigate(`/posts/search?searchQuery=${search ||'none'}&tags=${tags.join(',')}`)
            setSearch("")
        }else{
            navigate('/')
        }
    }

    const handlekeypress=(e)=>{
        if (e.key==="Enter"){
            searchPost()
            
        }
    }
    return(
    <Grow in>
        <Container maxWidth='xl'>
          <Grid container direction={isSmallScreen ? "column-reverse" : "row"}  justifyContent="space-between" alignItems="stretch" spacing={3} className="gridContainer">
            <Grid item xs={12} sm={6} md={9}>
              <Posts  setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className="appBarSearch" position="static" color="inherit">
                <TextField name="search" variant="outlined" label="Search Memories" fullWidth value={search} onKeyDown={handlekeypress} onChange={(e)=>{setSearch(e.target.value)}}/>

                <Autocomplete
                multiple
                id="tags-filled"
                options={[]} 
                freeSolo
                value={tags}
                onChange={(event, newTags) => setTags(newTags)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    const { key, ...tagProps } = getTagProps({ index });
                    return(
                    <Chip  key={key} label={option} {...tagProps} />
                  )})
                }
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Search Tags" placeholder="Enter tags" />
                )}
                style={{ margin: '10px 0' }}
              />

                <Button className="searchButton" variant="contained" onClick={searchPost} color="primary" >Search</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              {(!searchQuery && !tags.length) && (
                <Paper elevation={6} className="pagination">
                <Paginate  page={page}/> 
              </Paper>
              )}
              
            </Grid>
          </Grid>
        </Container>
      </Grow>
)}

export default Home