import { api } from "./api";

export const imageUploadApi = api.injectEndpoints({
  endpoints: (builder) => ({
    imageUpload: builder.mutation({
      query: (credential) => ({
        url: "image/upload",
        method: "POST",
        body: credential,
      }),
    }),
  }),
});

export const { useImageUploadMutation } = imageUploadApi;
