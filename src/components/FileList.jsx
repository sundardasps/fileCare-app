import { TrashIcon } from "@heroicons/react/24/solid";
import { ListItem, Card, Typography } from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteFile } from "../api/userApis";

function FileList({ file ,setSingleFile}) {
  const [open, setopen] = useState(false);
  const queryClient = useQueryClient();

  const handleDeleteFile = async (id) => {
    try {
      const result = await deleteFile(id);
      if (result.data.deleted) {
        toast.success(result.data.message);
        setopen(false);
        setSingleFile(null)
        queryClient.invalidateQueries("home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ListItem
        ripple={false}
        className={`pr-1 pl-4 border  ${
          open && "border-b-0 rounded-br-none"
        } shadow-md  text-xl h-[5rem] m-auto hover:bg-blue-gray-50 `}
      >
        <div className="h-full scrollable ">
          <Typography className="text-xl capitalize font-semibold text-blue-700 ">
            {file.fileName}
          </Typography>
          <span className="text-[0.5rem] md:text-xs "> {file.fileUrl.split("_")[1]}</span>
        </div>
        <div className=" ml-auto m-5">
         {!open&& <TrashIcon
            onClick={(e) => {
              e.stopPropagation(), setopen(true);
            }}
            color="black"
            className="md:w-10 w-8  hover:scale-105"
          />}
        </div>
      </ListItem>
      {open && (
        <Card className=" md:w-1/3 h-auto ml-auto rounded-t-none p-2 flex bg-blue-300 text-white ">
          <div className=" flex justify-center text-sm">
            Delete?{" "}
            <span
              onClick={(e) => {
                e.stopPropagation()
                setopen(false);
              }}
              className="px-2 mx-1 text-white cursor-pointer rounded-xl bg-green-500 "
            >
              No
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteFile(file._id);
              }}
              className="px-2 mx-1 text-white cursor-pointer rounded-xl bg-red-500 "
            >
              Yes
            </span>
          </div>
        </Card>
      )}
    </>
  );
}

export default FileList;
