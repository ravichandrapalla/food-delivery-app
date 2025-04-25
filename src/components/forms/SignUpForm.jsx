import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/ui/Button";
import { signupapi, verifyOtp } from "../../services/api";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/slices/userSlice";

const signupSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    retypePassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: "Passwords do not match",
    path: ["retypePassword"],
  });

export default function SignUpForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.userData?.user);

  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [isOtpSent, setISOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRef = useRef([]);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleRetypePassword = () => setShowRetypePassword((prev) => !prev);

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const resp = await signupapi(data);
      const { message, data: respData } = resp.data;

      if (resp.status === 201) {
        // Signup successful
        dispatch(addUser(data));
        setISOtpSent(true);
        console.log("User created. OTP sent.");
      }

      console.log(message, respData);
      console.log("Response:", resp);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // User already exists but not verified
        dispatch(addUser(data));
        setISOtpSent(true);
        console.log("User exists but not verified. OTP resent.");
        console.log("Message:", error.response.data.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };
  const handleOtpChange = (e, position) => {
    const { value } = e.target;
    const updatedOtp = [...otp];
    updatedOtp[position] = value;
    setOtp(updatedOtp);
    if (position < otp.length - 1) {
      inputRef.current[position + 1].focus();
    }
  };
  const handleOtpValidate = () => {
    const stringOtp = otp.join("");
    console.log(stringOtp, "1");
    verifyOtp(user?.email, stringOtp);
  };

  return (
    <div className="h-full bg-neutral-950 font-sans">
      <article className="flex flex-col items-center justify-center text-center p-4 pt-8 h-[30%] text-white">
        <h2>Sign up</h2>
        <p>Please sign-up to get started</p>
      </article>

      <section className="flex  flex-col space-y-4 rounded-t-2xl px-4 py-4 bg-white h-[calc(100vh-30%)]">
        {isOtpSent ? (
          <div className="flex flex-col space-y-8">
            <div className="flex justify-between">
              <p>Code</p>
              <p>Resend</p>
            </div>
            <div className="w-full flex items-center justify-center text-center gap-4 overflow-hidden">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRef.current[index] = el)}
                  value={digit}
                  className="bg-indigo-50 w-1/4  rounded-2xl text-center p-4"
                  onChange={(e) => handleOtpChange(e, index)}
                  maxLength={1}
                />
              ))}
            </div>
            <Button className="mt-4" onClick={handleOtpValidate}>
              Verify
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            {/* Name */}
            <div>
              <label className="text-xs font-semibold text-gray-600">
                NAME
              </label>
              <input
                {...register("name")}
                placeholder="John Doe"
                className="w-full mt-1 p-3 rounded-md bg-gray-100 outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-gray-600">
                EMAIL
              </label>
              <input
                {...register("email")}
                placeholder="example@gmail.com"
                className="w-full mt-1 p-3 rounded-md bg-gray-100 outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-xs font-semibold text-gray-600">
                PASSWORD
              </label>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full mt-1 p-3 rounded-md bg-gray-100 outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 bottom-3 text-gray-500 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Retype Password */}
            <div className="relative">
              <label className="text-xs font-semibold text-gray-600">
                RE-TYPE PASSWORD
              </label>
              <input
                {...register("retypePassword")}
                type={showRetypePassword ? "text" : "password"}
                placeholder="********"
                className="w-full mt-1 p-3 rounded-md bg-gray-100 outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={toggleRetypePassword}
                className="absolute right-3 bottom-3 text-gray-500 text-sm"
              >
                {showRetypePassword ? "Hide" : "Show"}
              </button>
              {errors.retypePassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.retypePassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-3 text-sm font-semibold"
            >
              SIGN UP
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
