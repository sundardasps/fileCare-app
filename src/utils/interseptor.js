import axios from "axios";
import toast from "react-hot-toast";

 const interseptor = axios.create({
  baseURL:import.meta.env.VITE_BASE_URL,
});

interseptor.interceptors.request.use((request) => {
  
  if (localStorage.getItem("mobigicToken")) {
    request.headers.Authorization = "Bearer " + localStorage.getItem("mobigicToken");
  }
  return request;
});




export default interseptor