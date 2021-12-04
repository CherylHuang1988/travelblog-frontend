import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { deletePost, getSinglePost } from "../services/post";

function SinglePost() {
  const { postId } = useParams();
  console.log(postId);
  const [singlePost, setSinglePost] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const takeMeTheHellOuttaHerTo = useNavigate();

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

  function handleDelete() {
    setLoading(true);
    deletePost(postId)
      .then((response) => {
        if (!response.success) {
          return setError(response.data);
        }
      })
      .finally(() => {
        if (error) {
          setLoading(false);
        }
        takeMeTheHellOuttaHerTo("/feed");
      });
  } // function definition -> this defines actions

  //handleDelete() // function definition ->  this performs actions

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
      <br />
      <button onClick={handleDelete} type="delete">
        Delete
      </button>
    </div>
  );
}

export default SinglePost;
