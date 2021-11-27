import axios from "axios";
import { sendUser } from "../utils/userToken";
import { onError, onSuccess } from "../utils/serverResponseHandlers";

const postService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/post`,
});

export function createPost(formBody) {
  console.log(sendUser());
  return postService
    .post("/create", formBody, sendUser())
    .then(onSuccess("create-post"))
    .catch(onError("create-post"));
}
