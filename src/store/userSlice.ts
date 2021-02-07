import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";


interface InitialStateTypes{
    profilUserId: string | null

}


const initialState:InitialStateTypes = {
    profilUserId: null
}

export const getUserId = createAsyncThunk("user/getUserId", async({nick}:{nick:string})=>{
    const docRef = await db.collection("users").where("nick", "==", nick);
    const userRef = await docRef.get().then((doc) => doc.docs[0].id);
    console.log(userRef)
    return userRef

})


export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(getUserId.fulfilled,(state,{payload})=>{
            console.log(payload)
            state.profilUserId = payload
        })
    }
})
