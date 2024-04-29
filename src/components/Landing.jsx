import { Button } from "@material-tailwind/react";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import upload from "../../public/upload.gif";

function Landing() {

  const navigate = useNavigate()
  return (
  
        <div className=" h-screen bg-white ">
         <Navbar />
         <div className="container m-auto flex px-5">
          <div className="w-2/3 flex items-center  ">
            <div className="my-[20%] ">
            <h1 className="text-6xl font-semibold">Build file handling<br /> in minutes</h1>
            <p className="my-5 text-xl font-medium text-blue-gray-500">Upload, store, transform, optimize, and deliver images, videos, and documents to billions of users.</p>
             <Button onClick={()=>{
                 navigate('/register')
             }}>Start now for free</Button>
            </div>
          </div>
          <div className="w-1/2">
            <img src={upload} className="my-5" alt="upload" />
          </div>
          </div>
       </div>

  );
}

export default Landing;
