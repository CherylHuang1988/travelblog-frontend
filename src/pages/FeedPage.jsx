import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../services/post";
import "./feedpage.css";

function FeedPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((dbPosts) => {
      console.log("db:", dbPosts);
      if (!dbPosts.success) {
        return;
      }
      setPosts(dbPosts.data.post);
    });
  }, []);

  return (
    <>
      <div className="flex">
        {posts.map((post) => (
          <Link className="post" key={post._id} to={`/post/${post._id}`}>
            <h3>{post.title}</h3>
            <img
              className="postImg"
              height="200px"
              width="100%"
              src={post.image}
              alt={post.content}
            />
          </Link>
        ))}
      </div>
    </>
  );
}

export default FeedPage;
