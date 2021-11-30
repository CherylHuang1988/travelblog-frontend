import * as CONSTS from "./consts";

export function getUserToken() {
  return localStorage.getItem(CONSTS.ACCESS_TOKEN_LOCAL_STORAGE_KEY);
}

export function setUserToken(value) {
  return localStorage.setItem(CONSTS.ACCESS_TOKEN_LOCAL_STORAGE_KEY, value);
}

export function removeUserToken() {
  return localStorage.removeItem(CONSTS.ACCESS_TOKEN_LOCAL_STORAGE_KEY);
}

export function sendUser() {
  return {
    headers: {
      authorization: getUserToken(),
    },
  };
}
