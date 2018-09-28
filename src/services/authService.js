import httpService from "./httpService";

const token = "userToken";

const getAuthToken = () => {
  return localStorage.getItem(token);
};

//httpService.setAuthToken(token, getAuthToken());

export const auth = {
  getAuthToken
};

export const http = { ...httpService };
