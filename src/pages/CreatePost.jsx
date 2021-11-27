import { useState } from "react";
//import { useNavigate } from "react-router";
import LoadingComponent from "../components/Loading/index";
import { createPost } from "../services/post";
//import * as PATHS from "../utils/paths";

function CreatePost() {
  //const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [chosenPicture, setChosenPicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleDate(event) {
    setDate(event.target.value);
  }

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
    formBody.append("date", date);
    formBody.append("title", title);
    formBody.append("content", content);
    formBody.append("postPicture", chosenPicture);

    createPost(formBody).then((res) => {
      if (!res.success) {
        return setError(res.data);
      }
      //navigate(PATHS.FEED_PAGE);
    });

    if (isLoading) {
      return <LoadingComponent />;
    }
  }
  return (
    <div>
      <h1>Create your Post</h1>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        {error && <h3 style={{ color: "red" }}>{error}</h3>}
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={handleDate}
            placeholder="date of the post"
          />
        </label>
        <br />
        <br />
        <label>
          Title:
          <input
            value={title}
            onChange={handleTitle}
            type="text"
            placeholder="What's New?"
          />
        </label>
        <br />
        <br />
        <label>
          Image:
          <input className="inputFile" type="file" onChange={handleFileInput} />
        </label>
        <br />
        <br />
        <label>
          Text of your Post:
          <br />
          <textarea
            rows="10"
            cols="50"
            value={content}
            onChange={handleInput}
            type="text"
            placeholder="Sharing your experience wiht us!"
          />
        </label>
        <br />
        <button type="submit">Create a new Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
