import { Navigate, Outlet } from "react-router-dom";

function Public() {
  const token = localStorage.getItem("mobigicToken");
  if (token) {
    return <Navigate to={'/home'}/>;
  }else{
    return <Outlet/>;
  }
}

export default Public;