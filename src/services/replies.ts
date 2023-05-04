import type { QuestionReply } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const repliesApi = createApi({
  tagTypes: ["REPLIES"],
  reducerPath: "repliesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.BASE_URL}/api` }),
  endpoints: (builder) => ({
    getAllReplies: builder.query<
      { data: QuestionReply[] },
      { lessonId: string }
    >({
      query: ({ lessonId }) => `replies?lesson-id=${lessonId}`,
    }),
    createQuestionReply: builder.mutation<
      QuestionReply,
      {
        userId: string;
        lessonId: string;
        text: string;
        userImage: string;
        userName: string;
        questionId: string;
      }
    >({
      query: ({ userId, lessonId, text, userImage, userName, questionId }) => ({
        url: `replies?user-id=${userId}&question-id=${questionId}&lesson-id=${lessonId}`,
        method: "POST",
        body: { text, userImage, userName },
      }),
      invalidatesTags: ["REPLIES"],
    }),
    updateQuestionReply: builder.mutation<
      QuestionReply,
      {
        userId: string;
        replyId: string;
        text: string;
        userImage: string;
        userName: string;
      }
    >({
      query: ({ userId, replyId, text, userImage, userName }) => ({
        url: `replies/${replyId}?user-id=${userId}`,
        method: "PATCH",
        body: { text, userImage, userName },
      }),
    }),
    deleteQuestionReply: builder.mutation<
      QuestionReply,
      { userId: string; replyId: string }
    >({
      query: ({ userId, replyId }) => ({
        url: `replies/${replyId}?user-id=${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllRepliesQuery,
  useCreateQuestionReplyMutation,
  useDeleteQuestionReplyMutation,
  useUpdateQuestionReplyMutation,
} = repliesApi;
