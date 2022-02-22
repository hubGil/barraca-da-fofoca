import Prismic from "@prismicio/client";
import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import styles from "./styles.module.scss";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../services/prismic";
export default function Famous({ posts }) {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <Head>
        <title>Famous | Barraca da Fofoca</title>
      </Head>

      <main className={`${styles.container} `}>
        <div
          className={`${styles.posts} ${
            !session ? styles.previewContent : ""
          } `}
        >
          {posts.map((post) => (
            <Link key={post.uid} href="#">
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.description}</p>
              </a>
            </Link>
          ))}
        </div>
        {!session && (
          <button
            className={styles.continueReading}
            onClick={() => signIn("github")}
          >
            <strong>Wanna continue reading?</strong>
            <p>Signing now 🤗</p>
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at("document.type", "post")],
    { fetch: ["post.title", "post.description", "post.img"], pageSize: 100 }
  );

  const posts = response.results.map((post) => ({
    slug: post.uid ||"",
    title: RichText.asText(post.data.title)||"" ,
    description: post.data.description.find(
      (content) => content.type === "paragraph"
    ).text || "",
    img: post.data.img.url || "",
    updatedAt: new Date(post.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  }));
  return {
    props: {
      posts,
    },
  };
};
