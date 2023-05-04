import type { Question, QuestionReply } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const questionsApi = createApi({
  tagTypes: ["QUESTIONS"],
  reducerPath: "questionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.BASE_URL}/api` }),
  endpoints: (builder) => ({
    getAllQuestions: builder.query<
      { data: (Question & { reply: null | QuestionReply })[] },
      { lessonId: string }
    >({
      query: ({ lessonId }) => `questions?lesson-id=${lessonId}`,
    }),
    createQuestion: builder.mutation<
      Question & { reply: null | QuestionReply },
      {
        userId: string;
        lessonId: string;
        text: string;
        userImage: string;
        userName: string;
      }
    >({
      query: ({ userId, lessonId, text, userImage, userName }) => ({
        url: `questions?user-id=${userId}&lesson-id=${lessonId}`,
        method: "POST",
        body: { text, userImage, userName },
      }),
      invalidatesTags: ["QUESTIONS"],
    }),
    updateQuestion: builder.mutation<
      Question & { reply: null | QuestionReply },
      {
        userId: string;
        questionId: string;
        text: string;
        userImage: string;
        userName: string;
      }
    >({
      query: ({ userId, questionId, text, userImage, userName }) => ({
        url: `questions/${questionId}?user-id=${userId}`,
        method: "PATCH",
        body: { text, userImage, userName },
      }),
    }),
    deleteQuestion: builder.mutation<
      Question & { reply: null | QuestionReply },
      { userId: string; questionId: string }
    >({
      query: ({ userId, questionId }) => ({
        url: `questions/${questionId}?user-id=${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
  useGetAllQuestionsQuery,
  useUpdateQuestionMutation,
} = questionsApi;
