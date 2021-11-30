import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getSinglePost } from "../services/post";

function SinglePost() {
  const { postId } = useParams();
  const [singlePost, setSinglePost] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getSinglePost(postId)
      .then((response) => {
        if (!response.success) {
          return setError(response.data);
        }
        setSinglePost(response.data.post);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <br />
      <h1>{singlePost.title}</h1>
      <br />
      <Link to={`/${singlePost.owner.username}`}>
        <h3>{singlePost.owner.username}</h3>
      </Link>
      <h5>Post on: {singlePost.createdAt}</h5>
      <br />
      <main>
        <img
          width="600"
          height="400"
          src={singlePost.image}
          alt={`$singlePost.owner.username} pic`}
        />
      </main>
      <br />
      <h2>{singlePost.content}</h2>
    </div>
  );
}

export default SinglePost;
