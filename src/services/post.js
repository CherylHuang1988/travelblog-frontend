import axios from "axios";
import { sendUser } from "../utils/userToken";
import { onError, onSuccess } from "../utils/serverResponseHandlers";

export function createPost(formBody) {
  return axios
    .create()
    .post("/create", formBody, sendUser())
    .then(onSuccess("create-post"))
    .catch(onError("create-post"));
}
