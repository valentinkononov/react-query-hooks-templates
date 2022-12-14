import axios from "axios";

const axiosRequestConfig = {
  baseURL: "https://www.anapioficeandfire.com",
  // headers: {
  //     Authorization: `Bearer ...`,
  // },
};

export const instance = axios.create(axiosRequestConfig);

export default instance;
