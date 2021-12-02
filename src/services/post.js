import axios from "axios";
import { onError, onSuccess } from "../utils/serverResponseHandlers";
import { getAccessToken, sendUser, SERVER_URL } from "../utils/consts";

const postService = axios.create({
  baseURL: `${SERVER_URL}/post`,
});

export function createPost(formBody) {
  console.log(sendUser());
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
  const authorization = getAccessToken();
  console.log("authorization:", authorization);
  return postService
    .get("/", {
      headers: {
        authorization: getAccessToken(),
      },
    })
    .then(onSuccess("getAllPosts"))
    .catch(onError("getAllPosts"));
}
