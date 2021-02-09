import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import firebase from "firebase/app";
import {
  addComment,
  fetchFollowersPosts,
  fetchMoreFollowersPost,
  fetchMorePost,
  fetchPosts,
  fetchUserPosts,
} from "./postAsyncActions";

interface InitialStateTypes {
  posts: Post[];
  followersPosts: Post[];
  userPosts: Post[];
  loadingUserPosts: boolean;
  lastPostId: string | null;
  lastFollowersPostId: string | null;
  loadingPosts: boolean;
}

const initialState: InitialStateTypes = {
  posts: [],
  userPosts: [],
  followersPosts: [],
  loadingUserPosts: false,
  lastPostId: null,
  lastFollowersPostId: null,
  loadingPosts: false,
};

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
          if (postFromUserPage) {
            postFromUserPage.likes.splice(alreadyLiked, 1);
          }
          db.collection("posts")
            .doc(payload.postId)
            .update({
              likes: firebase.firestore.FieldValue.arrayRemove(payload.userId),
            });
        } else {
          post.likes.push(payload.userId);
          if (postFromUserPage) {
            postFromUserPage.likes.push(payload.userId);
          }
          db.collection("posts")
            .doc(payload.postId)
            .update({
              likes: firebase.firestore.FieldValue.arrayUnion(payload.userId),
            });
        }
      } else if (postFromUserPage) {
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
    builder.addCase(addComment.fulfilled, (state, { payload }) => {
      const postRef = state.posts.find((post) => post.id === payload.postId);
      const userPostRef = state.userPosts.find(
        (post) => post.id === payload.postId
      );
      const followersPosts = state.followersPosts.find(
        (post) => post.id === payload.postId
      );

      if (postRef) {
        postRef.comments.push(payload.comment);
      }
      if (userPostRef) {
        userPostRef.comments.push(payload.comment);
      }
      if (followersPosts) {
        followersPosts.comments.push(payload.comment);
      }
    });
    // //
    builder.addCase(fetchPosts.pending, (state) => {
      state.loadingPosts = true;
    });
    //
    builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
      const newPosts = [...state.posts, ...payload];
      const uniquePosts = Array.from(new Set(newPosts.map((s) => s.id)))
        .map((id) => {
          return newPosts.find((post) => post.id === id);
        })
        .filter((p) => p !== undefined) as Post[];
      state.posts = uniquePosts;
      state.lastPostId = uniquePosts[uniquePosts.length - 1].id;
      state.loadingPosts = false;
    });
    // //
    builder.addCase(fetchFollowersPosts.pending, (state) => {
      state.loadingPosts = true;
    });
    //
    builder.addCase(fetchFollowersPosts.fulfilled, (state, { payload }) => {
      const newPosts = [...state.followersPosts, ...payload];
      const uniquePosts = Array.from(new Set(newPosts.map((s) => s.id)))
        .map((id) => {
          return newPosts.find((post) => post.id === id);
        })
        .filter((p) => p !== undefined) as Post[];
      state.followersPosts = uniquePosts;
      if (uniquePosts.length >= 1) {
        state.lastFollowersPostId = uniquePosts[uniquePosts.length - 1].id;
      } else {
        state.lastFollowersPostId = null;
      }
      state.loadingPosts = false;
    });
    // //
    builder.addCase(fetchMorePost.pending, (state) => {
      state.loadingPosts = true;
    });
    builder.addCase(fetchMorePost.fulfilled, (state, { payload }) => {
      const newPosts = [...state.posts, ...payload];
      state.posts = newPosts;
      if (payload.length >= 1) {
        state.lastPostId = payload[payload.length - 1].id;
      } else {
        state.lastPostId = null;
      }
      state.loadingPosts = false;
    });
    // //
    builder.addCase(fetchMoreFollowersPost.pending, (state) => {
      state.loadingPosts = true;
    });
    builder.addCase(fetchMoreFollowersPost.fulfilled, (state, { payload }) => {
      console.log(payload);
      const newPosts = [...state.followersPosts, ...payload];
      state.followersPosts = newPosts;
      if (payload.length >= 1) {
        state.lastFollowersPostId = payload[payload.length - 1].id;
      } else {
        state.lastFollowersPostId = null;
      }
      state.loadingPosts = false;
    });
    // //
    builder.addCase(fetchUserPosts.pending, (state) => {
      state.loadingUserPosts = true;
    });
    //
    builder.addCase(fetchUserPosts.fulfilled, (state, { payload }) => {
      state.userPosts = payload;
      state.loadingUserPosts = false;
    });
  },
});

export const { addPost, toogleLike } = postSlice.actions;
