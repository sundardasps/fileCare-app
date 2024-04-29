import { Navigate, Outlet } from "react-router-dom";

function Protect() {
  if (localStorage.getItem("mobigicToken")) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default Protect;
