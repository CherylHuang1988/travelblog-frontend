import { useState } from "react";
import { useParams } from "react-router";
import { editPostCon, editPostPic } from "../services/post";
import { useNavigate } from "react-router-dom";
import "./editpost.css";

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
    <div className="editpost">
      <div className="editWrapper">
        <div className="editTitle">
          <span className="editUpdateTitle">Edit your post</span>
        </div>

        {error && <h3 style={{ color: "red" }}>{error}</h3>}

        <form className="editForm" onSubmit={handleFormSubmit} method="POST">
          <label>Post photo</label>
          <div className="editPP">
            <input type="file" onChange={handleInputChange} />

            <button className="editPhotoButton" type="submit">
              Update Photo
            </button>
          </div>
        </form>
        <hr />

        <form className="editForm" onSubmit={handleContentSubmit} method="POST">
          <label>Content</label>

          <textarea
            className="writeInput writeText"
            type="text"
            name="content"
            value={content}
            placeholder="Edit your content"
            onChange={(e) => setContent(e.target.value)}
          />

          <hr />

          <button className="updateContentBtn" type="submit">
            Update Content
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
