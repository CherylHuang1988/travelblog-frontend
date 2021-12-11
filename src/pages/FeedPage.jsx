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
    <div>
      {posts.map((post) => (
        <Link key={post._id} to={`/post/${post._id}`}>
          <div>
            <h1>{post.title}</h1>
            <img height="350px" src={post.image} alt={post.content} />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default FeedPage;
