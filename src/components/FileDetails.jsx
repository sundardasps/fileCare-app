import { Card, Typography, Button } from "@material-tailwind/react";
import defaultImg from "../../public/noimage_551X431.jpg";
import initialImg from "../../public/Group Videos & Shared Albums _ Memento.jpeg";
import { format } from "timeago.js";
import { useRef } from "react";
import copy from "copy-to-clipboard";
import { toast, Toaster } from "react-hot-toast";

export function FileDetails({ singleFile, setOPen ,setSingleFile}) {
  const textRef = useRef();

  const copyToClipboard = () => {
    let copyText = textRef.current.value;
    let isCopy = copy(copyText);
    if (isCopy) {
      toast.success(`${copyText} Copied to Clipboard`);
    }
  };

  return (
    <Card
      className={`md:w-2/3  md:m-auto  shadow-md py-5 px-5 bg-transparent  ${
        singleFile ? "border md:w-3/4 " : "shadow-none"
      } text-center `}
    >
      <img
        src={singleFile ? defaultImg : initialImg}
        alt="ui/ux review check"
        className="w-112/12  object-cover m-auto rounded-md "
      />
      <div className="pt-5">
        <Typography className="text-3xl capitalize text-blue-600">
          {singleFile?.fileName}
        </Typography>
        <h5 className=" text-sm text-blue-gray-400 mb-2 overflow-hidden">
          {singleFile ? singleFile?.fileUrl.split("_")[1] : "Example.image"}
          {singleFile && <p>Uploaded at : {format(singleFile.createdAt)}</p>}
        </h5>
        <h5 className="mb-5 cursor-pointer ">
          {singleFile ? (
            "Unique Id :"
          ) : (
            <Button
              size="sm"
              className="bg-blue-600 p-2 px-2 font-extralight "
              onClick={() => setOPen(true)}
            >
              Click here to Start !
            </Button>
          )}

          {singleFile && (
            <input
              value={singleFile?.uniqueId}
              className="font-light text-2xl text-center outline-none mt-3 w-24 "
              ref={textRef}
            />
          )}
        </h5>
        {singleFile && (
          <div className="md:flex ">
           <Button fullWidth color="blue" className="m-1 md:hidden block" onClick={()=>{setOPen(false),setSingleFile(null)}} >
            Back
          </Button>
          <Button fullWidth color="green" className="m-1" onClick={copyToClipboard}>
            Copy
          </Button>
          </div>
        )}
      </div>
      <Toaster />
    </Card>
  );
}
