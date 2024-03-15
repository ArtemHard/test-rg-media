import styles from "styles/Home.module.css";
import { useEffect, useState } from "react";
import { usePosts } from "assets/hooks";
import { Pagination, Post } from "components/ui";
import clsx from "clsx";
import Link from "next/link";

const postsPerPage = 10 as const;

export default function Home() {
  const { posts } = usePosts();

  const [dispalayedPosts, setDispalayedPosts] = useState<typeof posts>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const onChangePage = (page: number) => {
    setCurrentPage(page);
    const totalPosts = posts.length;
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    setDispalayedPosts(posts.slice(startIndex, endIndex));
  };

  useEffect(() => {
    if (posts) {
      onChangePage(currentPage);
    }
  }, [posts, currentPage]);

  return (
    <>
      <header className={styles.header}>Posts</header>
      <main className={clsx(styles.main)}>
        {!!dispalayedPosts.length && (
          <>
            {dispalayedPosts.map((post) => (
              <Link
                key={post.id}
                href={"/post/" + post.id}
                className={styles.link}
              >
                <Post key={post.id} {...post} />
              </Link>
            ))}
            <Pagination
              perPageOptions={[postsPerPage]}
              count={Math.ceil(posts.length / postsPerPage)}
              onChange={onChangePage}
              page={currentPage ? +currentPage : 1}
              defaultValue={postsPerPage}
            />
          </>
        )}
      </main>
    </>
  );
}
