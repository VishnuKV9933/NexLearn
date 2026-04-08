

import { fetchClient } from "./fetchClient";

export const sendOtp = (mobile: string) => {
  const formData = new FormData();
  formData.append("mobile", mobile);

  return fetchClient("/auth/send-otp", {
    method: "POST",
    body: formData,
  });
};

export const verifyOtp = (mobile: string, otp: string) => {
  const formData = new FormData();
  formData.append("mobile", mobile);
  formData.append("otp", otp);

  return fetchClient("/auth/verify-otp", {
    method: "POST",
    body: formData,
  });
};