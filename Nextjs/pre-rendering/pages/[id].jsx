import { useRouter } from "next/router";

// ISR - fallback: 'blocking'. Restrict in `getStaticPaths()` to generate only limited number of pages and generate rest of the pages on demand
export async function getStaticPaths() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  const paths = posts.map((post) => ({ params: { id: `${post.id}` } }));

  return { paths, fallback: "blocking" };
}

// ISR
export async function getStaticProps({ params }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await response.json();

  return { props: { post }, revalidate: 10 };
}

// ISR - fallback: 'blocking'
const Post = ({ post }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          border: "1px solid lightgray",
          height: "250px",
          width: "250px",
          padding: "0.5rem",
          margin: "0.5rem",
          borderRadius: "0.5rem",
          cursor: "pointer",
        }}
      >
        {post.body}
      </div>
    </div>
  );
};

// ISR - fallback: true
// export async function getStaticPaths() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const posts = await response.json();

//   const paths = posts.map((post) => ({ params: { id: `${post.id}` } }));

//   return { paths, fallback: true };
// }

// ISR - fallback: true
// const Post = ({ post }) => {
//   const router = useRouter();

//   if (router.isFallback) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//       }}
//     >
//       <div
//         style={{
//           border: "1px solid lightgray",
//           height: "250px",
//           width: "250px",
//           padding: "0.5rem",
//           margin: "0.5rem",
//           borderRadius: "0.5rem",
//           cursor: "pointer",
//         }}
//       >
//         {post.body}
//       </div>
//     </div>
//   );
// };

export default Post;
