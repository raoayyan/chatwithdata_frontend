import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://your-backend-api-url", // Replace with your backend URL
  }),
  endpoints: (builder) => ({
    getData: builder.query<any, void>({
      query: () => "/data", // Replace '/data' with your backend endpoint
    }),
    postData: builder.mutation<any, { input: any }>({
      query: (body) => ({
        url: "/data", // Replace '/data' with your backend endpoint
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetDataQuery, usePostDataMutation } = api;
