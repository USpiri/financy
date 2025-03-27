export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://financy-server.vercel.app"
    : "http://localhost:3000";
