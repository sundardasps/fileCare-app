import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Public from "./protect/Public";
import Layout from "./components/Layout";
import Protect from "./protect/Protect";
import Landing from "./components/Landing";
import Register from "./components/auth/Register";
import OtpVerification from "./components/auth/OtpVerification";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route element={<Public/>}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm" element={<OtpVerification />} />
        </Route>

        <Route element={<Protect/>}>
        <Route element={<Layout/>}>
        <Route path="/home" element={<Home />} />
        </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
