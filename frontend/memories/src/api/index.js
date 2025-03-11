import axios from 'axios'

const API=axios.create({baseURL:'https://memoriesapp-ckon.onrender.com'})

API.interceptors.request.use((req)=>{
    if (localStorage.getItem('profile')){
        req.headers.Authorization= `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
})

export const fetchPosts=(page)=>API.get(`/posts?page=${page}`)
export const fetchPostsBySearch=(searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery.search|| 'none'}&tags=${searchQuery.tags}`)
export const createPost=(post)=>API.post("/posts", post)
export const updatePostApi=(id, updatedpost)=>API.patch(`/posts/${id}`, updatedpost)
export const deletePost=(id)=>API.delete(`/posts/${id}`)
export const likePost=(id)=>API.patch(`posts/${id}/likePost`)
export const fetchPost=(id)=>API.get(`/posts/${id}`)
export const comment=(value,id)=>API.post(`posts/${id}/commentPost`, {value})

export const signin=(formData)=>API.post("/user/signin", formData)
export const signup=(formData)=>API.post("/user/signup", formData)
