import axios from "axios";
import { instance } from "./axios";

export const postsApi = {
  getAllPosts() {
    return instance.get<Post[]>("/").then((response) => response.data);
  },
  getPost(postId: string) {
    return instance.get<Post>(postId).then((response) => response.data);
  },
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
