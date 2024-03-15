import { Post as PostProps } from "pages/api";
import React from "react";
import styles from "./post.module.css";

export const Post = ({ title, body }: Omit<PostProps, "userId" | "id">) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
};
