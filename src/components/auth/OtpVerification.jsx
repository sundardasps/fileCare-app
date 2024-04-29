import { Button, Card } from "@material-tailwind/react";

import { useEffect, useRef, useState } from "react";

import { otpValidation } from "../../utils/yupValidation";
import { otpVerification, resendOtp } from "../../api/userApis";
import { useLocation, useNavigate } from "react-router-dom";

function OtpVerification() {
  const location = useLocation();
  const userEmail = location.state;
  const navigate = useNavigate();
  const otpLength = 5;
  const [mount, setMout] = useState(false);
  const [Otp, setOtp] = useState(Array(otpLength).fill(""));
  const inputRefs = useRef([]);
  const [countdown, setCountdown] = useState(60);
  const [error, seterror] = useState("");

  const handleOtp = (index, value) => {
    let newOtp = [];
    let str = String(value);
    if (
      str.length > 1 &&
      String(Otp).length <= otpLength &&
      str.length <= otpLength
    ) {
      str.split("").forEach((value, i) => {
        newOtp[i] = Number(value);
        setOtp(newOtp);
      });
      seterror();
    } else if (str.length <= otpLength) {
      newOtp = [...Otp];
      newOtp[index] = value;
      setOtp(newOtp);
      seterror();
      if (value !== "" && index < otpLength) {
        inputRefs.current[index + 1].focus();
      } else if (value === "") {
        inputRefs.current[index - 1].focus();
      }
    } else {
      seterror("Please add valid Otp.");
    }
  };

  useEffect(() => {
    let timer;

    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [countdown]);

  const handleSubmit = async () => {
    const res = otpValidation(Otp);

    if (typeof res === "object") {
      seterror(res.message);
    } else if (typeof res === "string" && countdown > 1) {
      seterror();
      const response = await otpVerification(res, userEmail);
      if (response.data.loginSuccess) {
        navigate("/login");
      }
    }
  };

  const handleResendOtp = async () => {
    setCountdown(60);
    const response = await resendOtp(userEmail);
    if (response.data.loginSuccess) {
      handleSubmit();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMout(true);
    }, 100);
  }, []);

  useEffect(() => {
    countdown === 0 && setOtp(Array(otpLength).fill(""));
  }, [countdown]);

  return (
    <div>
      <Card className="mx-2 md:mx-auto my-24 md:w-2/6 overflow-hidden h-auto rounded-md  p-5 shadow-md shadow-blue-gray-500 border">
        <div
          className={
            mount
              ? "transition-transform duration-700 transform translate-x-0 flex  flex-col gap-2"
              : "translate-x-full gap-2"
          }
        >
          <h1 className="text-center pb-3 font-thin text-xl pl-5animate-pulse mr-2">
            OTP Verification
          </h1>

          <div className="flex gap-2  items-center justify-center mb-5  cursor-pointer">
            {Otp.map((digit, index) => (
              <input
                key={index}
                type="number"
                value={digit}
                name="otp"
                step="1"
                className="w-10 h-10 border text-center border-blue-gray-900 text-gray-900 shadow-lg  ring-4 ring-transparent "
                onChange={(e) => handleOtp(index, e.target.value)}
                ref={(ref) => (inputRefs.current[index] = ref)}
              />
            ))}
          </div>
          {error && (
            <span className="text-xs text-center text-red-400">{error}</span>
          )}
          <div className="flex justify-center gap-2">
            <Button
              className="m-1 rounded-md font-extralight bg-light-blue-700"
              size="sm"
              onClick={(e) =>
                countdown === 0 ? handleResendOtp() : e.preventDefault()
              }
            >
              {countdown === 0 ? "resend" : `Time remaining :  ${countdown}`}
            </Button>
            {countdown > 0 && (
              <Button
                type="submit"
                className="m-1 rounded-md bg-light-blue-700"
                size="sm"
                onClick={() => handleSubmit()}
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default OtpVerification;
