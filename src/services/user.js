import axios from "axios";
import {
  getAccessToken,
  removeAccessToken,
  sendUser,
  SERVER_URL,
} from "../utils/consts";
import { onError, onSuccess } from "../utils/serverResponseHandlers";

const userService = axios.create({
  baseURL: `${SERVER_URL}/user`,
});

export function updateProfilePic(formBody) {
  return userService
    .post("/updateProfilePic", formBody, sendUser())
    .then(onSuccess("update-profile"))
    .catch(onError("update-profile"));
}

export function updateUserName(username) {
  return userService
    .patch("/update-account", { username }, sendUser())
    .then(onSuccess("update-account"))
    .catch(onError("update-account"));
}

export function getUserData(username) {
  return userService
    .get(`/${username}`)
    .then(onSuccess("getUser"))
    .catch(onError("getUser"));
}

export function deleteUser(userId) {
  return userService
    .delete(`/${userId}/delete`, {
      headers: {
        authorization: getAccessToken(),
      },
    })
    .then((res) => {
      removeAccessToken();
      return onSuccess("deleteUser")(res);
    })
    .catch(onError("deleteUser"));
}

// const arr = [1,2,3]

// function doubleThatSucker(num) {
//   return num * 2
// }

// arr.map((num, index, arr) => doubleThatSucker(num, index, arr)) // [2,4,6]

/*export function followPerson(target) {
  return userService
    .post("/follow", { target }, sendUser())
    .then(onSuccess("following"))
    .catch(onError("following"));
}

export function unfollowPerson(target) {
  return userService
    .post("/unfollow", { target }, sendUser())
    .then(onSuccess("unfollowing"))
    .catch(onError("unfollowing"));
}*/
