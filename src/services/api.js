import axios from "axios";
import { baseUrl } from "../../apiConfig";

export function signupapi(userData) {
  return axios.post(`${baseUrl.local}/api/sign-up`, userData);
}

export function verifyOtp(email, otp) {
  console.log("export data", email, otp);

  return axios.post(`${baseUrl.local}/api/verify-otp`, { email, otp });
}
