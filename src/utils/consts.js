export const ACCESS_TOKEN_LOCAL_STORAGE_KEY = "accessToken";

const APP_NAME = "travelblog2";
export const CAPITALIZED_APP =
  APP_NAME[0].toUpperCase() + APP_NAME.slice(1).toLowerCase();

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
}

export function setAccessToken(newValue) {
  return localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, newValue);
}

export function removeAccessToken() {
  return localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
}

export function sendUser() {
  return {
    headers: {
      authorization: getAccessToken(),
    },
  };
}

/*const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";*/
const BASE_URL =
  process.env.REACT_APP_SERVER_URL || "http://localhost:5005/api";

export const SERVER_URL = `${BASE_URL}`;
