interface Comment {
  authorNick: string;
  avatarUrl: string | null;
  text: string;
  date:number;
}

interface Post {
  date: number;
  text: string;
  authorId: string;
  likes: string[];
  id: string;
  userNick: string;
  comments: Comment[] | WritableDraft<Comment>;
}

interface Follower {
  avatarUrl: string;
  nick: string;
}