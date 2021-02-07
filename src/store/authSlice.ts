import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { auth, db } from "../firebase";

interface AuthTypes {
  loading: boolean;
  error: boolean;
  logged: boolean;
  userId: string | null;
  userNick: string | null;
  errorMessage: string | null;
}
interface LoginWithEmailAndPasswordTypes {
  email: string;
  password: string;
}
interface RegisterWithEmailAndPasswordTypes
  extends LoginWithEmailAndPasswordTypes {
  nick: string;
}

const initialState: AuthTypes = {
  loading: false,
  error: false,
  logged: false,
  userId: null,
  userNick: null,
  errorMessage: null,
};

const loginUser = createAsyncThunk(
  "authSlice/login",
  async ({ email, password }: LoginWithEmailAndPasswordTypes) => {
    const data = await auth.signInWithEmailAndPassword(email, password);
    if (data.user) {
      const user = await db
        .collection("users").doc(data.user.uid)
        .get();
        if(user){
          return user.data();
        }else{
          throw new Error("Login Error");
        }
    } else {
      throw new Error("Login Error");
    }
  }
);

const registerUser = createAsyncThunk(
  "authSlice/register",
  async ({ email, password, nick }: RegisterWithEmailAndPasswordTypes) => {
    const docRef = await db.collection("users").where("nick", "==", nick);

    const nickExist = await docRef
      .get()
      .then((doc) => (doc.docs.length === 0 ? false : true));

    if (nickExist) {
      throw new Error("Ten Nick jest już zajęty.");
    }
    let data;
    try {
      data = await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
        if(error.code === "auth/email-already-in-use"){
             throw new Error("Ten email jest już w użyciu.");
        }else{
            throw new Error(error.message);
        }
    }
    if (data && data.user) {
        await db
        .collection("users").doc(data.user.uid)
        .set({ nick: nick });
      return {nick:nick,id:data.user.uid};
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      { payload }: PayloadAction<{ userId: string|null; nick: string|null }>
    ) => {
        if(payload.userId){
            state.logged = true;
        }else{
            state.logged = false;
        }
      state.userId = payload.userId;
      state.userNick = payload.nick;
    },
    logOut:(state)=>{
      auth.signOut()
      state.logged= false;
      state.userId = null;
      state.userNick = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      if(payload && payload.id && payload.nick){
        state.userId = payload.id;
        state.userNick = payload.nick;
      }
      state.loading = false;
      state.logged = true;
      state.error = false;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
      state.logged = false;
      state.error = true;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(registerUser.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.logged = true;
      if(payload?.id && payload.nick){
          state.userId = payload?.id
          state.userNick = payload?.nick
      }
      state.error = false;
      state.errorMessage = null;
    });
    builder.addCase(registerUser.rejected, (state, { error }) => {
      state.loading = false;
      state.logged = false;
      state.error = true;
      if (error && error.message) {
        state.errorMessage = error.message;
      }
    });
  },
});

export { loginUser, registerUser };
export const {setUser,logOut} = authSlice.actions
