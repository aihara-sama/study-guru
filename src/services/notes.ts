import type { Note } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const notesApi = createApi({
  tagTypes: ["NOTES"],
  reducerPath: "notesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.BASE_URL}/api` }),
  endpoints: (builder) => ({
    getAllNotes: builder.query<
      { data: Note[] },
      { userId: string; lessonId: string }
    >({
      query: ({ userId, lessonId }) =>
        `notes?user-id=${userId}&lesson-id=${lessonId}`,
    }),
    createNote: builder.mutation<
      Note,
      { userId: string; lessonId: string; text: string }
    >({
      query: ({ userId, lessonId, text }) => ({
        url: `notes?user-id=${userId}&lesson-id=${lessonId}`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: ["NOTES"],
    }),
    updateNote: builder.mutation<
      Note,
      { userId: string; noteId: string; text: string }
    >({
      query: ({ userId, noteId, text }) => ({
        url: `notes/${noteId}?user-id=${userId}`,
        method: "PATCH",
        body: { text },
      }),
    }),
    deleteNote: builder.mutation<Note, { userId: string; noteId: string }>({
      query: ({ userId, noteId }) => ({
        url: `notes/${noteId}?user-id=${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useGetAllNotesQuery,
  useUpdateNoteMutation,
} = notesApi;
