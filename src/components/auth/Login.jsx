import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { userLogInSchema } from "../../utils/yupValidation";
import { login } from "../../api/userApis";

function Login() {
  const navigate = useNavigate();
  const [mount, setMout] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow((curr) => !curr);
  };

  const initialData = {
    email: "",
    password: "",
  };

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    values,
    resetForm,
  } = useFormik({
    initialValues: initialData,
    validationSchema: userLogInSchema,
    onSubmit: async (data) => {
      const result = await login(data);
      if (result.data.loginSuccess) {
        localStorage.setItem("mobigicToken",result.data.jwtToken)
        navigate("/home");
      } else if (result.data.created) {
        toast.success(result.data.message);
        setTimeout(() => {
          navigate("/confirm", { state: values.email });
        }, 4000);
      }else{
        toast.error(result.data.message);
      }
    },
  });

  useEffect(() => {
    setMout(true);
  }, []);

  return (
    <Card className="mx-2 md:mx-auto my-24 md:w-2/6 overflow-hidden h-auto rounded-md  p-5 shadow-md shadow-blue-gray-500 border ">
      <form action="" onSubmit={handleSubmit}>
        <div
          className={
            mount
              ? "transition-transform duration-700 transform translate-x-0 flex  flex-col gap-2"
              : "translate-x-full gap-2"
          }
        >
          <Typography variant="h4">Login</Typography>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values?.email}
            name="email"
            variant="standard"
            label="Email"
          />
          {errors.email && touched.email && (
            <span className="text-xs text-red-400">{errors.email}</span>
          )}
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values?.password}
            name="password"
            variant="standard"
            label="Password"
            type={show ? "text" : "password"}
            icon={
              show ? (
                <EyeIcon
                  className="cursor-pointer"
                  onClick={() => handleShow()}
                />
              ) : (
                <EyeSlashIcon
                  className="cursor-pointer"
                  onClick={() => handleShow()}
                />
              )
            }
          />
          {errors.password && touched.password && (
            <span className="text-xs text-red-400">{errors.password}</span>
          )}

          <div className=" m-1 cursor-pointer">

            <Link
              to={"/register"}
              className="ml-auto hover:text-light-blue-800 hover:underline my-auto"
            >
              <p>Not Registered</p>
            </Link>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => resetForm()}
              className="m-1 rounded-md"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="m-1 rounded-md bg-light-blue-700"
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      </form>
      <Toaster />
    </Card>
  );
}

export default Login;
