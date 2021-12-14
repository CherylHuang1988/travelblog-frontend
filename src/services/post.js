import axios from "axios";
import { onError, onSuccess } from "../utils/serverResponseHandlers";
import { getAccessToken, sendUser, SERVER_URL } from "../utils/consts";

const postService = axios.create({
  baseURL: `${SERVER_URL}/post`,
});

export function editPostPic(id, formBody) {
  return postService
    .post(`/${id}/editPostPic`, formBody, sendUser())
    .then(onSuccess("edit-post"))
    .catch(onError("edit-post"));
}

export function editPostCon(id, formBody) {
  return postService
    .patch(`/${id}/editPostCon`, formBody, sendUser())
    .then(onSuccess("edit-post"))
    .catch(onError("edit-post"));
}

export function createPost(formBody) {
  return postService
    .post("/create", formBody, sendUser())
    .then(onSuccess("create-post"))
    .catch(onError("create-post"));
}

export function getSinglePost(id) {
  return postService
    .get(`/${id}`)
    .then(onSuccess("getSinglePost"))
    .catch(onError("getSinglePost"));
}

export function getAllPosts() {
  return postService
    .get("/", {
      headers: {
        authorization: getAccessToken(),
      },
    })
    .then(onSuccess("getAllPosts"))
    .catch(onError("getAllPosts"));
}

export function deletePost(id) {
  return postService
    .delete(`/${id}/delete`, {
      headers: {
        authorization: getAccessToken(),
      },
    })
    .then(onSuccess("deletePost"))
    .catch(onError("deletepost"));
}
