export async function getStaticPaths() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  const paths = posts.map((post) => ({ params: { id: `${post.id}` } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await response.json();

  return { props: { post } };
}

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
          cursor: "pointer",
        }}
        key={post.id}
      >
        {post.body}
      </div>
    </div>
  );
};

export default Post;
