import { auth, http } from "./authService";
import { userApiEndpoint } from "../config.json";

const userIfExists = () => {
  if (auth.getAuthToken()) return true;
  return false;
};

const getCurrentUser = async () => {
  if (!userIfExists()) {
    return {};
  }
  let id = localStorage.getItem("id");
  let response = await http.get(userApiEndpoint + "/" + id);
  if (response.data) {
    return response.data;
  }
  return {};
};

const getAllUsers = async () => {
  //if (!userIfExists()) {
  //return [];
  //}
  let response = await http.get(userApiEndpoint);
  if (response.data) {
    return response.data;
  }
  return [];
};

const addNewUser = async user => {
  if (userIfExists()) {
    return {};
  }
  let response = await http.post(userApiEndpoint, user);
  if (response.data) {
    return response.data;
  }
  return {};
};

export default {
  userIfExists,
  getCurrentUser,
  getAllUsers,
  addNewUser
};
