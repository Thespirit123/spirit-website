// import axios, { AxiosError } from "axios";

// interface ApiError {
//   message: string;
//   status: number;
// }

// export const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_VOUCHERNET_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${process.env.NEXT_PUBLIC_VOUCHERNET_TOKEN}`,
//   },
// });

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError<ApiError>) => {
//     if (error.response?.status === 401) {
//       console.error("Authentication failed");
//     }
//     return Promise.reject(error);
//   }
// );
