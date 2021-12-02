import { useState } from "react";
import { useNavigate } from "react-router";
import LoadingComponent from "../components/Loading/index";
import { createPost } from "../services/post";
import * as PATHS from "../utils/paths";
import "./createpost.css";

function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [chosenPicture, setChosenPicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleTitle(event) {
    setTitle(event.target.value);
  }

  function handleInput(event) {
    setContent(event.target.value);
  }

  function handleFileInput(event) {
    const imageFromInput = event.target.files[0];
    setChosenPicture(imageFromInput);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(false);

    if (!chosenPicture) {
      setError("Please select a Picture!!");
      setIsLoading(false);
      return;
    }

    const formBody = new FormData();
    formBody.append("title", title);
    formBody.append("content", content);
    formBody.append("postPicture", chosenPicture);

    createPost(formBody).then((res) => {
      if (!res.success) {
        return setError(res.data);
      }
      navigate(PATHS.FEED_PAGE);
    });

    if (isLoading) {
      return <LoadingComponent />;
    }
  }
  return (
    <div className="write">
      <img
        className="writeImg"
        src="https://images.pexels.com/photos/10313904/pexels-photo-10313904.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        alt=""
      />
      <form className="writeForm" onSubmit={handleSubmit}>
        {error && <h3 style={{ color: "red" }}>{error}</h3>}
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileInput}
          />

          <br />

          <input
            value={title}
            onChange={handleTitle}
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
          />
        </div>

        <br />

        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            value={content}
            onChange={handleInput}
            type="text"
            placeholder="Share your experience wiht us..."
          />

          <br />

          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
