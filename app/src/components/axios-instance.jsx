import axios from "axios";

const instance = axios.create({
  baseURL: "https://flexiblegrammbackend.onrender.com",
  withCredentials: true,
});

export default instance;
