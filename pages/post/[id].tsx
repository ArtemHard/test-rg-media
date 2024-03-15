import styles from "./postPage.module.css";

import React from "react";
import { useRouter } from "next/router";
import { usePosts } from "assets/hooks";
import { Post } from "components/ui";
const PostPage = () => {
  const router = useRouter();

  const { post } = usePosts((router.query.id as string) ?? "");

  const backHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    router.back();
  };

  return (
    <>
      <header className={styles.header}>
        <button onClick={backHandler}>Back</button>
        <h1 className={styles.title}>{`Post № ${router.query.id}`}</h1>
      </header>
      {post && <Post {...post} />}
    </>
  );
};

export default PostPage;
