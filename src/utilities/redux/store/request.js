import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseURL = process.env.REACT_APP_API_KEY;

const baseURL = "http://10.10.10.16:8000/api";
// const baseURL = "http://127.0.0.1:8000/api/";
// const baseURL = "http://192.168.254.195:8000/api/";
// const baseURL = "http://192.168.254.132:8000/api/";
// const baseURL = "http://192.168.142.55:8000/api/";

export const jsonServerAPI = createApi({
  reducerPath: "jsonServerAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    mode: "cors",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    login: builder.mutation({
      transformResponse: (response) => response.result,
      query: (payload) => ({
        url: `/auth/login`,
        method: "POST",
        body: payload,
      }),
    }),
    emailLogin: builder.mutation({
      transformResponse: (response) => response.result,
      query: (payload) => ({
        url: `/email_login`,
        method: "POST",
        body: payload,
      }),
    }),
    logout: builder.mutation({
      transformResponse: (response) => response.result,
      query: (payload) => ({
        url: `/auth/logout`,
        method: "POST",
        body: payload,
      }),
    }),
    passwordChange: builder.mutation({
      transformResponse: (response) => response,
      query: (payload) => ({
        url: `/change_password/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
    }),
    passwordReset: builder.mutation({
      transformResponse: (response) => response,
      query: (payload) => ({
        url: `/reset_password/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
    }),
    users: builder.query({
      transformResponse: (response) => response,
      query: (payload) => ({
        url: `/auth`,
        method: "GET",
        params: payload,
      }),
      providesTags: ["Users"],
    }),
    createUser: builder.mutation({
      transformResponse: (response) => response,
      query: (payload) => ({
        url: `auth/register`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      transformResponse: (response) => response,
      query: (payload) => ({
        url: `/auth/${payload.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Users"],
    }),
    archiveUser: builder.mutation({
      transformResponse: (response) => response,
      query: (payload) => ({
        url: `/auth/archived/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Users"],
    }),
    role: builder.query({
      transformResponse: (response) => response,
      query: (payload) => ({
        url: `/role`,
        method: "GET",
        params: payload,
      }),
      providesTags: ["Role"],
    }),

    createRole: builder.mutation({
      transformResponse: (response) => response,
      query: (payload) => ({
        url: `/role`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Role"],
    }),
    updateRole: builder.mutation({
      transformResponse: (response) => response,
      query: (payload) => ({
        url: `/role/${payload.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Role"],
    }),
    updateMPIN: builder.mutation({
      transformResponse: (response) => response,
      query: (payload) => ({
        url: `/update_mpin/${payload.id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    archiveRole: builder.mutation({
      transformResponse: (response) => response,
      query: (payload) => ({
        url: `/archive/role/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Role"],
    }),
    validateUsername: builder.mutation({
      transformResponse: (response) => response,
      query: (payload) => ({
        url: `/validate_username`,
        method: "POST",
        body: payload,
      }),
    }),
    validateEmail: builder.mutation({
      transformResponse: (response) => response,
      query: (payload) => ({
        url: `/validate_email`,
        method: "POST",
        body: payload,
      }),
    }),
    validateNumber: builder.mutation({
      transformResponse: (response) => response,
      query: (payload) => ({
        url: `/validate_number`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  usePasswordChangeMutation,
  useLogoutMutation,
  usePasswordResetMutation,
  useUsersQuery,
  useCreateUserMutation,
  useValidateEmailMutation,
  useValidateNumberMutation,
  useValidateUsernameMutation,
  useUpdateMPINMutation,
  useEmailLoginMutation,
} = jsonServerAPI;
