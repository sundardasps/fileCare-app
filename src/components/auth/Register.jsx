
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import {  register } from "../../api/userApis";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { userRegisterSchema } from "../../utils/yupValidation";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";


function Register() {
  const navigate = useNavigate();
  const [mount, setMout] = useState(false);
  const [passOneShow, setPassOneShow] = useState(false);
  const [passTwoShow, setPassTwoShow] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setMout(true);
    }, 100);
  }, []);

  //----------------- handle Eyes -------//

  const handleShowOne = () => {
    setPassOneShow((curr) => !curr);
  };

  const handleShowTwo = () => {
    setPassTwoShow((curr) => !curr);
  };

  const initialValue = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  //----------------- handle Eyes -------------//

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: initialValue,
      validationSchema: userRegisterSchema,
      onSubmit: async (values) => {
        const response = await register(values);
        if (response.data.created) {
          navigate("/confirm", { state: values.email });
        } else {
          toast.error(response.data.message);
        }
      },
    });



  return (
    <Card className="md:mx-auto mx-2 my-24 md:w-2/6 overflow-hidden h-auto rounded-xl  p-5 shadow-md shadow-blue-gray-500 border">
      <form
        action=""
          onSubmit={handleSubmit}
      >
        <div
          className={
            mount
              ? "transition-transform duration-700 transform translate-x-0 flex  flex-col gap-1"
              : "translate-x-full gap-2"
          }
        >
          <Typography variant="h4">Get start</Typography>
          <Input
            name="userName"
            onChange={handleChange}
            value={values.userName}
            onBlur={handleBlur}
            variant="standard"
            label="Username"
          />
          {errors.userName && touched.userName && (
            <span className="text-xs text-red-400">{errors.userName}</span>
          )}

          <Input
            name="email"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            variant="standard"
            label="Email"
          />
          {errors.email && touched.email && (
            <span className="text-xs text-red-400">{errors.email}</span>
          )}

          <Input
            name="password"
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            variant="standard"
            label="Password"
            type={passOneShow ? "text" : "password"}
            icon={
              passOneShow ? (
                <EyeIcon
                  className="cursor-pointer"
                  onClick={() => handleShowOne()}
                />
              ) : (
                <EyeSlashIcon
                  className="cursor-pointer"
                  onClick={() => handleShowOne()}
                />
              )
            }
          />
          {errors.password && touched.password && (
            <span className="text-xs text-red-400">{errors.password}</span>
          )}

          <Input
            name="confirmPassword"
            onChange={handleChange}
            value={values.confirmPassword}
            onBlur={handleBlur}
            variant="standard"
            label="confirmPassword"
            type={"password"}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <span className="text-xs text-red-400">
              {errors.confirmPassword}
            </span>
          )}

          <div className=" m-1  cursor-pointer ">
            <Link
              to={"/login"}
              className="ml-auto hover:text-light-blue-800 hover:underline my-auto"
            >
              <p>Already user?</p>
            </Link>
          </div>
          <div className="flex justify-end">
            <Button className="m-1 rounded-md" size="sm">
              Cancel
            </Button>
            <Button
              type="submit"
              className="m-1 rounded-md bg-light-blue-700"
              size="sm"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
      <Toaster />
    </Card>
  );
}

export default Register;
