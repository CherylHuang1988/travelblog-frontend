/*import axios from "axios";*/
import { useState } from "react";
import { updateProfilePic, updateUserName } from "../services/user";

export default function Profile(props) {
  const { user, setUser } = props;
  const [chosenPicture, setChosenPicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputKey, setInputKey] = useState("");
  const [username, setUsername] = useState(user.username);

  function handleFormSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(false);

    if (!chosenPicture) {
      setError("You must select a picture to upload!");
      setIsLoading(false);
      return;
    }

    const formBody = new window.FormData();
    formBody.append("profilePic", chosenPicture);
    formBody.append("userId", user._id);

    updateProfilePic(formBody).then((res) => {
      if (!res.success) {
        setError("Something happened");
        setIsLoading(false);
        return;
      }
      setUser({ ...user, profilePic: res.data.profilePic });
      setIsLoading(false);
      setInputKey(Date.now());
    });
  }

  function handleInputChange(event) {
    const imageFromInput = event.target.files[0];

    setChosenPicture(imageFromInput);
  }

  function handleUserChange(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    if (!username) {
      setError("You must write a username");
      setIsLoading(false);
      return;
    }
    updateUserName(username)
      .then((response) => {
        if (!response.success) {
          return setError(response.data);
        }

        setUser(response.data.user);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <h1>{user.username}'s Profile </h1>

      <img
        src={
          isLoading
            ? "https://www.vuescript.com/wp-content/uploads/2018/11/Show-Loader-During-Image-Loading-vue-load-image.png"
            : user.profilePic
        }
        alt={`${user.username}'s profile`}
        height={"200px"}
      />

      {error && <p style={{ color: "red", fontWeight: "600" }}>{error}</p>}

      <form onSubmit={handleFormSubmit} method="POST">
        <input key={inputKey} type="file" onChange={handleInputChange} />
        <button type="submit">Upload Profile Picture!</button>
      </form>

      <form onSubmit={handleUserChange}>
        <label>
          Username
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Change your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button type="submit">Change username</button>
      </form>
    </div>
  );
}
