import axios from "axios";

const instance = axios.create({
  baseURL: "https://flexiblegrammbackend.onrender.com/api",
  withCredentials: true,
});

export default instance;
