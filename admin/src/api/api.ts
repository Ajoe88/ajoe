import axios from "axios";
import { getCredentials } from "../auth";
import { createJwtAuthorizationHeader } from "./http.util";

export const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const credentials = getCredentials();
  if (credentials) {
    // config.headers["Authorization"] = createBasicAuthorizationHeader(
    //   credentials.username,
    //   credentials.password
    // );
    config.headers["Authorization"] = createJwtAuthorizationHeader();
  }
  return config;
});
