import {
  Button,
  IconButton,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { FileDetails } from "../components/FileDetails";
import FileList from "../components/FileList";
import Upload from "../components/Upload";
import { checkFile, downloadFile, fetchFiles } from "../api/userApis";
import toast, { Toaster } from "react-hot-toast";
import FileDownlod from "js-file-download";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

function Home() {
  const [open, setOPen] = useState(false);
  const [singleFile, setSingleFile] = useState(null);
  const [uniqueId, setUniqueId] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState();
  const [debounceSearch, setDebounceSearch] = useState("");
  const [active, setActive] = useState(1);
  const [filter, setfilter] = useState("");

  const handleOpen = () => {
    setOPen(!open);
  };

  const { data } = useQuery({
    queryKey: ["home", { Search: debounceSearch, page: active, filter }],
    queryFn: async () => {
      const response = await fetchFiles({
        Search: debounceSearch,
        page: active,
        filter,
      });
      return response;
    },
  });

  const handleDownload = async () => {
    try {
      if (!uniqueId || uniqueId.length < 6 || uniqueId.length > 6) {
        setError("Enter a valid 6 digit uniqueId!");
      } else if (!/^\d+$/.test(uniqueId)) {
        setError("Unique ID must contain only numbers.");
      } else {
        const file = await checkFile(uniqueId);
        if (file.data.exist) {
          const result = await downloadFile(uniqueId);
          if (result.data) {
            FileDownlod(
              result.data,
              `${file.data.file.fileName}.${
                file.data.url.split(".")[file.data.url.split(".").length - 1]
              }`
            );
            setUniqueId("");
          }
        } else {
          toast.error(file.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let id = setTimeout(() => {
      setDebounceSearch(search);
    }, 1000);

    return () => clearTimeout(id);
  }, [search]);

  const next = () => {
    
    if (active === data?.data?.totalPages) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div className="container mx-auto ">
      <div className="mx-auto md:flex  gap-2   py-2 lg:px-2 lg:py-4 ">
        <div className="mx-2">
          <div className="relative flex  w-full gap-2 md:w-max ">
            <Input
              type="search"
              color="black"
              label="Enter Id here.."
              className="pr-20"
              value={uniqueId}
              onChange={(e) => {
                setUniqueId(e.target.value), setError("");
              }}
              containerProps={{
                className: "min-w-[100px]",
              }}
            />
            <Button
              size="sm"
              color="black"
              className="!absolute right-1 top-1 rounded-md flex"
              onClick={() => handleDownload()}
            >
              Download
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Button>
          </div>
          {error && (
            <p className="absolute text-xs ml-1 text-orange-900">{error}</p>
          )}
        </div>

        <div className="flex gap-2 m-2 md:m-0">
          <Button
            fullWidth
            className="my-1 md:my-auto w-3/12 p-0 md:p-3    rounded-2xl "
            color="blue"
            onClick={() => handleOpen()}
          >
            {open ? "Cancel" : "Upload"}
          </Button>
          <div className="w-9/12 my-auto  md:mt-0">
            <div className="relative flex    gap-2 md:w-max  ">
              <input
                type="search"
                placeholder="Search file.."
                label="Enter Id here.."
                className=" px-5 min-w-10 w-full md:w-auto  rounded-full border-2 border-blue-600 h-10"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />

              <select
                onChange={(e) => setfilter(e.target.value)}
                // defaultChecked="Newest"
                className="absolute right-0 px-1 rounded-full h-full bg-blue-500"
              >
                <option value="new" className="flex items-center gap-2">
                  Newest
                </option>
                <option value="old" className="flex items-center gap-2">
                  Oldest
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={` w-full md:flex   justify-between gap-2 `}>
        <div
          className={`relative md:w-4/5   md:block  p-2   ${
            open || singleFile ? "hidden" : "block"
          }`}
        >
          <div className="h-screen scrollable">
            {data &&
              data.data.files.map((file, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSingleFile(file), setOPen(false);
                  }}
                  className="my-5 "
                >
                  <FileList file={file} setSingleFile={setSingleFile} />
                </div>
              ))}
          </div>

          {data?.data?.totalPages > 0 &&
          <div className="flex m-auto  gap-8 w-max  p-3 rounded-md bg-white border shadow-md shadow-blue-gray-500">
            <IconButton
              size="sm"
              variant="outlined"
              onClick={prev}
              disabled={active === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
            <Typography color="gray" className="font-normal">
              Page <strong className="text-gray-900">{active}</strong> of{" "}
              <strong className="text-gray-900">
                {data?.data?.totalPages}
              </strong>
            </Typography>
            <IconButton
              size="sm"
              variant="outlined"
              onClick={next}
              disabled={active === 10}
            >
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
          </div>}
        </div>
        <div
          className={` md:w-1/2 md:block  ${
            open || singleFile ? "block" : "hidden"
          } border-l-2 px-2 `}
        >
          {open ? (
            <Upload handleOpen={handleOpen} />
          ) : (
            <FileDetails
              singleFile={singleFile ? singleFile : data?.data?.files[0]}
              setOPen={setOPen}
              setSingleFile={setSingleFile}
            />
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Home;
