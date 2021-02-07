import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { db } from "../firebase";


interface InitialStateTypes{
    posts: Post[],
    userPosts: Post[],

}

export const fetchPosts = createAsyncThunk("/post/fetchPosts", async()=>{
        const postsRef = await db.collection("posts").orderBy("date").limit(20).get();
        const posts = postsRef.docs.map(post=> post.data() as Post)
        return [...posts]
})

export const fetchUserPosts= createAsyncThunk("/post/fetchOwnPosts", async({nick}:{nick:string})=>{
    const postsRef = await db.collection("posts").where("nick","==",nick).orderBy("date").get();
    const posts = postsRef.docs.map(post=> post.data() as Post)
    return [...posts]
})


const initialState:InitialStateTypes = {
    posts: [],
    userPosts: [],
}


export const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{},
    extraReducers:builder =>{
        builder.addCase(fetchPosts.fulfilled,(state,{payload})=>{
            state.posts = [...state.posts,...payload]
        });
        builder.addCase(fetchUserPosts.fulfilled,(state,{payload})=>{
            state.userPosts = payload;
        })
    }
})
