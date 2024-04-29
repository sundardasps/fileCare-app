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

interseptor.interceptors.response.use((response) => response ,(error)=> {
  
  if (error.response && error.response.status === 403){
    toast.error("Oops,Something wrong!")
    localStorage.removeItem("mobigicToken");
    setTimeout(()=>{
       window.location.reload()
    },1000)
}
return Promise.reject(error);
});




export default interseptor