import { createApi, fetchBaseQuery } from '@reduxjs/toolkit';

const photosApi = createApi({
  reducerPath: fetchBaseQuery({
    baseUrl: 'http://localhost:3005'
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({}),
      addPhoto: builder.mutation({}),
      removePhoto: builder.mutation({}),
    }
  }
})