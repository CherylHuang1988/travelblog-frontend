import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { deletePost, getSinglePost } from "../services/post";
import "./singlepost.css";

function SinglePost(props) {
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
  function handleEdit() {
    takeMeTheHellOuttaHerTo(`/post/${postId}/edit`);
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const isSameUser = props.user.username === singlePost.owner.username;
  const date = new Date(props.user.createdAt);
  console.log("Date:", date);

  return (
    <div className="singlepost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          width="600"
          height="400"
          src={singlePost.image}
          alt={`$singlePost.owner.username} pic`}
        />

        <h1 className="singlePostTitle">
          {singlePost.title}
          <div className="singlePostEdit">
            {isSameUser ? (
              <button
                className="delete-btn"
                onClick={handleDelete}
                type="delete"
              >
                <i className="singlePostIcon far fa-trash-alt"></i>
              </button>
            ) : null}
            {isSameUser ? (
              <button className=" edit-btn" onClick={handleEdit} type="button">
                <i className="singlePostIcon far fa-edit"></i>
              </button>
            ) : null}
          </div>
        </h1>

        <div className="singlePostInfo">
          <Link
            className="singlePostAuthor"
            to={`/${singlePost.owner.username}`}
          >
            Author: <b>{singlePost.owner.username}</b>
          </Link>
          <span className="singlePostDate">Post on: {date.toUTCString()}</span>
        </div>

        <p className="singlePostDesc">{singlePost.content}</p>
      </div>
    </div>
  );
}

export default SinglePost;
