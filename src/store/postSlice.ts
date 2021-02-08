import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { db } from "../firebase";

interface InitialStateTypes {
  posts: Post[];
  userPosts: Post[];
  loadingUserPosts: boolean,
}

const initialState: InitialStateTypes = {
  posts: [],
  userPosts: [],
  loadingUserPosts: false,
};

export const fetchPosts = createAsyncThunk("/post/fetchPosts", async () => {
  const postsRef = await db
    .collection("posts")
    .orderBy("date", "desc")
    .limit(20)
    .get();
  const posts = postsRef.docs.map(
    (post) => ({ ...post.data(), id: post.id } as Post)
  );
  return [...posts];
});

export const fetchUserPosts = createAsyncThunk(
  "/post/fetchOwnPosts",
  async ({ nick }: { nick: string }) => {
    const postsRef = await db
      .collection("posts")
      .where("userNick", "==", nick)
      .orderBy("date", "desc")
      .get();
    const posts = postsRef.docs.map(
      (post) => ({ ...post.data(), id: post.id } as Post)
    );
    return [...posts];
  }
);



export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, { payload }: PayloadAction<Post>) => {
      db.collection("posts").add({ ...payload });
      state.posts.unshift({ ...payload });
    },
    toogleLike: (
      state,
      { payload }: PayloadAction<{ postId: string; userId: string }>
    ) => {
      const post: Post = state.posts.find(
        (post) => post.id === payload.postId
      ) as Post;
      const postFromUserPage: Post = state.userPosts.find(
        (post) => post.id === payload.postId
      ) as Post;

      if (post) {
        const alreadyLiked = post.likes.findIndex(
          (id) => id === payload.userId
        );
        if (alreadyLiked !== -1) {
          post.likes.splice(alreadyLiked, 1);
          if(postFromUserPage){
            postFromUserPage.likes.splice(alreadyLiked, 1);
          }
          db.collection("posts")
            .doc(payload.postId)
            .update({
              likes: post.likes.splice(alreadyLiked, 1),
            });
        } else {
          post.likes.push(payload.userId);
          if(postFromUserPage){
            postFromUserPage.likes.push(payload.userId);
          }
          db.collection("posts").doc(payload.postId).update({
            likes: post.likes,
          });
        }
      }else if(postFromUserPage){
        const alreadyLiked = postFromUserPage.likes.findIndex(
          (id) => id === payload.userId
        );
        if (alreadyLiked !== -1) {
          postFromUserPage.likes.splice(alreadyLiked, 1);
          db.collection("posts")
            .doc(payload.postId)
            .update({
              likes: postFromUserPage.likes.splice(alreadyLiked, 1),
            });
        } else {
          postFromUserPage.likes.push(payload.userId);
          db.collection("posts").doc(payload.postId).update({
            likes: postFromUserPage.likes,
          });
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
      const newPosts = [...state.posts, ...payload];
      const uniquePosts = Array.from(new Set(newPosts.map((s) => s.id)))
        .map((id) => {
          return newPosts.find((post) => post.id === id);
        })
        .filter((p) => p !== undefined) as Post[];
      state.posts = uniquePosts;
    });
    builder.addCase(fetchPosts.pending, (state)=>{
      state.loadingUserPosts= true;
    })
    builder.addCase(fetchUserPosts.fulfilled, (state, { payload }) => {
      state.userPosts = payload;
      state.loadingUserPosts = false;
    });
  },
});

export const { addPost, toogleLike } = postSlice.actions;
