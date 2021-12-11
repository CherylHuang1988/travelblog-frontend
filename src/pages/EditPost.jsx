import { useState } from "react";
import { useParams } from "react-router";
import {
  /*editPostTitle,*/ editPostPic /*, editPostCon*/,
} from "../services/post";
import { useNavigate } from "react-router-dom";

function EditPost(props) {
  console.log(props);

  const { postId } = useParams();
  //const [title, setTitle] = useState(post.title);
  //const [content, setContent] = useState(post.content);
  const [chosenPicture, setChosenPicture] = useState("");
  //const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputKey, setInputKey] = useState("");
  const navigate = useNavigate();

  function handleFormSubmit(event) {
    event.preventDefault();
    //setIsLoading(true);
    setError(false);

    if (!chosenPicture) {
      setError("Please select a pic to upload!");
      //setIsLoading(false);
      return;
    }

    editPicture();
  }

  function editPicture() {
    const formBody = new window.FormData();
    //formBody.append("title", title);
    //formBody.append("content", content);
    formBody.append("postPicture", chosenPicture);

    editPostPic(postId, formBody).then((res) => {
      if (!res.success) {
        setError("Somthing happened");
        //setIsLoading(false);
        return;
      }
      // setPost({ ...post, postPicture: res.data.postPicture });
      //setIsLoading(false);
      //setInputKey(Date.now());
      navigate(`/post/${postId}`);
    });
  }

  function handleInputChange(event) {
    const imageFromInput = event.target.files[0];
    setChosenPicture(imageFromInput);
  }

  return (
    <div>
      <br />
      <br />
      <h1>Edit your Post</h1>
      <br />
      <br />
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <form onSubmit={handleFormSubmit} method="POST">
        <input key={inputKey} type="file" onChange={handleInputChange} />
        <button type="submit">Update your Post!</button>
      </form>
    </div>
  );
}

export default EditPost;
