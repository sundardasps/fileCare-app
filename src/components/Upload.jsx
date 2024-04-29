import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import interseptor from "../utils/interseptor";
import {
  Button,
  Typography,
  Card,
  Input,
} from "@material-tailwind/react";

export default function Upload({ handleOpen }) {
  const [file, setFile] = useState();
  const [fileName, setFilename] = useState("");
  const [error, setError] = useState({
    fileName: "",
    file: "",
  });
  
  const [uploadProgress, setUploadProgress] = useState(null);
  const queryClient = useQueryClient();
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (fileName.trim() === "") {
      setError({ fileName: "Field requred!" });
    } else if (fileName.length > 20) {
      setError({ fileName: "Please keep the filename under 15 characters!" });
    } else if (!file) {
      setError({ file: "Please select a file" });
    } else {
      alert()
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName);
      interseptor
        .post("/uploadFile", formData, {
          onUploadProgress: (data) => {
            console.log(data.loaded, data.total);
            setUploadProgress(Math.round((data.loaded / data.total) * 100));
          },
        })
        .then((res) => {
          if (res.data.uploaded) {
            toast.success(res.data.message);
            setTimeout(() => {
              handleOpen(false);
              queryClient.invalidateQueries("home");
            }, 1000);
          } else {
            toast.error(res.data.message);
          }
        });
    }
  };

  return (
    <Card className=" py-5 mb-5 bg-transparent  text-center border shadow-lg border-blue-600">
      <Typography className="text-3xl font-semibold ">Add file</Typography>
      <div className="mx-10  ">
        <p className="text-start my-1 text-sm">File name</p>
        <Input
          type="text"
          onChange={(e) => {
            setFilename(e.target.value), setError("");
          }}
        />
        {error.fileName && (
          <p className="text-orange-900 text-xs text-start m-1">
            {error.fileName}
          </p>
        )}
        <p className="text-start my-1 text-sm">Select file</p>
        <label
          htmlFor="fileupload"
          className="flex my-1   cursor-pointer h-32 bg-blue-gray-50 rounded-md mx-auto border border-dashed border-black p-5"
        >
          <div className="m-auto">
            <ArrowUpTrayIcon className="w-10 m-auto mb-2 " />
            <p className=""> Click to select file</p>
          </div>
          <input
            className="hidden"
            type="file"
            id="fileupload"
            name="UploadFiles"
            onChange={(e) => {
              handleFileChange(e), setError("");
            }}
          />
        </label>
        {error.file && (
          <p className="text-orange-900 text-xs text-start my-2 mx-auto">
            {error.file}
          </p>
        )}
        {file && <h5 className="my-2">{file.name}</h5>}
        {uploadProgress && (
          <div className="w-full m-auto rounded-3xl  my-5  border-2   border-blue-gray-600 ">
            <div
              style={{
                width: `${uploadProgress}%`,
                backgroundColor: "#008ff5",
              }}
              aria-valuenow={uploadProgress}
              aria-valuemin="0"
              aria-valuemax="100"
              role="progressbar"
              className=" rounded-3xl text-white transitiob-background  ease-in-out "
            >
              {uploadProgress}%
            </div>
          </div>
        )}
      </div>

      {!uploadProgress && (
        <div className="md:flex gap-3 justify-center mt-5">
          <Button color="blue" onClick={() => handleSubmit()}>
            Start
          </Button>
        </div>
      )}
      <Toaster />
    </Card>
  );
}
