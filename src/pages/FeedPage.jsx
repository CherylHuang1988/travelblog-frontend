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
      {posts.map((post) => (
        <Link className="post" key={post._id} to={`/post/${post._id}`}>
          <h1 className="postTitle">{post.title}</h1>
          <img
            height="280px"
            className="postImg"
            src={post.image}
            alt={post.content}
          />
        </Link>
      ))}

      <div className="postInfo">
        <div>
          <span className="postTitle"></span>
        </div>
      </div>
    </>
  );
}

export default FeedPage;
