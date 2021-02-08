import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";

interface InitialStateTypes {
  profilUserId: string | null;
  loading: boolean;
}

const initialState: InitialStateTypes = {
  profilUserId: null,
  loading: true,
};

export const getUserId = createAsyncThunk(
  "user/getUserId",
  async ({ nick }: { nick: string }) => {
    const docRef = await db.collection("users").where("nick", "==", nick);
    const userRef = await docRef.get().then((doc) => doc.docs[0].id);
    return userRef;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserId.pending, (state) => {
      state.profilUserId = null;
      state.loading = true;
    });
    builder.addCase(getUserId.fulfilled, (state, { payload }) => {
      state.profilUserId = payload;
      state.loading = false;
    });
    builder.addCase(getUserId.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setLoading } = userSlice.actions;
