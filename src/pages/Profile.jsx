/*import axios from "axios";*/
import { useState } from "react";
import { updateProfilePic, updateUserName } from "../services/user";
import "./profile.css";
import { deleteUser } from "../services/user";
import { useNavigate } from "react-router-dom";

export default function Profile(props) {
  const { user, setUser } = props;
  const [chosenPicture, setChosenPicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputKey, setInputKey] = useState("");
  const [username, setUsername] = useState(user.username);
  const takeMeTheHellOuttaHerTo = useNavigate();

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

  function handleDelete() {
    setIsLoading(true);
    deleteUser(user)
      .then((response) => {
        if (!response.success) {
          return setError(response.data);
        }
      })
      .finally(() => {
        if (error) {
          setIsLoading(false);
        }
        takeMeTheHellOuttaHerTo("/auth/login");
      });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">
            {user.username}'s Profile Settings
          </span>
        </div>

        {error && <p style={{ color: "red", fontWeight: "600" }}>{error}</p>}

        <form
          className="settingsForm"
          onSubmit={handleFormSubmit}
          method="POST"
        >
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              className="settingsPPIcon"
              src={
                isLoading
                  ? "https://www.vuescript.com/wp-content/uploads/2018/11/Show-Loader-During-Image-Loading-vue-load-image.png"
                  : user.profilePic
              }
              alt={`${user.username}'s profile`}
              height={"200px"}
            />

            <input
              id="fileInput"
              key={inputKey}
              type="file"
              onChange={handleInputChange}
            />
            <button className="profilePicButton" type="submit">
              Upload Profile Picture!
            </button>
          </div>
        </form>

        <form onSubmit={handleUserChange}>
          <label>Username</label>
          <div>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Change your username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <button className="changeUsernameBtn" type="submit">
              Change username
            </button>
          </div>
          <button onClick={handleDelete} type="delete">
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
