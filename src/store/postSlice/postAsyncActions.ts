import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import firebase from "firebase/app"


export const addComment = createAsyncThunk("post/addComment", async ({comment,postId}:{comment:Comment,postId:string}) => {
  await db
    .collection("posts")
   .doc(postId).update({
     comments: firebase.firestore.FieldValue.arrayUnion(comment)
   })
  return {postId:postId,comment:comment}
});

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const postsRef = await db
    .collection("posts")
    .orderBy("date", "desc")
    .limit(10)
    .get();
  const posts = postsRef.docs.map(
    (post) => ({ ...post.data(), id: post.id } as Post)
  );
  return [...posts];
});

export const fetchFollowersPosts = createAsyncThunk(
  "post/fetchFollowersPosts",
  async (_, { getState }) => {
    const {
      auth: { userFollowing },
    } = getState() as { auth: { userFollowing: string[] } };
    const postsRef = await db
      .collection("posts")
      .orderBy("date", "desc")
      .where("authorId", "in", userFollowing)
      .limit(10)
      .get();
    const posts = postsRef.docs.map(
      (post) => ({ ...post.data(), id: post.id } as Post)
    );
    return [...posts];
  }
);

export const fetchUserPosts = createAsyncThunk(
  "post/fetchOwnPosts",
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

export const fetchMorePost = createAsyncThunk(
  "post/fetchMorePost",
  async (_, { getState }) => {
    const {
      posts: { lastPostId },
    } = getState() as { posts: { lastPostId: string | null } };

    if (lastPostId) {
      const lastPostRef = await db.collection("posts").doc(lastPostId).get();

      const postsRef = await db
        .collection("posts")
        .orderBy("date", "desc")
        .startAfter(lastPostRef)
        .limit(10)
        .get();
      const posts = postsRef.docs.map(
        (post) => ({ ...post.data(), id: post.id } as Post)
      );
      return [...posts];
    }
    return [];
  }
);

export const fetchMoreFollowersPost = createAsyncThunk(
  "post/fetchMoreFollowersPost",
  async (_, { getState }) => {
    const {
      posts: { lastFollowersPostId },
      auth: { userFollowing },
    } = getState() as {
      posts: { lastFollowersPostId: string | null };
      auth: { userFollowing: string[] };
    };
    if (lastFollowersPostId) {
      const lastPostRef = await db
        .collection("posts")
        .doc(lastFollowersPostId)
        .get();
        
        const postsRef = await db
        .collection("posts")
        .orderBy("date", "desc")
        .where("authorId", "in", userFollowing)
        .startAfter(lastPostRef)
        .limit(10)
        .get();
      const posts = postsRef.docs.map(
        (post) => ({ ...post.data(), id: post.id } as Post)
      );
      return [...posts];
    }
    return []
  }
);
