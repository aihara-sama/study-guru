import type { Review } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const reviewsApi = createApi({
  tagTypes: ["REVIEWS"],
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.BASE_URL}/api` }),
  endpoints: (builder) => ({
    getAllReviews: builder.query<{ data: Review[] }, { lessonId: string }>({
      query: ({ lessonId }) => `reviews?lesson-id=${lessonId}`,
    }),
    createReview: builder.mutation<
      Review,
      {
        userId: string;
        lessonId: string;
        text: string;
        userImage: string;
        userName: string;
      }
    >({
      query: ({ userId, lessonId, text, userImage, userName }) => ({
        url: `reviews?user-id=${userId}&lesson-id=${lessonId}`,
        method: "POST",
        body: { text, userImage, userName },
      }),
      invalidatesTags: ["REVIEWS"],
    }),
    updateReview: builder.mutation<
      Review,
      {
        userId: string;
        reviewId: string;
        text: string;
        userImage: string;
        userName: string;
      }
    >({
      query: ({ userId, reviewId, text, userImage, userName }) => ({
        url: `reviews/${reviewId}?user-id=${userId}`,
        method: "PATCH",
        body: { text, userImage, userName },
      }),
    }),
    deleteReview: builder.mutation<
      Review,
      { userId: string; reviewId: string }
    >({
      query: ({ userId, reviewId }) => ({
        url: `reviews/${reviewId}?user-id=${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
  useUpdateReviewMutation,
} = reviewsApi;
