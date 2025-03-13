import axios from "axios";
import { useConfigStore } from "../store/configStore";

const api = axios.create();


api.interceptors.request.use((config) => {
  const { apiUrl } = useConfigStore.getState(); 
  config.baseURL = apiUrl; 

  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;
