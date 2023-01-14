import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
// import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home = ({ posts }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {posts.map((post) => (
        <Link href={`/${post.id}`} key={post.id}>
          <div
            style={{
              border: "1px solid lightgray",
              height: "250px",
              width: "250px",
              padding: "0.5rem",
              margin: "0.5rem",
              cursor: "pointer",
            }}
          >
            {post.title}
          </div>
        </Link>
      ))}
    </div>
  );
};

//SSG
export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  return { props: { posts: posts.slice(0, 15) } };
}

//SSR
// export async function getServerSideProps() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const posts = await response.json();

//   return { props: { posts } };
// }

// ISR
// export async function getStaticProps() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const posts = await response.json();

//   return {
//     props: {
//       posts: posts.slice(0, 5),
//       revalidate: 60,
//     },
//   };
// }

export default Home;
