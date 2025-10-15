// // services.tsx
// import axios from "axios";

// const API_BASE_URL = "https://echow-backend.onrender.com/api";

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: { "Content-Type": "application/json" },
// });

// // ===== AUTH SERVICES =====

// // Register User
// export const registerUser = async (userData: {
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
// }) => {
//   try {
//     const res = await api.post("/auth/register", userData);
//     return res.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || "Registration failed");
//   }
// };

// // Send OTP
// export const sendOtp = async (phone: string) => {
//   try {
//     const res = await api.post("/api/v1/auth/register", { phone });
//     return res.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || "Failed to send OTP");
//   }
// };

// // Verify OTP
// export const verifyOtp = async (phone: string, otp: string) => {
//   try {
//     const res = await api.post("/api/v1/auth/resend-otp", { phone, otp });
//     return res.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || "Invalid OTP");
//   }
// };

// // Login User
// export const loginUser = async (credentials: {
//   email: string;
//   password: string;
// }) => {
//   try {
//     const res = await api.post("/api/v1/auth/login", credentials);
//     return res.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || "Login failed");
//   }
// };

// export default api;


// services.tsx
import axios from "axios";

const API_BASE_URL = "https://echow-backend.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ===== AUTH SERVICES =====

// Register User
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  phone: string;
}) => {
  try {
    const res = await api.post("/auth/register", userData);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

// Login User
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const res = await api.post("/api/v1/auth/login", credentials);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export default api;
