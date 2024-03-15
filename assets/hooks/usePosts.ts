import { Post, postsApi } from "@/pages/api";
import { useEffect, useState } from "react";

export const usePosts = (postId?: string) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const [loading, setIsLoading] = useState<boolean>(true);

  const [post, setPost] = useState<Post | null>();

  useEffect(() => {
    setIsLoading(true);
    if (postId) {
      postsApi.getPost(postId).then((res) => {
        setPost(res);
        setIsLoading(false);
      });
    } else {
      postsApi.getAllPosts().then((res) => {
        setPosts(res);
        setIsLoading(false);
      });
    }
  }, [postId]);

  return {
    posts,
    post,
    loading,
  };
};
