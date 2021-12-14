import { useState } from "react";
import { useParams } from "react-router";
import { editPostCon, editPostPic } from "../services/post";
import { useNavigate } from "react-router-dom";

function EditPost() {
  const { postId } = useParams();
  const [content, setContent] = useState("");
  const [chosenPicture, setChosenPicture] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleFormSubmit(event) {
    event.preventDefault();
    setError(false);

    if (!chosenPicture) {
      setError("Please select a pic to upload!");
      return;
    }
    editPicture();
  }

  function editPicture() {
    const formBody = new window.FormData();
    formBody.append("postPicture", chosenPicture);

    editPostPic(postId, formBody).then((res) => {
      if (!res.success) {
        setError("Somthing happened");
        return;
      }
      navigate(`/post/${postId}`);
    });
  }

  function handleInputChange(event) {
    const imageFromInput = event.target.files[0];
    setChosenPicture(imageFromInput);
  }

  function handleContentSubmit(event) {
    event.preventDefault();
    setError(false);

    if (!content) {
      setError("Please write something!");
      return;
    }
    editContent();
  }

  function editContent() {
    const formBody = new window.FormData();
    formBody.append("content", content);

    editPostCon(postId, formBody).then((res) => {
      if (!res.success) {
        setError("Somthing happened");
        return;
      }
      navigate(`/post/${postId}`);
    });
  }

  return (
    <div>
      <br />
      <br />
      <h1>Edit your Post</h1>
      <br />
      <br />
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <br />
      <br />
      <form onSubmit={handleFormSubmit} method="POST">
        <input type="file" onChange={handleInputChange} />
        <button type="submit">Update your Picture!</button>
      </form>
      <br />
      <br />
      <form onSubmit={handleContentSubmit} method="POST">
        <label>
          Content:
          <br />
          <textarea
            type="text"
            name="content"
            value={content}
            placeholder="Edit your content"
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <button type="submit">Update your Content!</button>
      </form>
    </div>
  );
}

export default EditPost;
