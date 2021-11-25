import { useState } from "react";
//import { useNavigate } from "react-router";
import LoadingComponent from "../components/Loading/index";
import { createPost } from "../services/post";
//import * as PATHS from "../utils/paths";

function CreatePost() {
  //const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [chosenPicture, setChosenPicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleFileInput(event) {
    const imageFromInput = event.target.files[0];
    setChosenPicture(imageFromInput);
  }

  function handleInput(event) {
    setContent(event.target.value);
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
      <form onSubmit={handleSubmit}>
        {error && <h1>{error}</h1>}
        <input className="inputFile" type="file" onChange={handleFileInput} />
        <br />
        <label>
          <input
            value={content}
            onChange={handleInput}
            type="text"
            placeholder="What's New?"
          />
        </label>
        <button type="submit">Create a new Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
