import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * API slice
 */
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  endpoints: () => ({}),
});
